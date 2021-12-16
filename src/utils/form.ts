import { RegExpFilter } from "./filter/regexp";
import { RuleObject } from "ant-design-vue/lib/form/interface";
import { computed, reactive, watch } from "vue";
import { Result } from "../api";

/**
 * 创建响应性的表单值，并且监听字段值进行过滤
 * @param obj   表单对象
 * @param excludes  不需要监听的字段
 * @returns
 */
export function createForm<T>(obj: T, excludes?: string[]): T {
    let o: any = reactive(obj as any);
    let keys = Reflect.ownKeys(o)
        .filter((k) => !(excludes || []).includes(k.toString()))
        .map((k) => k.toString());
    watch(o, () => {
        keys.forEach((k) => {
            let value = o[k];
            if (value && typeof value === "string") {
                o[k] = o[k].replace(/[^\w]/g, "");
            }
        });
    });
    return o as T;
}

type ValidatorFunction = (v: string) => Promise<any> | undefined;
export class Validator {
    /**
     * 创建检验器
     * @param fn
     * @returns
     */
    static createValidator(fn: ValidatorFunction) {
        return async (rule: RuleObject, value: string) => {
            return fn(value);
        };
    }

    /**
     * 创建正则表达式过滤器
     * @param fn
     * @returns
     */
    static regexpFilter(fn: (filter: RegExpFilter) => RegExpFilter): ValidatorFunction {
        return (v: string) => fn(RegExpFilter.of(v)).validPromise();
    }

    static compare(compare: (v: string) => boolean, msg: string): ValidatorFunction {
        return (v: string) => {
            if (compare(v)) {
                return Promise.reject(msg);
            }
        };
    }

    static range(min: number, max: number, msg: string, zh_CN?: boolean): ValidatorFunction {
 
        
        return (v: string) => {
            console.log({min,max,msg,zh_CN,v});
            if (zh_CN) {
                let cn_char_len = v.match(/[^\x00-\xff]/g)?.length || 0;
                let len = v.length + cn_char_len;
                if (len < min || len > max) {
                    return Promise.reject(msg);
                }
            } else {
                if (v.length < min || v.length > max) {
                    return Promise.reject(msg);
                }
            }
        };
    }

    /**
     *  创建 api 检验器
     */
    static api(apiFunction: (v: string) => Promise<Result<any>>): ValidatorFunction {
        return async (v: string) => {
            const result = await apiFunction(v);
            if (!result.data.success) {
                return Promise.reject(result.data.msg);
            }
        };
    }

    // 执行多个检验器
    static all(...validators: ValidatorFunction[]) {
        return async (rule: RuleObject, value: string) => {
            console.log(validators);
            await Promise.all(validators.map((v) => v(value)));
        };
    }
}

export const PasswordValidators = [Validator.regexpFilter((filter) => filter.blank().specialChar()), Validator.range(6, 20, "密码至少 6-20 个字符")];
export const AccountValidators = [Validator.regexpFilter((filter) => filter.blank().specialChar()), Validator.range(4, 20, "账号至少 4-20 个字符")];
