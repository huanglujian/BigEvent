layui.form.verify({
  pass: [
    /^[\S]{6,12}$/
    , '密码必须6到12位，且不能出现空格'
  ],
  newPsw: function (value) {
    if(value == $('[name=oldPwd]').val()){
      return '新密码不能能与旧密码相同';
    }
  },
  repwd: function (value) {
    if(value !== $('[name=newPwd]').val()){
      return '密码不一致';
    }
  }
}) 


$('form').on('submit',function(e) {
  e.preventDefault()
  $.ajax({
    method:'POST',
    url: '/my/updatepwd',
    data: $(this).serialize(),
    success: function (res){
      if (res.status != 0) return layui.layer.msg(res.message)
      layui.layer.msg(res.message)
      $('form')[0].reset()
    }
  })
})