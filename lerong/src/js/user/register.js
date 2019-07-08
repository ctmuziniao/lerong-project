require(['../config'], () => {
    require(['jquery','cookie'], (cookie) =>{
        class Regist{
            constructor(){
                this.registBtn = $('.register-btn')
                this.userName = $('#username')
                this.userPassword = $('#userpassword')
                this.confirmPassword = $('#confirm-password')
                this.userRegist()
            } 
            

            //用户注册
            userRegist(){
                this.registBtn.on('click', ()=> {
                    let username = this.userName.val()
                    let password = this.userPassword.val()
                    let confirmpassword = this.confirmPassword.val()
                    if(confirmpassword === password){
                    // 正式开发的话这里应该发送服务器服务器返回一个注册成功或者失败
                    // 我们就模拟一下这个过程，把用户信息存cookie
                    let registerInfo = {
                        "username": username,
                        "password": password
                      }
                      let allUser = localStorage.getItem('user')
                      console.log(allUser)
                      if(allUser){
                        allUser = JSON.parse(allUser)
                        const isExist = allUser.some(shop => {
                            return shop.username == username
                          })
                          if(isExist){
                              alert('该用户名已注册,请重新注册')
                              window.location.href = './register.html'
                          }else{
                              allUser.push(registerInfo)
                              localStorage.setItem('user', JSON.stringify(allUser))
                              alert('注册成功，即将跳转登录页面')
                              window.location.href = './login.html'
                          }
                      }else{
                          let arr = [registerInfo]
                          localStorage.setItem('user', JSON.stringify(arr))
                          alert('注册成功，即将跳转登录页面')
                          window.location.href = './login.html'
                      }
                    }else{
                        alert('注册失败,两次密码输入不一致，请重新输入')
                        window.location.href = './register.html'
                    }
                    
                })
            }
        }
        new Regist()
    })
})