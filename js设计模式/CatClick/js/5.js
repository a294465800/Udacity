window.onload = function () {

    //Model
    var data = {
        current_cat: null,
        cats: [
            {
                cat_name: '小猪',
                cat_url: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426',
                count: 0
            },
            {
                cat_name: '小白',
                cat_url: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496',
                count: 0
            },
            {
                cat_name: '小黑',
                cat_url: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=45',
                count: 0
            },
            {
                cat_name: '小喵',
                cat_url: 'http://d2r4esoini6f0l.cloudfront.net/images/content/pictures/18214/content_womany_Cute_Cats_cats_33440930_1280_800_1410542878-19856-1650.jpg',
                count: 0
            },
            {
                cat_name: '小森',
                cat_url: 'https://i.ytimg.com/vi/ZGrQ1KDlNlE/maxresdefault.jpg',
                count: 0
            }
        ],
        view: {
            cat: true,
            admin_cat: false
        }
    }

    //中间件
    var octopus = {
        init: function () {
            //初始化当前猫咪
            data.current_cat = 0
            view.init()
        },

        //获取当前视图显示情况
        getView: function () {
            return data.view
        },

        //设置视图（猫咪？管理员？）
        setView: function (view) {
            data.view = view
        },

        //获取猫咪列表
        getCats: function () {
            return data.cats
        },

        //新增猫咪
        addCats: function (newCat) {
            data.cats.push(newCat)
        },

        //获取当前猫咪
        getCurrentCat: function () {
            return data.cats[data.current_cat]
        },

        //更换当前猫咪
        setCurrentCat: function (index) {
            data.current_cat = index
        },

        //统计当前猫咪点击次数
        setCurrentCatCount: function (count) {
            data.cats[data.current_cat].count = count
        },

        //修改当前猫咪数据（名字、地址）
        setCurrentCatData: function (cat_name, cat_url) {
            data.cats[data.current_cat].cat_name = cat_name
            data.cats[data.current_cat].cat_url = cat_url
        }
    }

    //视图
    var view = {
        //视图初始化，显示第一只猫视图
        init: function () {
            this.cat = document.getElementById('cat')
            this.cat_html = this.cat.innerHTML
            this.admin_cat = document.getElementById('admin_cat')
            this.admin_cat_html = this.admin_cat.innerHTML
            this.cat_list = document.getElementById('cat_list').getElementsByTagName('ul')[0]
            var admin = document.getElementById('admin')
            admin.addEventListener('click', view.showAdmin, true)
            this.createCatList()
            this.render()
        },

        //显示管理员视图
        showAdmin: function () {
            var show = {
                cat: false,
                admin_cat: true
            }
            octopus.setView(show)
            view.render()
        },

        //显示猫视图
        showCat: function () {
            var show = {
                cat: true,
                admin_cat: false
            }
            octopus.setView(show)
            view.render()
        },

        //创建左侧猫列表
        createCatList: function () {
            var cats = octopus.getCats()
            this.cat_list.innerHTML = ''
            for (var i = 0; i < cats.length; i++) {
                var li = document.createElement('li')
                li.innerHTML = cats[i].cat_name
                li.onclick = (function (index) {
                    return function () {
                        octopus.setCurrentCat(index)
                        view.render()
                    }
                })(i)
                this.cat_list.appendChild(li)
            }
        },

        //创建猫图片视图（标题、图片、点击次数）
        creatCatView: function (bool) {
            if (!bool) {
                this.cat.innerHTML = ''
                return false
            }
            this.cat.innerHTML = this.cat_html
            var oP = this.cat.getElementsByTagName('p')[0],
                oImg = this.cat.getElementsByTagName('img')[0],
                oSpan = this.cat.getElementsByTagName('span')[0],
                current_cat = octopus.getCurrentCat()

            oP.innerHTML = current_cat.cat_name
            oImg.src = current_cat.cat_url
            oSpan.innerHTML = current_cat.count
            oImg.onclick = function () {
                octopus.setCurrentCatCount(++current_cat.count)
                view.render()
            }
        },

        //创建管理员视图
        creatAdminCatView: function (bool) {
            if (!bool) {
                this.admin_cat.innerHTML = ''
                return false
            }

            this.admin_cat.innerHTML = this.admin_cat_html
            var cat_name = document.getElementById('cat_name'),
                cat_url = document.getElementById('cat_url'),
                cat_cancel = document.getElementById('cat_cancel'),
                cat_add = document.getElementById('cat_add'),
                cat_confirm = document.getElementById('cat_confirm'),
                current_cat = octopus.getCurrentCat()

            cat_name.value = current_cat.cat_name
            cat_url.value = current_cat.cat_url

            //管理员取消
            cat_cancel.addEventListener('click', function () {
                view.showCat()
            }, true)

            //管理员确认修改猫咪
            cat_confirm.addEventListener('click', function () {
                if (!cat_name.value || !cat_url.value) {
                    alert('信息不能为空！')
                    return false
                }
                octopus.setCurrentCatData(cat_name.value, cat_url.value)
                view.createCatList()
                view.showCat()
            }, true)

            //管理员新增猫咪
            cat_add.addEventListener('click', function () {
                if (!cat_name.value || !cat_url.value) {
                    alert('信息不能为空！')
                    return false
                }
                var newCat = {
                    cat_name: cat_name.value,
                    cat_url: cat_url.value,
                    count: 0
                }
                octopus.addCats(newCat)
                view.createCatList()
                view.showCat()
            }, true)
        },

        //渲染
        render: function () {
            var view = octopus.getView()
            this.creatCatView(view.cat)
            this.creatAdminCatView(view.admin_cat)
        }
    }

    //初始化
    octopus.init()
}