define(['jquery'], () => {
    class Header {
      constructor () {
        this.container = $('header')
        this.init().then(() =>{
          this.search()
          this.cartWrap = $('.header-cart-num')
          this.calcTotalNum()
        })
      }
  
      init () {
        return new Promise(resolve => {
          this.container.load('http://localhost:1905/html/module/header.html', resolve)
        })
      }

      //搜索框
      search () {
        $('#search').on('keyup', function (){
          let inputValue = $(this).val()
          $.getJSON(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${inputValue}&cb=?`, resp =>{
            console.log(resp)
          })
        })
      }

      //计算购物车总数量
       calcTotalNum () {
        let cart = localStorage.getItem('cart')
        if(cart){
          $('#header-cart span').addClass('header-cart-changef')
          cart = JSON.parse(cart)
          let totalNum = cart.reduce((num, shop) =>{
            num += shop.num
            return num
          },0)
          this.cartWrap.html(totalNum)
        }else{
          this.cartWrap.html(0)
          $('#header-cart span').addClass('header-cart-change')
        }
      }
    }
    return new Header()
  })