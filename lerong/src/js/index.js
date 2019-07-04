require(['./config'], () => {
    require(['template','url','header', 'footer','carousel','fly'], (template, url) => {
      class Show{
        constructor() {
          this.container = $('.reduced-price')
          this.show = $('.area-center')
          this.addCarousel()
          this.init().then((list) =>{
            this.renderShow(list)
            this.drawShow(list)
            this.addToCart()
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

        addCarousel () {
          $("#carousel_1").FtCarousel()
        }
        renderShow (list) {
          let arr1 = []
          $.each(list,(indexinfo,index) =>{
            if(indexinfo<5){
              arr1.push(index)
            }
          })
          let str = template('show-template', {list : arr1})
          this.container.html(str)
        }
        drawShow (list) {
          var arr2 = []
          $.each(list,(indexinfo,index) =>{
            if(indexinfo<6){
              arr2.push(index)
            }
          })
          this.arr2 = arr2
          let str = template('show-2-template', {list : arr2})
          this.show.html(str)
        }
        addToCart () {
          let _this = this

          //限时购
          $('.reduced-price').on('click', '.buy-now',function(){
            const id =$(this).parents('.banner').attr('data-id')
            let details = _this.arr2[id-1]
            const src = details.images[0]
            $(`<img src="${src}" style="width:40px; height:40px; border-radius:50%">`).fly({
              start: {
                left: $(this).offset().left,
                top: $(this).offset().top
              },
              end: {
                left: $('#shopCart').offset().left,
                top: $('#shopCart').offset().top,
                width: 0,
                height: 0
              },
              onEnd: function () {
                this.destroy()
                let num = parseInt($('#header-cart span').html())
                $('#header-cart span').html(++num)
              }
            })
            // var e = e.target
            // let li = e.parentNode.parentNode
            // console.log(li)
            //console.log(id)
            let allCart = localStorage.getItem('cart')
            if(allCart){
              allCart = JSON.parse(allCart)
              const isExist = allCart.some(shop =>{
                return shop.id == id
              })
              console.log(isExist)
              if(isExist){
                //说明该商品已经加入过购物车了，只需要把数量加上就可以了
                allCart = allCart.map(shop =>{
                  if(shop.id == id) shop.num++
                  return shop
                })
              } else{
                //购物车里面有数据，但没有当前要加入的这条，把这条数据push进去
                allCart.push({
                  ...details,
                  num: 1,
                  check: true
                })
              }
                //修改完之后把数据重新存一次
              localStorage.setItem('cart', JSON.stringify(allCart))
            }
            else{
              //购物车为空，把当前数据构造出一个新数组，再加上一个num（购物车里当前数据的数量）字段
              let arr = [{
                ...details,
                num: 1,
                check: true
              }]
              console.log(arr)
              //把这个数组转换成JSON字符串存
              localStorage.setItem('cart', JSON.stringify(arr))
            }
          })

          //超级电视
          $('.area-center').on('click', '.buy-now',function(){
            const id =$(this).parents('.banner').attr('data-id')
            let details = _this.arr2[id-1]
            const src = details.images[0]
            $(`<img src="${src}" style="width:40px; height:40px; border-radius:50%">`).fly({
              start: {
                left: $(this).offset().left,
                top: $(this).offset().top
              },
              end: {
                left: $('#shopCart').offset().left,
                top: $('#shopCart').offset().top,
                width: 0,
                height: 0
              },
              onEnd: function () {
                this.destroy()
                let num = parseInt($('#header-cart span').html())
                $('#header-cart span').html(++num)
              }
            })
            // var e = e.target
            // let li = e.parentNode.parentNode
            // console.log(li)
            console.log(id)
            let allCart = localStorage.getItem('cart')
            if(allCart){
              allCart = JSON.parse(allCart)
              const isExist = allCart.some(shop =>{
                return shop.id == id
              })
              console.log(isExist)
              if(isExist){
                //说明该商品已经加入过购物车了，只需要把数量加上就可以了
                allCart = allCart.map(shop =>{
                  if(shop.id == id) shop.num++
                  return shop
                })
              } else{
                //购物车里面有数据，但没有当前要加入的这条，把这条数据push进去
                allCart.push({
                  ...details,
                  num: 1,
                  check: true
                })
              }
                //修改完之后把数据重新存一次
              localStorage.setItem('cart', JSON.stringify(allCart))
            }
            else{
              //购物车为空，把当前数据构造出一个新数组，再加上一个num（购物车里当前数据的数量）字段
              let arr = [{
                ...details,
                num: 1,
                check: true
              }]
              console.log(arr)
              //把这个数组转换成JSON字符串存
              localStorage.setItem('cart', JSON.stringify(arr))
            }
          })
        }
      }
      new Show()
    })
  })