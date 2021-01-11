const uuid = require('uuid');

/**
 * 工具模块
 * @author  klskeleton
 * @date  2021/1/10 : 0:47
 */
module.exports = {

    /**
     * 生成随机的 uid
     * @returns {String} uid
     */
    createUid() {
        return uuid.v1().replace(/-/g, "")
    },

    randomFour(){
        return Math.floor(Math.random()*(9999-1000))+1000;
    }

}



