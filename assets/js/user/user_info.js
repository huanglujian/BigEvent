// 定义昵称和邮箱的正则
layui.form.verify({
  nickname: function (value) {
    if (value.length > 6) return "用户昵称必须1——6个字符"
  }
})
initUserInfo()

// 初始化用户的基本信息
function initUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status) return layui.layer.msg(res.message)
      layui.form.val('formUserInfo', res.data)
    }
  })
}


// 重置表单
$('.btnReset').on('click', function (e) {
  // 阻止重置按钮的默认行为
  e.preventDefault()
  initUserInfo()
})

// 提交修改
$('form').on('submit', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/my/userinfo',
    data: $(this).serialize(),
    success: function (res) {
      if (res.status) return layui.layer.msg(res.message)
      layui.layer.msg(res.message)
      window.parent.getUserInfo()
    }
  })
})
