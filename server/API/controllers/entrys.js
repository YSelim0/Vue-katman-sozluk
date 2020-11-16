const app = require('express')();
const Sequelize = require('../../database/sequelize');
const Entrys = require('../../database/Model/entrys')(Sequelize);
const Users = require('../../database/Model/users')(Sequelize);

Entrys.sync();
Users.sync();

app.post('/getEntryTitles' , async (req , res)=>{
    
    const allEntrys = await Entrys.findAll();

    let distinctEntrys = [];

    for(let i=0;i<allEntrys.length;i++)
    {
        if(distinctEntrys.indexOf(allEntrys[i].entryName)==-1) distinctEntrys.push(allEntrys[i].entryName);
    }

    res.send({
        statusCode:400,
        message:"Entryler Getirildi.",
        entrys:distinctEntrys
    });

});

app.post('/getEntryComments' , async (req ,res)=>{

    let entryName = req.body.title;

    const result = await Entrys.findAll({
        where:{
            entryName:entryName
        }
    });

    res.send({
        statusCode:400,
        message:"",
        entrys:result
    });

});

app.post('/addComment' , async (req , res)=>{

    var entryTitle = req.body.entryName;
    let authToken = req.body.authToken;
    let message = req.body.message;

    let d = new Date();
    let createDate = d.getHours()+":"+d.getMinutes()+" "+d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear();

    if(await checkUser(authToken)==false)
    {
        res.send({
            statusCode:200,
            message:"Lütfen Önce Giriş Yapın."
        });
        return;
    }
    
    const sender = await Users.findOne({
        where:{
            authToken:authToken
        }
    });

    const result = await Entrys.create({
        entryName:entryTitle,
        message:message,
        sender:sender.username,
        date:createDate
    });
    
    res.send({
        statusCode:400,
        message:"Yorum Eklendi!",
        comment:result
    });

});

app.post('/entryControl' , async (req , res)=>{

    let entryName = req.body.entryName;

    const control = await Entrys.findOne({
        where:{
            entryName:entryName
        }
    });

    if(control!=null)
    {
        res.send({
            statusCode:200,
            message:"Entry Daha Önce Oluşturulmuş.",
            entryName
        });
        return;
    }
    
    res.send({
        statusCode:400,
        message:"Entry Daha Önce Oluşturulmamış.",
        entryName
    });

});

app.post('/deleteComment' , async (req , res)=>{

    let authToken = req.body.authToken;

    const user = await Users.findOne({
        where:{
            authToken
        }
    });

    if(user==null)
    {
        res.send({
            statusCode:200,
            message:"Lütfen Tekrar Giriş Yapın."
        });
        return;
    }
    if(user.userType!="admin")
    {
        res.send({
            statusCode:200,
            message:"Bunun Yapmak İçin Yetkin Yok."
        });
        return;
    }

    let id = req.body.id;

    const result = await Entrys.destroy({
        where:{
            id
        }
    });

    res.send({
        statusCode:400,
        message:"Silme işlemi başarılı!",
        entry:result
    });

});

app.post('/getUsersComments' , async (req , res)=>{

    let authToken = req.body.authToken;

    if(await checkUser(authToken)==false)
    {
        res.send({
            statusCode:200,
            message:"Lütfen Tekrar Giriş Yapın."
        });
        return;
    }

    const user = await Users.findOne({
        where:{
            authToken:authToken
        }
    });

    const entrys = await Entrys.findAll({
        where:{
            sender:user.username
        }
    });

    res.send({
        statusCode:400,
        message:"Yorumlar Başarıyla Getirildi.",
        entrys:entrys
    });

});

app.post('/deleteUserMessage' , async (req , res)=>{

    let authToken = req.body.authToken;
    let messageId = req.body.id;

    const user = await Users.findOne({
        where:{
            authToken:authToken
        }
    });

    if(user==null)
    {
        res.send({
            statusCode:200,
            message:"Tekrar Giriş Yapmayı Deneyin."
        });
        return;
    }

    const comment = await Entrys.findOne({
        where:{
            id:messageId
        }
    });

    if(comment.sender != user.username)
    {
        res.send({
            statusCode:200,
            message:"Yeniden Giriş Yapın."
        });
        return;
    }

    const deletedComment = await Entrys.destroy({
        where:{
            id:messageId
        }
    });

    res.send({
        statusCode:400,
        message:"Mesaj Başarıyla Silindi!",
        comment:deletedComment
    });
    
});

async function checkUser(token)
{

    const user = Users.findOne({
        where:{
            authToken:token
        }
    });

    return user!=null ? true : false;

}

module.exports = app;