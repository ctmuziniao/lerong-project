
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
          })
        }
      }
      new Detail()
    })
  })