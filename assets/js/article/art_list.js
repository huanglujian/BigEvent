$(function () {
    const q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                console.log(res)
                if (res.status !== 0) return layui.layer.msg(res.message)
                const htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        let y = dt.getFullYear().toString().padStart(2, '0')
        let m = (dt.getMonth() + 1).toString().padStart(2, '0')
        let d = dt.getDate().toString().padStart(2, '0')
        let hh = dt.getHours().toString().padStart(2, '0')
        let mm = dt.getMinutes().toString().padStart(2, '0')
        let ss = dt.getSeconds().toString().padStart(2, '0')

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }

    initTable()
    initCate()
    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message)
                const htmlStr = template('tpl-cate', res)
                console.log(htmlStr)  
                $('[name=cate_name]').html(htmlStr)
                // 通知 layui 重新渲染表单区域的UI结构
                layui.form.render()  // 不加这条代码那么下拉菜单里面值就不会被渲染到页面中
            }
        })
    }
})