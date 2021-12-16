import { Result } from ".";
import { request, get, post } from "../utils/request";

export class EmailApi {
    // 发送验证码
    static async sendCode(email: string): Promise<Result<string>> {
        return await get("/email/send/verify", {
            params: { email },
        });
    }

    // 检测验证码
    static async checkCode(code: string): Promise<Result<string>> {
        return await get("/email/check", {
            params: { code },
        });
    }
}
