$(function () {
  getUserInfo()
})

// 请求用户数据的函数
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) return layui.layer.msg(res.message)
      renderAvatar(res.data)
    }
  })
}
// 渲染头像 的 函数
function renderAvatar(data) {
  const name = data['nickname'] || data['username']
  $('.welcome').html(`欢迎  ${name}`)
  if (data.user_pic !== null) {
    $('.uesrinfo img').attr('src', data.user_pic)
    $('.text-avatar').hide()
    $('.layui-nav-img').show()
  } else {
    $('.text-avatar').html(`${name[0].toUpperCase()}`)
    $('.text-avatar').show()
    $('.layui-nav-img').hide()
  }
}

// 给 退出a标签 添加点击事件
$('.logout').on('click', function () {
  //eg1
  layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
    localStorage.removeItem('token')
    location.href = './login.html'
    // layer.close(index)
  })

})

$()