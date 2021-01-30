module.exports = {
    /**
     * 格式化时间
     * @param t     时间
     * @param simple    简单模式
     * @return {string}
     */
    getTime(t, simple) {
        let date = new Date(parseInt(t));
        let year = date.getFullYear();
        let mon = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        hours = hours<10?'0'+hours:hours;
        let minu = date.getMinutes();
        minu = minu<10?'0'+minu:minu;
        return year + '年' + mon + '月' + day + '日  ' + (simple ? '' : hours + ':' + minu);
    },
    /**
     * 根据指定的t，获取t距离现在过去了多少天
     * @param t     指定的时间
     * @return {any} elapsed 过去的时间
     */
    getElapsedTime(t){
        let now = Date.now();
        let elapsed  = now - t
        let second =  1000;
        let minute = 60*second;
        let hours = 60*minute;
        let day = 24*hours;
        let month =  Math.abs(new Date(t).getMonth() -  new Date(now).getMonth())
        let year =  new Date(now).getFullYear() - new Date(t).getFullYear()
        if(year!==0&&month>=12)return year+'年前'
        if(month!==0)return month+'个月前'
        if(parse(day)!==0)return parse(day)+'天前'
        if(parse(hours)!==0)return parse(hours)+'小时前'
        if(parse(minute)!==0)return parse(minute)+'分钟前'
        if(parse(second)!==0)return parse(second)+'秒前'

        function parse(time){
            return parseInt(elapsed/time)
        }
        return "1秒前";
    },

    //格式化博客内容
    formatBlogBody(el) {
        let newBody = el.innerText
        if(newBody){
            //消除 markdown 字体
            // newBody = newBody.replace(/(#|-|\*|>|)/g, "").replace(/@\[TOC\]\(.*\)/, "")
            newBody =  newBody.length > 100 ? newBody.substr(0, 100) + ' ...' : newBody
            return newBody
        }else  return ''
    },
    /**
     * markdown 文本转 text
     * @param md
     * @return {string}
     */
    mdToText(md){
        let txt = md;
        txt = txt.replace(/#{1,6} (.*?)/g,"$1")               //1-6标题
        txt = txt.replace(/\*\*(.*?)\*\*/g,"$1")              //粗体 **粗体**
        txt = txt.replace(/__(.*?)__/g,"$1")                  //粗体 __粗体__
        txt = txt.replace(/\*(.*?)\*/g,"$1")              //斜体 **斜体**
        txt = txt.replace(/_(.*?)_/g,"$1")                //斜体 __斜体__
        txt = txt.replace(/\*\*\*/g,"" )               //*** 分割线
        txt = txt.replace(/---/g,"" )                   //--- 分割线
        txt = txt.replace(/\+\+(.*?)\+\+/g,"$1")          //++下划线++
        txt = txt.replace(/~~(.*?)~~/g,"$1")            //~~中划线~~
        txt = txt.replace(/==(.*?)==/g,"$1")            //==标记==
        txt = txt.replace(/>+ (.*?)/g,"$1")            //段落引用
        txt = txt.replace(/\@\[(toc|TOC)\]\((.*?)\)/g,"[目录]")       //@[toc](目录)
        txt = txt.replace(/\[(.*?)\]\((.*?)\)/g,"$1 : $2")            //[链接](www.baidu.com)
        txt = txt.replace(/\!\[(.*?)\]\((.*?)\)/g,"[图片]")             // ![图片描述](http://www.image.com)
        txt =  txt.length > 100 ? txt.substr(0, 100) + ' ...' : txt
        return txt;
    },
    /**
     * 页面窗口自适应
     * @param window  窗口
     * @param cb    回调函数
     */
    listenResize(window,cb){
        window.onresize = () => {
            if( window.document.documentElement.clientWidth<800){
                cb('mobile');
            }else{
                cb('pc');
            }
        };

    }
}







