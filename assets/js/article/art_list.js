$(function () {
    // 定义一个 data 的 对象
    const q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }


    // 请求数据渲染页面
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
                renderPage(res.total)
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


    // 输入筛选条件渲染页面
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取表单的值
        const cate_id = $('[name=cate_id]').val()
        const state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })

    const laypage = layui.laypage
    function renderPage(total) {


        //执行一个laypage实例
        /* laypage.render({
            elem: 'laypage', //注意，这里的 是 ID，不用加 # 号 
            count: total,    //数据总数，从服务端得到
            limit: q.pagesize,   // 
            curr: q.pagenum
        }); */

        laypage.render({
            elem: 'laypage', //注意，这里的 是 ID，不用加 # 号 
            count: 50,    //数据总数，从服务端得到
            limit: 6,    // 每页显示几条数据
            // curr: 8,      // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 4, 5],
            jump: function (obj, first) {     // 分页发生切换的时候，会触发 jump函数
                console.log(obj.curr)
                console.log(obj.limit)

                q.pagenum = obj.curr   // obj返回的是 分页栏的各类数据
                q.pagesize = obj.limit
                console.log(first)
                if (!first) initTable()   // 当 切栏的时候触发的first 是 undefined ，否则为 true
            }
        });
    }


    // 给 删除按钮添加事件 ， 事件委托
    $('tbody').on('click', function () {
        let id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message)
                const len = $('#btn-delete').length
                layui.layer.msg(res.message)
                // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
                // 如果没有剩余的数据了，则让页码值 -1 之后，再调用 initTable 方法
                if (len === 1) {
                    // 页码值最小必须是 1
                    q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                }
                initTable()
            }
        })
    })

})