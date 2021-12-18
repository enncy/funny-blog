import { Result } from ".";
import { request, get, post } from "../utils/request";
import { RegisterForm, ResetForm, User } from "./models";

export class UserApi {
    //账号检验
    static checkPassword(password: string): Promise<Result<string>> {
        return get("/user/check/password", {
            params: { password },
        });
    }
    //账号检验
    static checkAccount(account: string): Promise<Result<string>> {
        return get("/user/check/account", {
            params: { account },
        });
    }

    //邮箱检验
    static checkEmail(email: string): Promise<Result<string>> {
        return get("/user/check/email", {
            params: { email },
        });
    }

    //登录
    static loginByAccount(account: string, password: string): Promise<Result<string>> {
        return get("/user/login/by/account", {
            params: { account, password },
        });
    }

    static loginByEmail(email: string, code: string): Promise<Result<string>> {
        return get("/user/login/by/email", {
            params: { email, code },
        });
    }

    //注册
    static register(userForm: RegisterForm): Promise<Result<string>> {
        return post("/user/register", userForm);
    }

    //注册
    static resetPassword(resetForm: ResetForm): Promise<Result<string>> {
        return post("/user/reset/password", resetForm);
    }
}
