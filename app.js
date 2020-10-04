const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
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
})
app.listen(3000);
console.log('服务器启动成功');