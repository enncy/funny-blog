



module.exports = {
    //格式化时间
    getTime(t,simple) {
        let  date=new Date(parseInt(t));
        let year=date.getFullYear();
        let mon = date.getMonth()+1;
        let day = date.getDate();
        let hours = date.getHours();
        let minu = date.getMinutes();
        return year+'年'+mon+'月'+day+'日  '+(simple?'':hours+':'+minu);
    }
}







