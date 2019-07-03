define(['jquery'], () => {
    class Footer {
      constructor () {
        this.container = $('footer')
        this.init()
      }
  
      init () {
        return new Promise(resolve => {
          this.container.load('http://localhost:1905/html/module/footer.html', resolve)
        })
      }
    }
    return new Footer()
  })