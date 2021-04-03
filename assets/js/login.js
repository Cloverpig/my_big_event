$(function() {
    $('#link_tologin').on('click', function() {
        $('.reg_box').hide();
        $('.login_box').show()
    })
    $('#link_toreg').on('click', function() {
        $('.login_box').hide();
        $('.reg_box').show()
    })

    // 定义校验规则
    var form = layui.form
    var layer = layui.layer

    form.verify({
            // 自定义了一个叫做 pwd 校验规则
            psw: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            // 校验两次密码是否一致的规则
            repsw: function(value) {

                var pwd = $('#layui-form [name=user_psw]').val()
                if (pwd !== value) {
                    return '两次密码不一致！'
                }
            }
        })
        // 注册表单提交
    $('#form_reg').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            method: 'POST',
            data: {
                username: $('#form_reg [name=user_name]').val(),
                password: $('#form_reg [name=user_psw]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                    // 模拟人的点击行为
                $('#link_tologin').click()

            }
        })
    })

    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            // data: $(this).serialize(),
            data: {
                username: $('#form_login [name=user_name_login]').val(),
                password: $('#form_login [name=user_psw_login]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                    // localStorage.setItem('token', res.token)
                console.log(res.token);
                // 跳转到后台主页
                // location.href = '/index.html'
            }
        })
    })


})