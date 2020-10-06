const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const formidable = require('formidable');

// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));


app.get('/first', (req, res) => {
    res.status(400).send('Hello Ajax');
});
app.get('/responseData', (req, res) => {
    res.send({
        name: 'nico'
    })
});
app.get('/get', (req, res) => {
    res.send(req.query);
});
app.post('/post', (req, res) => {
    res.send(req.body)
})
app.post('/json', (req, res) => {
    res.send(req.body)
});
app.get('/responseData', (req, res) => {
    res.send({
        name: 'nico'
    })
});
app.get('/readyState', (req, res) => {
    res.send('hello');
});
app.get('/error', (req, res) => {
    //执行过程中，服务器端输出一个不存在的变量，就会返回500
    // console.log(abc);
    //用来设置，返回http状态码
    res.status(400).send('not ok');
})
app.get('/cache', (req, res) => {
    fs.readFile('./test.txt', (err, result) => {
        res.send(result);
    })
});
//接收formData对象
app.post('/formdata', (req, res) => {
    //创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        res.send(fields);
    })
});

//实现formData对象文件上传
app.post('/upload', (req, res) => {
    const form = new formidable.IncomingForm();
    //设置上传文件存储路径
    form.uploadDir = path.join(__dirname, 'public', 'uploads');
    //保留上传文件的后缀名
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        //将客户端传递过来的文件地址响应到客户端
        //客户端上传的文件信息被存储在files里
        //上传文件时，请求参数写的时attrName
        //path属性存储的是上传之后文件的地址——服务器的硬盘地址
        //要转换
        console.log(files);
        res.send({
            path: files.attrName.path.split('public')[1]
        });
    })
});

app.get('/jsonp', (req, res) => {
    res.jsonp({
        name: 'nico',
        age: 50
    })
})

app.listen(3000);
console.log('服务器启动成功');