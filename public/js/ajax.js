function ajax(options) {

    //创立一个对象，存储默认值，减少用户输入量
    var defaults = {
        type: 'get',
        url: '',
        data: {},
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        sucess: function() {},
        error: function() {},
    };
    //用户没传的参数就用默认值，传了的就用用户值
    //对象覆盖
    Object.assign(defaults, options);

    var xhr = new XMLHttpRequest();

    //拼接请求参数
    var params = '';
    for (var attr in defaults.data) {
        params += `${attr}=${defaults.data[attr]}&`
    }
    //对字符串最后一个&截取掉
    params = params.substr(0, (params.length - 1));
    if (defaults.type == 'get') {
        defaults.url = defaults.url + '?' + params;
    }
    xhr.open(defaults.type, defaults.url);


    if (defaults.type == 'post') {

        //js里，如果不是字符串不能是中横线
        var contentType = defaults.header['Content-Type']
        xhr.setRequestHeader('Content-Type', contentType);

        //判断用户希望的请求参数格式
        if (contentType == 'application/json') {
            //向服务器传递json格式的请求参数
            xhr.send(JSON.stringify(defaults.data))
        } else {
            //传递普通格式的请求参数
            xhr.send(params);
        }
    } else {
        xhr.send();
    }
    //开放回调函数
    xhr.onload = function() {
        //获取响应头中的数据

        var contentType = xhr.getResponseHeader('Content-Type');
        //如果响应类中包含'application/json'
        if (contentType.includes('application/json')) {

            //如果要使用返回的数据，就要转换为json对象
            var responseText = JSON.parse(xhr.responseText);
        }
        if (xhr.status == 200) {
            //请求成功，调用处理成功情况的函数
            defaults.sucess(responseText, xhr);
        } else {
            //发生错误时，依然把返回的错误信息返回回去
            //返回xhr：包含更多信息
            defaults.error(responseText, xhr)
        }

    }

}