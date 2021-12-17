import { Result } from ".";
import { request, get, post } from "../utils/request";
import { RegisterForm, ResetForm, User } from "./models";

export class UserApi {
    //账号检验
    static async checkPassword(password: string): Promise<Result<string>> {
        return await get("/user/check/password", {
            params: { password },
        });
    }
    //账号检验
    static async checkAccount(account: string): Promise<Result<string>> {
        return await get("/user/check/account", {
            params: { account },
        });
    }

    //邮箱检验
    static async checkEmail(email: string): Promise<Result<string>> {
        return await get("/user/check/email", {
            params: { email },
        });
    }

    //登录
    static async loginByAccount(account: string, password: string): Promise<Result<string>> {
        return await get("/user/login/by/account", {
            params: { account, password },
        });
    }

    static async loginByEmail(email: string, code: string): Promise<Result<string>> {
        return await get("/user/login/by/email", {
            params: { email, code },
        });
    }

    //注册
    static async register(userForm:  RegisterForm): Promise<Result<string>> {
        return await post("/user/register",userForm);
    }

    //注册
    static async resetPassword(resetForm: ResetForm): Promise<Result<string>> {
        return await post("/user/reset/password", resetForm);
    }
}
