require(['./config'], () => {
    require(['template','url','header', 'footer'], (template, url) => {
      class Show{
        constructor() {
          this.container = $('.reduced-price')
          this.show = $('.area-center')
          this.init().then((list) =>{
            this.renderShow(list)
            this.drawShow(list)
          })
        }
        init () {
          return new Promise(resolve =>{
            $.get(url.rapBaseUrl + 'goods/list',resp =>{
              if(resp.code===200){
                resolve(resp.body.list)
              }
            })
          })
        }
        renderShow (list) {
          let arr = []
          $.each(list,function(indexinfo,index){
            if(indexinfo<5){
              arr.push(index)
            }
          })
          let str = template('show-template', {list : arr})
          this.container.html(str)
        }
        drawShow (list) {
          let arr = []
          $.each(list,function(indexinfo,index){
            if(indexinfo<6){
              arr.push(index)
            }
          })
          let str = template('show-2-template', {list : arr})
          this.show.html(str)
        }
      }
      new Show()
    })
  })