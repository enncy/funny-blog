import { Result } from ".";
import { request, get, post } from "../utils/request";

export class EmailApi {
    // 发送验证码
    static sendCode(email: string): Promise<Result<string>> {
        return get("/email/send/verify", {
            params: { email },
        });
    }

    // 检测验证码
    static checkCode(code: string): Promise<Result<string>> {
        return get("/email/check", {
            params: { code },
        });
    }
}
