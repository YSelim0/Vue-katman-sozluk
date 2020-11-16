const axios = require('axios');

const ApiService = class ApiService {

    static async sendRequest(requestType , url , body=null)
    {
        if(requestType==RequestTypes.GET)
        {
            return await axios.get(url);
        }
        else
        {
            return await axios.post(url , body);
        }
    }

}

const ApiRoutes = class ApiRoutes {
    
    static BaseUrl = "http://localhost:3000/";

    static signInUrl = this.BaseUrl + "signIn";
    static signUpUrl = this.BaseUrl + "signUp";
    static changePasswordUrl = this.BaseUrl + "changePassword";
    static cookieControlUrl = this.BaseUrl + "cookieControl";
    
    static getUsersCommentsUrl = this.BaseUrl + "getUsersComments";
    static getEntryTitlesUrl = this.BaseUrl + "getEntryTitles";
    static getEntryCommentsUrl = this.BaseUrl + "getEntryComments";
    static addCommentUrl = this.BaseUrl + "addComment";
    static entryControlUrl = this.BaseUrl + "entryControl";
    static deleteCommentUrl = this.BaseUrl + "deleteComment";
    static deleteUserMessageUrl = this.BaseUrl + "deleteUserMessage";
}

const RequestTypes = {
    POST:"post",
    GET:"get"
}

module.exports = {
    ApiService ,
    ApiRoutes ,
    RequestTypes
}