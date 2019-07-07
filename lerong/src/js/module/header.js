define(['jquery','cookie'], () => {
    class Header {
      constructor () {
        this.container = $('header')
        this.init().then(() =>{
          this.li1 = $('#clearfix')
          this.li2 = $('#li-2')
          this.hello = $('.hello')
          this.findUser()
          this.exitBtn = $('.exit')
          this.exitLogin()
          this.search()
          this.cartWrap = $('.header-cart-num')
          this.calcTotalNum()
        })
      }
  
      //加载头文件
      init () {
        return new Promise(resolve => {
          this.container.load('http://localhost:1905/html/module/header.html', resolve)
        })
      }
      
      //加载欢迎您
      findUser () {
        let userInfo = $.cookie('username')
        if(userInfo){
          this.li1.addClass('li-none')
          this.li2.addClass('li-block')
          this.hello.html(userInfo)
        }else{
          this.li1.addClass('clearfix-1')
          this.li2.addClass('li-5')
        }
      }

      //退出登录
      exitLogin () {
        this.exitBtn.on('click', () =>{
            $.removeCookie('username', '/')
            this.li2.removeClass('li-block')
            this.li2.addClass('li-5')
            this.li1.removeClass('li-none')
            this.li1.addClass('clearfix-1')
        })
      }

      //搜索框
      search () {
        $('#search').on('keyup', function (){
          let inputValue = $(this).val()
          $.getJSON(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${inputValue}&cb=?`, resp =>{
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