require(['../config'], () => {
    require(['template','url','header','footer'], (template, url) => {
      class Cart{
        constructor() {
          this.container  = $('#cart-list')
          this.loveBox =$('#cart-love')
          this.allPrice = $('.cart-allPrice')
          this.allCheck = $('.allCheck')
          this.checkNum = $('.cart-action-right-num')
          this.removeAllGoods = $('.remove-checkedgoods')
          this.init()
          this.getDataLove().then((list)=>{
            this.renderLove(list)
          })
          this.calcMoney()
          this.checkChange()
          this.allCheckChange()
          this.reduceNumber()
          this.increaseNumber()
          this.removeGoods()
          this.removeCheckedGoods()
          this.findGoods()
        }

        //获取localStorage里面保存的数据
        init () {
          this.cart = JSON.parse(localStorage.getItem('cart'))
          

          //有数据的情况
          let str = template('template-cart', { cart: this.cart })
          this.container.html(str)

          // 一上来的时候默认就要判断是否全选
          let isAllCheck = this.cart.every(shop => {
            return shop.check === true
          })
          this.allCheck.prop('checked', isAllCheck)
          //每一次刷新页面都要重新计算购物车里选中状态的商品的总价和数量
          this.calcMoney()
          this.findGoods()
          this.vainCart()
          }

        //购物车下面的猜你喜欢展示效果的数据获取
        getDataLove () {
          return new Promise(resolve =>{
            $.get(url.rapBaseUrl + 'goods/list',resp =>{
              if(resp.code===200){
                resolve(resp.body.list)
              }
            })
          })
        }

        //拿到数据进行猜你喜欢模块的页面的渲染
        renderLove (list) {
          let arr = []
          $.each(list,(indexinfo,index) =>{
            if(indexinfo<5){
              arr.push(index)
            }
          })
          let str = template('template-love', {list : arr})
          this.loveBox.html(str)
        }

          //空购物车
        vainCart () {
          let allCart = localStorage.getItem('cart')
          if(allCart === '[]'){
            $(".vain-cart").removeClass("hide");
            $(".table-top").addClass("hide")
          }else{
            $(".table-top").removeClass("hide");
            $(".vain-cart").addClass("hide")
          }
        }

        //改变单个商品的选中状态
        checkChange () {
          let _this = this
          //事件委托  给container帮change事件
          this.container.on('change','.check', function(){
            const id = $(this).parents('.cart-list').attr('data-id')
            _this.cart = _this.cart.map(shop =>{
              if(shop.id == id){
                shop.check = $(this).prop('checked')
              }
              //console.log(shop)
              return shop
            })
            //把修改过后的cart重新存入localStorage
            localStorage.setItem('cart', JSON.stringify(_this.cart))
            _this.calcMoney()
            _this.findGoods()

            //判断是否全选
            //判断_this.cart是否每一条数据都为选中状态
            let isAllCheck = _this.cart.every(shop =>{
              return shop.check === true
            })
            _this.allCheck.prop('checked',isAllCheck)
          })
        }

        //实现全选按钮的功能
        allCheckChange () {
          let _this = this
          this.allCheck.on('change', function(){
            let ischeck = $(this).prop('checked')
            _this.cart = _this.cart.map(shop =>{
              shop.check = ischeck
              return shop
            })

            $('.check').prop('checked', ischeck)
            _this.calcMoney()
            _this.findGoods()
          })
        }

        //减少商品数量
        reduceNumber () {
          let _this = this
          this.container.on('click','.reduce-num', function() {
            const id = $(this).parents('.cart-list').attr('data-id')
            _this.cart = _this.cart.filter(shop =>{
              if(shop.id == id){
                if(shop.num > 1){
                  shop.num --
                  return shop
                }
              }else{
                return shop
              }
            })
            localStorage.setItem('cart', JSON.stringify(_this.cart))
            _this.init()
          })
        }

        //增加商品数量
        increaseNumber () {
          let _this = this
          this.container.on('click','.increase-num', function() {
            const id = $(this).parents('.cart-list').attr('data-id')
            _this.cart = _this.cart.map(shop => {
              if(shop.id == id){
                shop.num += 1
              }
              return shop
            })
            //把修改过后的cart重新存入localStorage
            localStorage.setItem('cart', JSON.stringify(_this.cart))
            _this.init()
          })
        }

        //删除商品
        removeGoods () {
          let _this = this
          this.container.on('click', '.remove-goods', function() {
            const id = $(this).parents('.cart-list').attr('data-id')
            _this.cart = _this.cart.filter(shop =>{
              if(shop.id == id){
              }else{
                return shop
              }
            })
            //把修改过后的cart重新存入localStorage
            localStorage.setItem('cart', JSON.stringify(_this.cart))
            _this.init()
          })
        }

        //删除选中的商品
        removeCheckedGoods () {
          let _this = this
          this.removeAllGoods.on('click', function() {
            _this.cart = _this.cart.filter(shop =>{
              if(shop.check === true){

              }else{
                return shop
              }
            })
            console.log(_this.cart)
            //把修改过后的cart重新存入localStorage
            localStorage.setItem('cart', JSON.stringify(_this.cart))
            _this.init()
          })
        }

        //计算选中商品数量
        findGoods () {
          this.num = 0
          this.num = this.cart.reduce((num,shop) =>{
            if(shop.check){
              num += shop.num
            }
            return num
          },0)

          //显示到页面
          this.checkNum.html(this.num)
          if(this.num > 0){
            $('.header-cart-num').html(this.num)
            $('#footer-cart-num').html(this.num)
            $('#header-cart span').removeClass('header-cart-change')
            $('#header-cart span').addClass('header-cart-changef')
          }else{
            $('#header-cart span').removeClass('header-cart-changef')
            $('#header-cart span').addClass('header-cart-change')
          }
        }

        //计算选中商品总价
        calcMoney () {
          this.money = 0
          this.money = this.cart.reduce((money,shop) =>{
            if(shop.check){
              money += shop.num * shop.price
            }
            return money
          },0)
          
          //显示到总价
          this.allPrice.html(this.money.toFixed(2))
        }
      }
      new Cart()
    })
  })