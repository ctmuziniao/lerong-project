require(['../config'], () =>{
    require(['template','header','footer'], (template) =>{
        class Clearing{
            constructor() {
                this.container = $('#good-list')
                this.allPrice = $('.cart-allPrice')
                this.checkNum = $('.cart-action-right-num')
                this.init()
                this.calcMoney()
                this.findGoods()
                this.successPay()
            }

            //请求localStorage里面check属性值为true的数据，然后渲染页面
            init () {
                this.cart = JSON.parse(localStorage.getItem('cart'))
                let arr = []
                this.cart = this.cart.map(shop =>{
                    if(shop.check){
                        arr.push(shop)
                        let str = template('template-cart', { cart: arr })
                        this.container.html(str)
                    }
                    return shop
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

            //点击支付
            successPay () {
                $('#success-pay').on('click', () =>{
                    this.cart = JSON.parse(localStorage.getItem('cart'))
                    this.cart = this.cart.filter(shop =>{
                        if(shop.check){

                        }else{
                            return shop
                        }
                    })
                    //把修改过后的cart重新存入localStorage
                    localStorage.setItem('cart', JSON.stringify(this.cart))
                    this.calcMoney()
                    this.findGoods()
                    alert('支付成功')
                })
            }
        }

        new Clearing()
    })
})