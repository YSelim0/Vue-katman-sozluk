const { ApiService , ApiRoutes , RequestTypes } = require('../index');

module.exports = class UsersService {

    static async signUp(user)
    {
        return await ApiService.sendRequest(RequestTypes.POST , ApiRoutes.signUpUrl , user);
    }

    static async signIn(user)
    {
        return await ApiService.sendRequest(RequestTypes.POST , ApiRoutes.signInUrl , user);
    }

    static async cookieControl(user)
    {
        return await ApiService.sendRequest(RequestTypes.POST , ApiRoutes.cookieControlUrl , user);
    }

    static async changePassword(user)
    {
        return await ApiService.sendRequest(RequestTypes.POST , ApiRoutes.changePasswordUrl , user);
    }

}