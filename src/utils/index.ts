import { message } from "ant-design-vue";
import { Result } from "../api";

export function Message(res: Result<any>, success?: string) {
    if (res.data.success) {
        if (success) {
            message.success(success);
        } 
    } else {
        message.error(res.data.msg);
    }
}
