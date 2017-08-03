window.onload = function () {

    //Model
    var data = {
        current_cat: {},
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
                cat_url: 'http://www.bz55.com/uploads/allimg/140415/137-140415144315.jpg',
                count: 0
            }
        ],
        view: {
            cat: true,
            admin_cat: false
        }
    }

    var octopus = {
        init: function () {
            data.current_cat = data.cats[0]
            view.init()
        },

        getView: function () {
            return data.view
        },

        setView: function(view){
            data.view = view
        },

        getCats: function () {
            return data.cats
        },

        getCurrentCat: function () {
            return data.current_cat
        }
    }

    var view = {
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

        showAdmin: function(){
            var show = {
                cat: false,
                admin_cat: true
            }
            octopus.setView(show)
            view.render()
        },

        showCat: function(){
            var show = {
                cat: true,
                admin_cat: false
            }
            octopus.setView(show)
            view.render()
        },

        createCatList: function () {
            var cats = octopus.getCats()
            for (var i = 0; i < cats.length; i++) {
                var li = document.createElement('li')
                li.innerHTML = cats[i].cat_name
                this.cat_list.appendChild(li)
            }
        },

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
        },

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
            cat_cancel.addEventListener('click', function () {
                view.showCat()
            }, true)
        },

        render: function () {
            var view = octopus.getView()
            this.creatCatView(view.cat)
            this.creatAdminCatView(view.admin_cat)
        }
    }

    octopus.init()
}