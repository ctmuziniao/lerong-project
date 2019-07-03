
require(['../config'], () => {
    require(['template','url','header', 'footer','zoom','fly'], (template, url) => {
      class Detail{
        constructor(){
          this.container = $('#shop-imgs')
          this.box = $('#shop-argument')
          this.addToCart()
          this.getData()
          .then(detail =>{
            this.renderDetail(detail)
            this.renderArgument(detail)
          })
        }
        getData () {
          const id = window.location.search.slice(4)
          return new Promise(resolve =>{
            $.get(`${url.rapBaseUrl}goods/detail`, {id}, resp =>{
              if(resp.code === 200){
                let {detail} = resp.body
                detail = {
                  ...detail,
                  id
                }
                this.detail = detail
                resolve(detail)
              }
            })
          })
        }

        renderArgument(detail) {
          let str = template('template-argument',{ data: detail })
          this.box.html(str)
        }

        renderDetail (detail) {
          let str = template('template-img',{ data: detail})
          this.container.html(str)
          this.zoomImg()
        }

        zoomImg () {
          $('.zoom-img').elevateZoom({
            gallery: 'gal1', // ul父级盒子的id
            cursor: 'pointer',
            borderSize: '1',
            galleryActiceClass: 'active',
            borderColor: '#f2f2f2'
          })
        }

        addToCart () {
          let _this = this
          $('.product-info').on('click', '.addCart', function(){
            const src = _this.detail.images[0]
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
                $('#header-cart span').addClass('header-cart-change')
              }
            })

            //把商品加入购物车
            //把当前商品存入localStorage
            // let str = JSON.stringify(_this.detail)
            // localStorage.setItem('cart', str)

            //先取到购物车里面的数据，判断购物车是否有商品
            let allCart = localStorage.getItem('cart')
            if(allCart){
              //购物车有数据不为空
              //从localStorage中取出的是JSON字符串，所有转换一下
              allCart = JSON.parse(allCart)
              //判断购物车里面是否有当前这条商品
              const isExist = allCart.some(shop => {
                return shop.id === _this.detail.id
              })
              console.log(isExist)

              if(isExist){
                //说明该商品已经加入过购物车了，只需要把数量加上就可以了
                allCart = allCart.map(shop =>{
                  if(shop.id === _this.detail.id) shop.num++
                  return shop
                })
              }else{
                //购物车里面有数据，但没有当前要加入的这条，把这条数据push进去
                allCart.push({
                  ..._this.detail,
                  num: 1,
                  check: true
                })
              }
              //修改完之后把数据重新存一次
              localStorage.setItem('cart', JSON.stringify(allCart))

            }else{
              //购物车为空，把当前数据构造出一个新数组，再加上一个num（购物车里当前数据的数量）字段
              let arr = [{
                ..._this.detail,
                num: 1,
                check: true
              }]
              //把这个数组转换成JSON字符串存
              localStorage.setItem('cart', JSON.stringify(arr))
            }
          })
        }
      }
      new Detail()
    })
  })