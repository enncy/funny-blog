import { Result } from ".";
import { request, get, post } from "../utils/request";
import { User } from "./models";
 
export interface UserFormState extends User {
    confirmPassword: string;
}

export class UserApi {
    //账号检验
    static async checkPassword(password: string):  Promise<Result<string>> {
        return await get("/user/check/password?password=" + password);
    }
    //账号检验
    static async checkAccount(account: string):  Promise<Result<string>> {
        return await get("/user/check/account?account=" + account);
    }

    //邮箱检验
    static async checkEmail(email: string):  Promise<Result<string>> {
        return await get("/user/check/email?email=" + email);
    }

    //登录
    static async login(account: string, password: string):  Promise<Result<string>> {
        return await get("/user/login", {
            data: { account, password },
        });
    }

    //注册
    static async register(userForm: UserFormState):  Promise<Result<string>> {
        let {confirmPassword,...user} = userForm
        return await post("/user/register?confirmPassword="+confirmPassword, user);
    }
}
