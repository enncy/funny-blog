module.exports = {
    //格式化时间
    getTime(t, simple) {
        let date = new Date(parseInt(t));
        let year = date.getFullYear();
        let mon = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minu = date.getMinutes();
        return year + '年' + mon + '月' + day + '日  ' + (simple ? '' : hours + ':' + minu);
    },
    //格式化博客内容
    formatBlogBody(body) {
        let newBody = body
        if(newBody){
            //消除 markdown 字体
            newBody = newBody.replace(/(#|-|\*|>|)/g, "").replace(/@\[TOC\]\(.*\)/, "")
            newBody =  newBody.length > 100 ? newBody.substr(0, 100) + ' ...' : newBody
            return newBody
        }else  return ''
    },
}







