define(['jquery'], () => {
    class Footer {
      constructor () {
        this.container = $('footer')
        this.init().then(() =>{
          this.cartFooter = $('#footer-cart-num')
          this.calcTotalNum2()
        })
      }
  
      init () {
        return new Promise(resolve => {
          this.container.load('http://localhost:1905/html/module/footer.html', resolve)
        })
      }

      //计算购物车总数量
      calcTotalNum2 () {
        let cart = localStorage.getItem('cart')
        if(cart){
          // $('.footer-cart-change').addClass('footer-cart-change')
          cart = JSON.parse(cart)
          let totalNum = cart.reduce((num, shop) =>{
            num += shop.num
            return num
          },0)
          this.cartFooter.html(totalNum)
        }else{
          this.cartFooter.html(0)
          // $('.footer-cart-change').addClass('footer-cart-change')
        }
      }
    }
    return new Footer()
  })