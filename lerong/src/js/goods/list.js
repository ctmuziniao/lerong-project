require(['../config'], () => {
    require(['template','url','header', 'footer'], (template, url) => {
      class List{
        constructor(){
          this.container = $('#lists-box')
          this.init().then((list) =>{
            this.draw(list)
          })
        }

        // init(){

        //   $.get('http://rap2api.taobao.org/app/mock/223347/goods/list', resp =>{
        //     let str = template('list-template',{list: resp.body.list})
        //     this.container.html(str)
        //   })
          
        // }

        init () {
          return new Promise(resolve => {
            $.get(url.rapBaseUrl + 'goods/list',resp =>{
              if(resp.code===200){
                resolve(resp.body.list)
              }
            })
          })
        }

        draw (list) {
          let str = template('list-template',{ list })
         // console.log(str)
          this.container.html(str)
        }
      }
      new List()
    })
  })