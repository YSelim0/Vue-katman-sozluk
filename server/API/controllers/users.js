const app = require('express')();
const Sequelize = require('../../database/sequelize');
const Users = require('../../database/Model/users')(Sequelize);

Users.sync();

app.post('/signIn' , async (req , res)=>{

    let username = req.body.username;
    let password = req.body.password;

    const result = await Users.findOne({
        where:{
            username:username,
            password:password
        }
    });
    if(result==null)
    {
        res.send({
            statusCode:200,
            message:"Yanlış Kullanıcı Adı Veya Şifre.",
            user:result,
        });
        return;
    }

    res.send({
        statusCode:400,
        message:"Giriş Başarılı!",
        user:result,
    });

});

app.post('/signUp' , async (req , res)=>{

    let username = req.body.username;
    let password = req.body.password;
    let discordName = req.body.discordName;
    let authToken = await createAuthToken();

    if(await checkUser(username)==false)
    {
        res.send({
            statusCode:200,
            message:"Kullanıcı Adı Daha Önce Alınmış."
        });
        return;
    }

    const response = await Users.create({
        username:username,
        password:password,
        discordName:discordName,
        authToken:authToken,
        userType:'standart'
    });

    res.send({
        statusCode:400,
        message:"Kullanıcı Başarıyla Eklendi!",
        user:response
    });
    
});

app.post('/cookieControl' , async (req , res)=>{
    let authToken = req.body.token;

    const result = await Users.findOne({
        where:{
            authToken:authToken,
        }
    });

    if(result==null)
    {
        res.send({
            statusCode:200,
            message:"Böyle Bir Kullanıcı Yok.",
            user:result
        });
        return;
    }

    res.send({
        statusCode:400,
        message:"İşlem Başarılı.",
        user:result
    });

});

app.post('/changePassword' , async (req , res)=>{
    
    let authToken = req.body.authToken;
    let oldPassword = req.body.oldPassword;

    const user = await Users.findOne({
        where:{
            authToken:authToken
        }
    });

    if(user==null)
    {
        res.send({
            statusCode:200,
            message:"Böyle Bir Kullanıcı Yok Sayfayı Yenileyip Tekrar Deneyin."
        });
        return;
    }
    else if(user.password!=oldPassword)
    {
        res.send({
            statusCode:200,
            message:"Eski Şifre Doğru Değil."
        });
        return;
    }

    user.password = req.body.newPassword;
    user.save();

    res.send({
        statusCode:400,
        message:"Şifre Başarıyla Değiştirildi!",
        response:user
    });

});


async function createAuthToken()
{
    let authToken="";
    do {

        let characters = ["abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" , "0123456789"]
        authToken="";
        for(var i=0;i<20;i++)
        {
            let turn = Math.floor(Math.random()*characters.length);
            authToken += characters[turn][Math.floor(Math.random()*characters[turn].length)];
        }

        const control = await Users.findOne({
            where:{
                authToken:authToken
            }
        });
        var isEmpty = control==null ? false : true;
    } while (isEmpty!=false);
    return authToken;
    
}

async function checkUser(username)
{
    const result = await Users.findOne({
        where:{
            username:username
        }
    });
    
    return result==null ? true : false;
}

module.exports = app;