const userForm = new UserForm();

userForm.loginFormCallback = function (data){
    ApiConnector.login(data, res => {
        if (res.error) {
            userForm.setLoginErrorMessage(res.error)
        }else {
            location.reload();
        }
    })
}

userForm.registerFormCallback = function (data){
    ApiConnector.register(data, res =>{
        if (res.error) {
            userForm.setRegisterErrorMessage(res.error);
        }else {
            location.reload();
        }
    })
}