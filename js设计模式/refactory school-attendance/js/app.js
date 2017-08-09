window.onload = function () {

  var globalData = {
    tr_template: [
      '<td class="name-col">{{name}}</td>',
      '<td class="attend-col for_new"></td>' +
      '<td class="missed-col">{{count}}</td>'
    ]
  }

  var octopus = {
    init: function () {
      if (!localStorage.days) {
        localStorage.days = 1
      }
      view.init()
    },

    //getLocalStorage => days
    getDays: function () {
      return localStorage.days
    },

    setDays: function () {
      localStorage.days++
    },

    //getLocalStorage => studet infos
    getData: function () {
      if (localStorage.attendance) {
        return JSON.parse(localStorage.attendance)
      } else {
        return []
      }
    },

    //setLocalStorage => student infos
    addData: function (newStudent) {
      var arr = []
      if (localStorage.attendance) {
        arr = JSON.parse(localStorage.attendance)
      }
      arr.push(newStudent)
      localStorage.attendance = JSON.stringify(arr)
    },

    //set data
    setData: function (data) {
      localStorage.attendance = JSON.stringify(data)
    },

    getTrTemplate: function () {
      return globalData.tr_template
    }
  }

  var view = {
    init: function () {
      var now_attendance = octopus.getData(),
        that = this

      this.days_list = document.getElementById('days_list')
      this.new_day = document.getElementById('new_day')
      this.student_list = document.getElementById('student_list')
      this.new_row = document.getElementById('new_row')
      this.add = document.getElementById('add')
      this.input_form = document.getElementById('input_form')
      this.input_student = document.getElementById('input_student')

      //first time to creat days
      this.firstCreatDays()

      // creat student list
      this.CreatStudents()

      //add newDay btn function
      this.new_day.addEventListener('click', function () {
        octopus.setDays()
        view.render()
      }, true)

      //show add new student form
      this.new_row.addEventListener('click', function () {
        that.input_form.setAttribute('style', 'display:block')
      }, true)

      //add new student
      this.add.addEventListener('click', function () {
        if (!that.input_student.value) {
          alert("Please enter the student's name!")
          return false
        }
        var days = octopus.getDays(),
          tmp = []
        for (var i = 0; i < days; i++) {
          tmp[i] = false
        }
        var tmp = {
          name: that.input_student.value,
          count: 0,
          checked: tmp
        }
        octopus.addData(tmp)
        that.input_form.setAttribute('style', 'display:none')
        that.input_student.value = ''
        view.render()
      }, true)
    },

    //first render days
    firstCreatDays: function () {
      var now_days = octopus.getDays(),
        that = this

      for (var i = 1; i <= now_days; i++) {
        var new_th = document.createElement('th')
        new_th.innerHTML = i
        that.days_list.insertBefore(new_th, that.new_day)
      }
    },

    //render student list
    CreatStudents: function () {
      this.student_list.innerHTML = ''
      var tr_list = octopus.getData(),
        tr_template = octopus.getTrTemplate(),
        days = octopus.getDays()

      for (var j = 0; j < tr_list.length; j++) {
        var new_tr = document.createElement('tr')
        new_tr.setAttribute('class', 'studet')
        new_tr.setAttribute('id', j)
        var tmp_input = ''
        for (var i = 0; i < days; i++) {
          tmp_input += '<td class="attend-col"><input type="checkbox" class="checkbox"></td>'
        }
        new_tr.innerHTML = (tr_template[0] + tmp_input + tr_template[1]).replace(/{{name}}/g, tr_list[j].name).replace(/{{count}}/g, tr_list[j].count)
        var tr_inputs = new_tr.getElementsByTagName('input')
        for (var k = 0; k < days; k++) {
          if (tr_list[j].checked[k]) {
            tr_inputs[k].checked = true
          } else {
            tr_inputs[k].checked = false
          }
        }
        this.student_list.appendChild(new_tr)
      }
      this.InputClick()
    },

    //add new day
    addDay: function () {
      var now_days = octopus.getDays(),
        ths = this.days_list.getElementsByTagName('th'),
        that = this
      if (now_days == ths[ths.length - 3].innerHTML) {
        return false
      }
      var new_th = document.createElement('th')
      new_th.innerHTML = now_days
      that.days_list.insertBefore(new_th, that.new_day)
    },

    //add onclick event on input
    InputClick: function () {
      var inputs = document.getElementsByClassName('checkbox')

      for (var i = 0; i < inputs.length; i++) {
        inputs[i].onclick = function () {
          var datas = octopus.getData(),
            parent_id = this.parentNode.parentNode.getAttribute('id'),
            inputs = this.parentNode.parentNode.getElementsByTagName('input'),
            that = this
          for (var j = 0; j < inputs.length; j++) {
            if (inputs[j] === that) {
              break
            }
          }
          if (that.checked) {
            datas[parent_id].count++
              datas[parent_id].checked[j] = true
          } else {
            datas[parent_id].count--
              datas[parent_id].checked[j] = false
          }
          octopus.setData(datas)
          view.render()
        }
      }
    },

    //render
    render: function () {
      this.addDay()
      this.CreatStudents()
    }
  }
  octopus.init()
}