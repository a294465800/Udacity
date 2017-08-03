//自执行函数
$(function() {

    //Model,存放的数据
    var data = {
        lastID: 0,
        pizzas: []
    };

    //章鱼
    var octopus = {
        //添加Pizza
        addPizza: function() {
            var thisID = ++data.lastID;

            data.pizzas.push({
                id: thisID,
                visible: true
            });
            view.render();
        },

        //移除Pizza
        removePizza: function(pizza) {
            var clickedPizza = data.pizzas[ pizza.id - 1 ];
            clickedPizza.visible = false;
            view.render();
        },

        //通过给每个Pizza添加一个visible属性来判断是否渲染该Pizza
        getVisiblePizzas: function() {
            var visiblePizzas = data.pizzas.filter(function(pizza) {
                return pizza.visible;
            });
            return visiblePizzas;
        },

        //初始化视图
        init: function() {
            view.init();
        }
    };


    var view = {
        //视图初始化
        init: function() {
            //为添加按钮添加事件
            var addPizzaBtn = $('.add-pizza');
            addPizzaBtn.click(function() {
                octopus.addPizza();
            });

            //确定渲染列表和渲染模版
            this.$pizzaList = $('.pizza-list');
            this.pizzaTemplate = $('script[data-template="pizza"]').html();

            //为生成的Pizza添加点击移除事件
            this.$pizzaList.on('click', '.remove-pizza', function(e) {
                var pizza = $(this).parents('.pizza').data();
                octopus.removePizza(pizza);
                return false;
            });
            
            //渲染
            this.render();
        },

        //渲染
        render: function() {
            // 缓存列表对象和模版
            var $pizzaList = this.$pizzaList,
                pizzaTemplate = this.pizzaTemplate;

            //每次渲染之前清空之前的Pizza，也就是说，每一次的点击或者删除，都是一次重新渲染的过程
            $pizzaList.html('');
            octopus.getVisiblePizzas().forEach(function(pizza) {
                //每个Pizza之间不同之处就是data,所以这里替换{{id}}就可以
                var thisTemplate = pizzaTemplate.replace(/{{id}}/g, pizza.id);
                $pizzaList.append(thisTemplate);
            });
        }
    };

    //元素节点生成后，初始化
    octopus.init();
}());
