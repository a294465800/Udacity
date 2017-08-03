window.onload = function () {

  //Model
  var data = {
    cat_imgs: [
      'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426',
      'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496',
      'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454',
      'http://d2r4esoini6f0l.cloudfront.net/images/content/pictures/18214/content_womany_Cute_Cats_cats_33440930_1280_800_1410542878-19856-1650.jpg',
      'http://www.bz55.com/uploads/allimg/140415/137-140415144315.jpg'
    ],
    cat_num: 5,
    click_count: []
  }

  //章鱼
  var octopus = {
    init: function () {
      this.initArray()
      view.init()
    },

    //初始化数据
    initArray: function () {
      for (var i = 0; i < data.cat_num; i++) {
        data.click_count.push(0)
      }
    }
  }

  var view = {
    init: function () {
      //获取需要的按钮
      this.oCat = document.getElementById('cat')
      this.oCat_list = document.getElementById('cat_list').getElementsByTagName('ul')[0]
      this.oP = this.oCat.getElementsByTagName('p')[0]
      this.oImg = this.oCat.getElementsByTagName('img')[0]
      this.oSpan = this.oCat.getElementsByTagName('span')[0]
      this.createCatList()
      this.createCatView(0)
    },

    //创建li列表
    createCatList: function () {
      for (var i = 0; i < data.cat_num; i++) {
        var li = document.createElement('li')
        li.innerHTML = '猫咪' + (i + 1)
        li.dataset.index = i
        this.oCat_list.appendChild(li)
        li.onclick = function(){
          view.createCatView(parseInt(this.dataset.index))
        }
      }
    },

    //创建猫咪视图
    createCatView: function (index) {
      // console.log(index)
      this.oP.innerHTML = '猫咪' + (index + 1)
      this.oImg.src = data.cat_imgs[index]
      this.oSpan.innerHTML = data.click_count[index]
      this.oCat.onclick = function(){
        view.createClick(index)
      } 
    },

    //创建点击事件
    createClick: function (index) {
      data.click_count[index]++
      this.render(index)
    },

    //渲染
    render: function (index) {
      this.oP.innerHTML = '猫咪' + (index + 1)
      this.oImg.src = data.cat_imgs[index]
      this.oSpan.innerHTML = data.click_count[index]
    }
  }

  octopus.init()
}