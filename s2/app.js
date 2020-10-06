const express = require('express');
const path = require('path');
// 接收post请求参数
const formidable = require('formidable');
const { nextTick } = require('process');
const app = express();

const session = require('express-session');
app.use(session({ secret: 'secret key' }));

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

//cors开放跨域请求
app.use((req, res, next) => {
    //1,允许那些客户端跨域访问我

    //响应头的属性名称，对应的值
    //*允许所有的客户端访问
    res.header('Access-Control-Allow-Origin', '*');
    //2，允许客户端使用哪些方式访问我
    res.header('Access-Control-Allow-Methods', 'get,post');
    //允许客户端发动跨域请求时携带cookie信息
    res.header('Access-Control-Allow-Credentials', true);
    next()
})


app.get('/test', (req, res) => {
    //返回一个函数调用的代码，函数需要在客户端执行——把函数的调用写到字符串里
    const result = 'fn({name:"nico"})';
    res.send(result);
});

app.get('/better', (req, res) => {
    // //接收客户端传递过来的函数的名称
    // const fnName = req.query.callback;

    // //将函数名称对应的函数调用代码返回给客户端
    //把需要传递的参数转化为字符串格式
    // const result = fnName + '({name:"nico"})';

    // res.send(result);

    //服务器端代码优化
    //可完成上述所有代码的工作
    res.jsonp({ name: 'nico', age: 20 })
});
app.post('/login', (req, res) => {
    var form = formidable.IncomingForm();
    form.parse(req, (err, fileds, file) => {
        const { username, password } = fileds;


        if (username == 'nico' && password == '12345') {
            req.session.isLogin = true;
            res.send({ message: '登录成功' });
        } else {
            res.send({ message: '登陆失败，用户名或密码错误' })
        }

    })




})

app.listen(3001);
console.log('服务器启动成功');