/**
 * 统一格式化请求的响应数据
 * @author  enncy
 * @date  2021/1/11 : 15:33
 */

module .exports = {
    /**
     * 格式化响应数据
     * @param data  数据
     * @param options   msg: 额外信息 ， 如果msg为空，则使用operation_name代替操作信息
     */
    format(data: any, options: { msg, operation_name: string }) {
        return {
            status: data!==undefined && data!==null ? 1 : 0,
            data,
            msg: options ?
                options.msg ?
                    options.msg :
                    options.operation_name?
                        data?
                            options.operation_name+"成功":
                            options.operation_name+"失败"
                        :""
                : ""

        }
    },
    /**
     * 响应简单错误信息
     * @param msg
     */
    formatError(msg){
        return {
            status: 0,
            msg
        }
    },
    /**
     * 响应简单的成功信息
     * @param msg
     */
    formatSuccess(msg){
        return {
            status: 1,
            msg
        }
    }

}