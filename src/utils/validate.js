/**
 * 各种数据验证工具
 * @author  klskeleton
 * @date  2021/1/8 : 19:01
 */


module.exports = {
    /**
     * 处理特殊字符
     * @param e  input的输入事件 keyup,keypress , keydown
     */
    handelSpacialChar(e){
        e.target.value = e.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、 ]/,"");
    }





}







