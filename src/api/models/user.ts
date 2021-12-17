 
/**
 * 用户表
 */
export interface User {
    /**
     * 账号
     */
    account: string;
    /**
     * 邮箱
     */
    email: string;
    /**
     * 昵称
     */
    nickName: string;
    /**
     * 密码
     */
    password: string;
}

/**
 * 注册表单
 */
 export  interface  RegisterForm  {
     account: string;
     email: string;
     code: string;
     password: string;
     confirmPassword: string;
}



/**
 * 重置密码表单
 */
export  interface ResetForm {
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
}
