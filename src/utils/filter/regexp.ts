export class RegExpFilter {
    // 邮箱匹配
    static EMAIL: RegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // 域名匹配
    static HOST: RegExp = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
    // 电话匹配
    static PHONE: RegExp = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    // 身份证匹配
    static IDENTIFY: RegExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    // 中文符合
    static CN_CHAR: RegExp = /[\u4e00-\u9fa5]/;
    // 双字节符合
    static UNICODE: RegExp = /[^\x00-\xff]/;
    // 空白换行
    static BLANK: RegExp = /\s/;
    // 特殊字符
    static SPECIAL_CHAR: RegExp = /[^\w]/;

    target: string = "";
    errors: {
        error: boolean;
        msg: string;
    }[] = [];

    constructor(target: string, error?: boolean, msg?: string) {
        this.target = target;
        this.errors.push({
            error: error || false,
            msg: msg || "",
        });
    }

    static of(target: string) {
        return new RegExpFilter(target);
    }

    map(error: boolean, msg: string): RegExpFilter {
        this.errors.push({
            error: error,
            msg: msg || "",
        });

        return this;
    }

    email(): RegExpFilter {
        return this.map(!RegExpFilter.EMAIL.test(this.target), "邮箱格式错误");
    }

    host(): RegExpFilter {
        return this.map(!RegExpFilter.HOST.test(this.target), "域名格式错误");
    }

    phone(): RegExpFilter {
        return this.map(!RegExpFilter.PHONE.test(this.target), "电话格式错误");
    }

    identify(): RegExpFilter {
        return this.map(!RegExpFilter.IDENTIFY.test(this.target), "身份证格式错误");
    }

    empty(): RegExpFilter {
        return this.map(this.target.length === 0, "不能留空");
    }

    blank(): RegExpFilter {
        this.empty();
        return this.test(RegExpFilter.BLANK, "不能留空");
    }

    unicode(): RegExpFilter {
        return this.test(RegExpFilter.UNICODE, "不能有中文或其他语言字体");
    }

    cnChar(): RegExpFilter {
        return this.test(RegExpFilter.CN_CHAR, "不能有中文");
    }

    specialChar(): RegExpFilter {
        return this.test(RegExpFilter.SPECIAL_CHAR, "不能有特殊字符");
    }

    test(reg: RegExp, msg: string) {
        return this.map(reg.test(this.target), msg);
    }

    valid() {
        let r = this.errors.find((e) => e.error === true);
        if (r) {
            return new Error(r.msg);
        }
    }

    validPromise() {
        let r = this.errors.find((e) => e.error === true);
        if (r) {
            return Promise.reject(r.msg);
        }
    }

    isError() {
        return this.errors.some((e) => e.error === true);
    }
}
