require(['../config'], () => {
    require(['template','footer'], (template) => {
      class Cart{
        constructor() {
          this.container  = $('#cart-list')
          this.allPrice = $('.cart-allPrice')
          this.allCheck = $('.allCheck')
          this.checkNum = $('.cart-action-right-num')
          this.init()
          this.calcMoney()
          this.checkChange()
          this.allCheckChange()
          this.findGoods()
        }
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
          }


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
            console.log(_this.cart)
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

        //全选
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