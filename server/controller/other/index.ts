import blogRouter from "../blog";

const express = require('express')
const otherRouter = express.Router()
const formatUtil = require("../../utils/format")
const axios = require('axios')


otherRouter.use((req, res, next) => {
    next();
})

//网易云热评
otherRouter.get('/cloud/music/comments',(req,res)=>{
    axios.get('https://api.66mz8.com/api/music.163.php?format=json').then((r) => {
        res.send(formatUtil.format(r.data));
    }).catch((err) => {
        console.error(err)
    })
})


export default otherRouter