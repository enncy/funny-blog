import { AxiosResponse } from "axios";
export interface ResultBody<T> {
    status: number;

    success: boolean;

    msg: string;

    data: T;
}

export type Result<T> = AxiosResponse<ResultBody<T>>;
