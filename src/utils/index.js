const config = require('@/config/index')


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
        hours = hours < 10 ? '0' + hours : hours;
        let minu = date.getMinutes();
        minu = minu < 10 ? '0' + minu : minu;
        return year + '年' + mon + '月' + day + '日  ' + (simple ? '' : hours + ':' + minu);
    },
    /**
     * 根据指定的t，获取t距离现在过去了多少天
     * @param t     指定的时间
     * @param detail    自动适配显示具体时间，如果时间太久，显示日期，否则显示 xx 前
     * @return {any} elapsed 过去的时间
     */
    getElapsedTime(t,detail) {

        let now = Date.now();
        let elapsed = now - t
        let result = ''
        let second = 1000;
        let minute = 60 * second;
        let hours = 60 * minute;
        let day = 24 * hours;
        let months = [31,28,31,30,31,30,31,31,30,31,30,31]
        let nowYear = new Date(now).getFullYear()
        let nowMonth = new Date(now).getMonth()
        //判断是不是闰年
        if(nowYear%4===0 && nowYear%100!==0 || nowYear%400===0)months[1]=29;
        let month = Math.abs(new Date(t).getMonth() - nowMonth)
        let year = nowYear - new Date(t).getFullYear()

        if (year !== 0 && month >= 12)  result = year + '年'
        else if (month !== 0 &&  Math.round(elapsed / day) >= months[nowMonth]) result =  month + '个月'
        else if (parse(day) !== 0) result= parse(day) + '天'
        else if (parse(hours) !== 0) result= parse(hours) + '小时'
        else if (parse(minute) !== 0) result = parse(minute) + '分钟'
        else if (parse(second) !== 0) result = parse(second) + '秒'
        else if(parse(1) !== 0)result = parse(1) + '毫秒'
        else result = '1毫秒'

        //数据分析
        // console.table({
        //     elapsed, year,month,day:parse(day),hours:parse(hours),minute:parse(minute),second:parse(second),haomiao:parse(1),result
        // })

        function parse(time) {
            return  Math.round(elapsed/time)
        }
        if(detail){
            if(parse(day)>1){
                result = this.getTime(t)
            }else{
                result += '前'
            }

        }


        return result;
    },

    //格式化博客内容
    formatBlogBody(el) {
        let newBody = el.innerText
        if (newBody) {
            //消除 markdown 字体
            // newBody = newBody.replace(/(#|-|\*|>|)/g, "").replace(/@\[TOC\]\(.*\)/, "")
            newBody = newBody.length > 100 ? newBody.substr(0, 100) + ' ...' : newBody
            return newBody
        } else return ''
    },
    /**
     * markdown 文本转 text
     * @param md
     * @param limit 长度限制，默认150
     * @return {string}
     */
    mdToText(md,limit) {
        if(!md)return md
        if(!limit)limit=150
        let txt = md;
        txt = txt.replace(/#{1,6} (.*?)/g, "$1")               //1-6标题
        txt = txt.replace(/\*\*(.*?)\*\*/g, "$1")              //粗体 **粗体**
        txt = txt.replace(/__(.*?)__/g, "$1")                  //粗体 __粗体__
        txt = txt.replace(/\*(.*?)\*/g, "$1")              //斜体 **斜体**
        txt = txt.replace(/_(.*?)_/g, "$1")                //斜体 __斜体__
        txt = txt.replace(/\*\*\*/g, "")               //*** 分割线
        txt = txt.replace(/---/g, "")                   //--- 分割线
        txt = txt.replace(/\+\+(.*?)\+\+/g, "$1")          //++下划线++
        txt = txt.replace(/~~(.*?)~~/g, "$1")            //~~中划线~~
        txt = txt.replace(/==(.*?)==/g, "$1")            //==标记==
        txt = txt.replace(/>+ (.*?)/g, "$1")            //段落引用
        txt = txt.replace(/\@\[(toc|TOC)\]\((.*?)\)/g, "[目录]")       //@[toc](目录)
        txt = txt.replace(/\[(.*?)\]\((.*?)\)/g, "$1 : $2")            //[链接](www.baidu.com)
        txt = txt.replace(/\!\[(.*?)\]\((.*?)\)/g, "[图片]")             // ![图片描述](http://www.image.com)
        txt = txt.replace(/\s+/g, " ")      //替换掉特殊字符
        txt = txt.length > limit ? txt.substr(0, limit) + ' ...' : txt
        return txt;
    },

    /**
     * 页面窗口自适应
     * @param cb    回调函数
     */
    listenResize( cb) {
        window.onresize = () => {
            if (window.document.documentElement.clientWidth < 800) {
                cb('mobile');
            } else {
                cb('pc');
            }
        };

    },
    //获取设备
    getPlatform() {
        if (window.document.documentElement.clientWidth < 800) {
            return 'mobile'
        } else {
            return 'pc'
        }
    },
    //设置 meta 信息
    setMeta($route) {

        document.querySelector('title').innerText = $route?.meta?.title || config.title
        document.querySelector('meta[name=keywords]').content = $route?.meta?.keywords || $route?.meta?.title ||  config.title
        document.querySelector('meta[name=description]').content = this.mdToText($route?.meta?.description,150) || config.profile

    },

    //浏览器全屏
    fullScreen(){
        let el = document.documentElement;
        let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        if(typeof rfs != "undefined" && rfs) {
            rfs.call(el);
        };
    },
    //退出浏览器全屏
    exitScreen(){
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        if(typeof cfs != "undefined" && cfs) {
            cfs.call(el);
        }
    }
}







