require(['../config'], () => {
    require(['template','url','header', 'footer','fly'], (template, url) => {
      class List{
        constructor(){
          this.container = $('#lists-box')
          this.init().then((list) =>{
            this.draw(list)
            this.classifyZero(list)
            this.classifyY(list)
            this.classifyX(list)
            this.classifyC5(list)
            this.classifyMw(list)
            this.priceIncreaseSorted(list)
            this.priceReduceSorted(list)
            this.commentIncreaseSorted(list)
            this.commentReduceSorted(list)
            this.addToCart(list)
          })
        }

        // init(){

        //   $.get('http://rap2api.taobao.org/app/mock/223347/goods/list', resp =>{
        //     let str = template('list-template',{list: resp.body.list})
        //     this.container.html(str)
        //   })
          
        // }

        //获取rap2里面地址为goods/list里面的数据
        init () {
          return new Promise(resolve => {
            $.get(url.rapBaseUrl + 'goods/list',resp =>{
              if(resp.code===200){
                resolve(resp.body.list)
              }
            })
          })
        }

        //用获取到的rap2的数据渲染列表页面
        draw (list) {
          let str = template('list-template',{ list })
         // console.log(str)
          this.container.html(str)
          $('#list-num').html(list.length)
        }

        //按照价格从低到高排序(冒泡排序算法)
        priceIncreaseSorted (list) {
          $('#increase').on('click', () =>{
            // let price
            // let arr = []
            // list = list.filter(shop =>{
            // price = shop.price
            // arr.push(price)
            // })
            var len = list.length
            for (var i = 0; i < len; i++) {
              for (var j = 0; j < len - 1 - i; j++) {
                  if (list[j].price > list[j+1].price) {        //相邻元素两两对比
                      var temp = list[j+1];        //元素交换
                      list[j+1] = list[j];
                      list[j] = temp;
                  }
              }
            }
            this.draw(list)
          })
        }

        //按照价格从高到低排序(冒泡排序算法)
        priceReduceSorted (list) {
          $('#reduce').on('click', () =>{
            var len = list.length
            for (var i = 0; i < len; i++) {
              for (var j = 0; j < len - 1 - i; j++) {
                  if (list[j].price < list[j+1].price) {        //相邻元素两两对比
                      var temp = list[j+1];        //元素交换
                      list[j+1] = list[j];
                      list[j] = temp;
                  }
              }
            }
            this.draw(list)
          })
        }

        //按照评论数从少到多排序(冒泡排序算法)
        commentIncreaseSorted (list) {
          $('.increase-comment').on('click', () =>{
            var len = list.length
            for (var i = 0; i < len; i++) {
              for (var j = 0; j < len - 1 - i; j++) {
                  if (list[j].comment > list[j+1].comment) {        //相邻元素两两对比
                      var temp = list[j+1];        //元素交换
                      list[j+1] = list[j];
                      list[j] = temp;
                  }
              }
            }
            this.draw(list)
          })
        }

        //按照评论数从多到少排序(冒泡排序算法)
        commentReduceSorted (list) {
          $('.reduce-comment').on('click', () =>{
            var len = list.length
            for (var i = 0; i < len; i++) {
              for (var j = 0; j < len - 1 - i; j++) {
                  if (list[j].comment < list[j+1].comment) {        //相邻元素两两对比
                      var temp = list[j+1];        //元素交换
                      list[j+1] = list[j];
                      list[j] = temp;
                  }
              }
            }
            this.draw(list)
          })
        }

        //Zero系列
        classifyZero (list) {
          let _this = this
          $('#Zero-series').on('click', function() {
            let name = $(this).html()
            $('#selected').html(name)
            let arr = []
            list = list.filter(shop => {
              if(shop.classify === name){
                arr.push(shop)
                _this.draw(arr)
                $('#list-num').html(arr.length)
              }
              return shop
            })
          })
        }

        //Y分类
        classifyY (list) {
          let _this = this
          $('#y-series').on('click', function() {
            let name = $(this).html()
            $('#selected').html(name)
            let arr = []
            list = list.filter(shop => {
              if(shop.classify === name){
                arr.push(shop)
                _this.draw(arr)
                $('#list-num').html(arr.length)
              }
              return shop
            })
          })
        }

        //X分类
        classifyX (list) {
          let _this = this
          $('#x-series').on('click', function() {
            let name = $(this).html()
            $('#selected').html(name)
            let arr = []
            list = list.filter(shop => {
              if(shop.classify === name){
                arr.push(shop)
                _this.draw(arr)
                $('#list-num').html(arr.length)
              }
              return shop
            })
          })
        }

        //超5系列分类
        classifyC5 (list) {
          let _this = this
          $('#c5-series').on('click', function() {
            let name = $(this).html()
            $('#selected').html(name)
            let arr = []
            list = list.filter(shop => {
              if(shop.classify === name){
                arr.push(shop)
                _this.draw(arr)
                $('#list-num').html(arr.length)
              }
              return shop
            })
          })
        }

        //漫威系列分类
        classifyMw (list) {
          let _this = this
          $('#mw-series').on('click', function() {
            let name = $(this).html()
            $('#selected').html(name)
            let arr = []
            list = list.filter(shop => {
              if(shop.classify === name){
                arr.push(shop)
                _this.draw(arr)
                $('#list-num').html(arr.length)
              }
              return shop
            })
          })
        }

        //将列表页面展示的商品添加到购物车
        addToCart (list) {
          $('.lists').on('click', '.buy-now',function(){
            const id =$(this).parents('.banner').attr('data-id')
            let details = list[id-1]
            const src = details.images[0]
            $(`<img src="${src}" style="width:40px; height:40px; border-radius:50%">`).fly({
              start: {
                left: $(this).offset().left,
                top: $(this).offset().top
              },
              end: {
                left: $('#shopCart').offset().left,
                top: $('#shopCart').offset().top,
                width: 0,
                height: 0
              },
              onEnd: function () {
                this.destroy()
                let num = parseInt($('#header-cart span').html())
                $('#header-cart span').html(++num)
              }
            })
            let allCart = localStorage.getItem('cart')
            if(allCart){
              allCart = JSON.parse(allCart)
              const isExist = allCart.some(shop =>{
                return shop.id == id
              })
              console.log(isExist)
              if(isExist){
                //说明该商品已经加入过购物车了，只需要把数量加上就可以了
                allCart = allCart.map(shop =>{
                  if(shop.id == id) shop.num++
                  return shop
                })
              } else{
                //购物车里面有数据，但没有当前要加入的这条，把这条数据push进去
                allCart.push({
                  ...details,
                  num: 1,
                  check: true
                })
              }
                //修改完之后把数据重新存一次
              localStorage.setItem('cart', JSON.stringify(allCart))
            }
            else{
              //购物车为空，把当前数据构造出一个新数组，再加上一个num（购物车里当前数据的数量）字段
              let arr = [{
                ...details,
                num: 1,
                check: true
              }]
              console.log(arr)
              //把这个数组转换成JSON字符串存
              localStorage.setItem('cart', JSON.stringify(arr))
            }
          })
        }
      }
      new List()
    })
  })