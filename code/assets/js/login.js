$(function () {
    //    点击“去注册”的账号链接
    $('#link_reg').on('click', function () {
        // 隐藏登录的div
        $('.login-box').hide(),
            // 显示注册的账号
            $('.reg-box').show()
    })
    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        // 显示注册的div
        $('.login-box').show(),
            // 隐藏注册账号
            $('.reg-box').hide()
    })

    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify函数自定义校验规则
    form.verify({
        // 自定义了一个叫pwd 的校验规则
        // [^[\S]{6,12}$/, '密码必须6-12位,且不能出现空格'] 替换这个
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位,且不能出现空格'], //不能是\s
        //校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个失败的消息即可
            // $('.reg-box [name=password]').val() 替换这个
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1.阻止表单默认提交的行为
        e.preventDefault()
        // 2.发起Ajax请求
        // #form_reg [name=username] 中间有空格 不然选不中这个元素
        // var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                // 输出status自带提示信息
                // return layer.msg(res.message);
                return layer.msg(res.message); //单词写错了应该是 message
            }
            layer.msg('注册成功，请登录！')
            //    模拟人的点击行为
            $('#link_login').click()
        })

    })
    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        // 1.阻止表单默认提交的行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // console.log(res.token);
                // 将登陆成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '../index.html'
            }
        })
    })
})
