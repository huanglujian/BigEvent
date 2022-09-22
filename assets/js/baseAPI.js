// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  // options.url = 'http://ajax.frontend.itheima.net' + options.url
  options.url = 'http://www.liulongbin.top:3007' + options.url
  /* 这个 options.url 就是 我们在 $.post 中 给的 url ，因为在那边 只给 URL后面的部分，这边再给平完整  */
})