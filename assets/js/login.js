$(function () {
  $(".loginandregbox").on('click', 'a', function () {
    $(this).parents('.interface').hide().siblings('.interface').show()
  })

  //  从 layui 中 获取 form 对象
  let form = layui.form
  let layer = layui.layer
  form.verify({
    username: function (value, item) { //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return '用户名不能有特殊字符';
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return '用户名首尾不能出现下划线\'_\'';
      }
      if (/^\d+\d+\d$/.test(value)) {
        return '用户名不能全为数字';
      }
    }
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    , password: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],

    // 校验俩次棉麻是否一致的规则
    repwd: function (value) {
      /* 通过形参拿到的是确定密码框中的内容
      还需要拿到密码框中的内容
      然后进行一次等于的哦按段
      如果判断失败，则 return 一个提示消息 */
      let pwd = $('.res-box [name="password"]').val()
      if (pwd !== value) return '俩次密码不一致！'
    }
  })





  // 注册 事件
  $('#form_res').on('submit', function (e) {
    e.preventDefault()
    const data = {
      username: $('.res-box [name="username"]').val(),
      password: $('.res-box [name="password"]').val()
    }
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: data,
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        $('#form_res .links a').click()
      }
    })
  })

  // 登录 事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status != 0) return layer.msg(res.message)
        layer.msg(res.message)
        localStorage.setItem('token', res.token)
        location.href = './index.html'
      }
    })
  })

})