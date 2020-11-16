const { ApiService , ApiRoutes , RequestTypes } = require('../index');

module.exports = class EntryService {

    static async getEntryTitles() 
    {
        return await ApiService.sendRequest(RequestTypes.POST , ApiRoutes.getEntryTitlesUrl , null);
    }

    static async getEntryComments(title)
    {
        return await ApiService.sendRequest(RequestTypes.POST , ApiRoutes.getEntryCommentsUrl , title);
    }

    static async addComment(info)
    {
        return await ApiService.sendRequest(RequestTypes.POST , ApiRoutes.addCommentUrl , info);
    }

    static async entryControl(info)
    {
        return await ApiService.sendRequest(RequestTypes.POST , ApiRoutes.entryControlUrl , info);
    }

    static async deleteComment(info)
    {
        return await ApiService.sendRequest(RequestTypes.POST , ApiRoutes.deleteCommentUrl , info);
    }
    
    static async getUsersComments(info)
    {
        return await ApiService.sendRequest(RequestTypes.POST , ApiRoutes.getUsersCommentsUrl , info);
    }
    
    static async deleteUserMessage(info)
    {
        return await ApiService.sendRequest(RequestTypes.POST , ApiRoutes.deleteUserMessageUrl , info);
    }

}