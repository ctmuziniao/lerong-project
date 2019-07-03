define(['jquery'], () => {
    class Header {
      constructor () {
        this.container = $('header')
        this.init().then(() =>{
          this.search()
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
    }
    return new Header()
  })