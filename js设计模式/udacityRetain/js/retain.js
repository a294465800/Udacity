$(function () {

    var model = {
        init: function () {

            //获取本地存储数据，若没有，则新建
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function (obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },

        //获取所有本地存储的notes
        getAllNotes: function () {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function (noteStr) {
            // var Date = new Date()
            model.add({
                content: noteStr,
                date: Date.now()
            });
            view.render();
        },

        getNotes: function () {
            //新功能，反转数组
            return model.getAllNotes().reverse();
        },

        init: function () {
            model.init();
            view.init();
        }
    };


    var view = {
        //视图初始化
        init: function () {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');

            //表单提交后触发
            newNoteForm.submit(function (e) {
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                //阻止默认提交跳转
                e.preventDefault();
            });
            view.render();
        },
        render: function () {
            var htmlStr = '';
            //拼接
            octopus.getNotes().forEach(function (note) {
                htmlStr += '<li class="note">' +
                    '<span class="note-date">' + new Date(note.date).toLocaleDateString() +
                    '</span>' +
                    note.content +
                    '</li>';
            });
            this.noteList.html(htmlStr);
        }
    };

    octopus.init();
});