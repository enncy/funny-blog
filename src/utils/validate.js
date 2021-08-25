
//特殊字符
const reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、 ]/

/**
 * 各种数据验证工具
 * @author  enncy
 * @date  2021/1/8 : 19:01
 */

module.exports = {
    /**
     * 处理特殊字符
     * @param e  input的输入事件 keyup,keypress , keydown
     */
    handelSpacialChar(e){
        e.target.value = e.target.value.replace(reg,"");
    },
    /**
     * 消除特殊字符
     * @param str  目标字符串
     * @returns {*} 返回消除特殊字符的字符串
     */
    removeSpacialChar(str){
        return str.replace(reg,"");
    }





}







