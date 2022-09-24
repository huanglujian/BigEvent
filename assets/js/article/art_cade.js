$(function () {
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message)
                const htmlStr = template('tpl_table', res)
                $('.layui-table tbody').html(htmlStr)
            }
        })
    }


    $('#btnAddCate').on('click', function () {
        layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            , content: $('#dialpgAdd').html()
        })
    })


    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)  // 不知道是接口问题还是啥，反正请求失败了 ， 继续写了
                if (res.status !== 0) return layui.layer.msg(res.message)
                initArtCateList()
                layui.layer.close(layui.layer.open())
            }
        })
    })

    $('tbody').on('click', '#itemEdit', function () {

        layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            , content: $('#dialpgEdit').html()
        })
        const id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                layui.form.val("form-edit", res.data)

            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)  // 不知道是接口问题还是啥，反正请求失败了 ， 继续写了
                if (res.status !== 0) return layui.layer.msg(res.message)
                initArtCateList()
                layui.layer.close(layui.layer.open())
            }
        })
    })


    $('tbody').on('click', '#btn-delete', function () {
        const id = $(this).attr('data-id')
        layui.layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if(res.status !== 0) return layui.layer.msg(res.message)
                    initArtCateList()
                }
            })
            layer.close(index)
        })
        
    })

})