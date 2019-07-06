require(['../config'], () => {
    require(['jquery','cookie'], () =>{
        class Login{
            constructor(){
                this.loginBtn = $('.login-btn')
                this.loginName = $('#loginname')
                this.loginPsw = $('#loginpsw')
                this.confirmPsw = $('#confirmpsw')
                this.userLogin()
            } 
            
            //用户登录
            userLogin(){
                this.loginBtn.on('click', ()=> {
                    let loginname = this.loginName.val()
                    let loginpsw = this.loginPsw.val()
                    let confirmpsw = this.confirmPsw.val()
                    if(confirmpsw === loginpsw){
                        let allUser = localStorage.getItem('user')
                        allUser = JSON.parse(allUser)
                        const isExist = allUser.some(shop =>{
                            return shop.username == loginname
                        })
                        if(isExist){
                            allUser = allUser.map(shop =>{
                                if(shop.password == loginpsw){
                                    $.cookie('username', loginname, {path:'/'})
                                    window.location.href = 'http://localhost:1905'
                                }else{
                                    alert('登录失败，用户名或密码不正确，请重新登录')
                                    window.location.href = './login.html'
                                }
                            })
                        }else{
                            alert('登录失败，用户不存在，请重新登录')
                            window.location.href = './login.html'
                        }
                    }else{
                        alert('登录失败，两次输入密码不正确，请重新登录')
                        window.location.href = './login.html'
                    }
                })
            }
        }
        new Login()
    })
})