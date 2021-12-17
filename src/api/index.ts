import { message } from "ant-design-vue";
import { AxiosResponse } from "axios";
export interface ResultBody<T> {
    status: number;

    success: boolean;

    msg: string;

    data: T;
}

export type Result<T> = AxiosResponse<ResultBody<T>>;

export function handleApi<T>(fn: Promise<Result<T>>, callback?: (res: Result<T>) => void) {
    fn.then((result) => {
        if (result.data.success) {
            callback?.(result);
        } else {
            message.error(result.data.msg);
        }
    }).catch((err) => {
        message.error("网络错误");
    });
}


export async function handleApiSync<T>(fn: Promise<Result<T>>): Promise<Result<T>> {
    const result =  await fn

    try{
        if (result.data.success) {
            return result
        } else {
            message.error(result.data.msg);
        }
    }catch{
        message.error("网络错误");
    }
    return result
}
