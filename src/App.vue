<template>
  <div id="app">
    
    <header>
      <div class="logo" onclick="location.reload()">
        <img src="./assets/katmanLogo.png" alt="logo">
      </div>
      <div class="search">
        <input type="text" name="searchBox" id="searchBox" placeholder="Ara..." v-model="searchBox">
        <label for="searchBox" @click="searchEntry()"><i class="fas fa-search"></i></label>
      </div>
      <div class="navigators">
        <h1 class="login-button" v-if="signText" @click="openCloseSignScreen(true)">Giriş Yap <i class="fas fa-sign-in-alt"></i></h1>
        <div class="session">
          <h1 class="user-text" v-if="!signText">{{username}} <i class="fas fa-user"></i></h1>
          <div class="list">
            <ul>
              <li @click="myAccount()">
                Hesabım
              </li>
              <li @click="openCloseChangePasswordScreen(true)">
                Şifre Değiştir
              </li>
              <li @click="logOut()">
                Çıkış Yap
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <div class="main-container">
      
      <div class="all-entrys">
        <div class="entrys">

          <div class="entry" v-for="(item , index) in entrys" v-bind:key="index">
            <a href="#">
              <p v-on:click="getEntryComments(item)">{{ item }}</p>
            </a>
          </div>

        </div>
      </div>

      <div class="welcome-section" v-if=" contentScreen=='welcome' ">
        <img src="./assets/katmanLogo.png" alt="katman-logo">
        <div class="welcome-title">
          <h1>Katman Sözlüğe Hoşgeldiniz!</h1>
          <h2>Hayırlı Forumlar...</h2>
        </div>
        <div class="announcements">
          <h3>Duyurular</h3>
          <p><span class="exclamation-red">!</span>Artık 'Katman İtiraf' başlığı altında anonim mesaj yazabilirsiniz.</p>
        </div>
        <div class="how-to-use">
          <h3>Sözlük Nasıl Kullanılır?</h3>
          <p>‎• Sözlüğe <span class="underline">yeni entry eklemek için</span> önce arama kısmında aratın eğer böyle bi entry zaten açılmış ise sizi o sayfaya yönlendirecektir , eğer açılmamışsa isterseniz bu konuyu konuşan ilk kişi siz olabilirsiniz.</p>
          <p>• Sol kısımdan daha önce açılmış tüm entryleri görebilirsiniz. Üzerine tıklayıp en alt kısımından dilediğiniz gibi sohbete katılabilirsiniz. <span class="underline">Entrylere yorum eklemek için</span> öncelikle hesabınız varsa giriş yapmak , yoksa kayıt olmak gereklidir.</p>
          <p>• Mesajlarınızı <span class="underline">'Hesabım' kısmından kolaylıkla silebilirsiniz.</span> Hayırlı Forumlar...</p>
        </div>
        <div class="populerTitle">
          <h3>Popüler Başlıklar</h3>
          <div class="titles">
            
            <div class="title">
              <a href="#">
                <p v-on:click="getEntryComments('çağrı ergün')">#Çağrı Ergün</p>
              </a>
            </div>

            <div class="title">
              <a href="#">
                <p v-on:click="getEntryComments('nuriben')">#Nuriben</p>
              </a>
            </div>

            <div class="title">
              <a href="#">
                <p v-on:click="getEntryComments('kavun')">#Kavun</p>
              </a>
            </div>

            <div class="title">
              <a href="#">
                <p v-on:click="getEntryComments('katman itiraf')">#Katmanİtiraf</p>
              </a>
            </div>

          </div>
        </div>
        <div class="madeby">
          <h1>Made By HeaveN</h1>
          <div class="account-links">
            <div class="account-button">
              <a href="https://heavennn.xyz/" target="blank"><i class="fas fa-window-restore icon"></i></a>
              <div class="--message">
                <p>Portfolio</p>
              </div>
            </div>
            <div class="account-button">
              <a href="https://instagram.com/yselim0" target="blank"><i class="fab fa-instagram"></i></a>
              <div class="--message">
                <p>Instagram</p>
              </div>
            </div>
            <div class="account-button">
              <a href="https://twitter.com/yselim00" target="blank"><i class="fab fa-twitter"></i></a>
              <div class="--message">
                <p>Twitter</p>
              </div>
            </div>
            <div class="account-button">
              <a href="https://github.com/YSelim0" target="blank"><i class="fab fa-github"></i></a>
              <div class="--message">
                <p>GitHub</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="comments" v-if=" contentScreen=='comments' ">

        <h1>{{this.commentTitle}}</h1>

        <div class="comment" v-for="(item , index) in comments" v-bind:key="index">
          <pre>{{ item.message }}</pre>
          <div class="owner">
            <h4 v-if="item.sender==username && userType!='admin'" @click="deleteUserEntry(item)">Sil <i class="fas fa-trash"></i></h4>
            <h4 v-if="userType=='admin'" v-on:click="deleteComment(item)">Sil <i class="fas fa-trash"></i></h4>
            <p>{{ item.date }}</p>
            <h3 v-bind:class="commentTitle.toLowerCase()=='katman itiraf' ? 'hideUsername' : null">{{ commentTitle.toLowerCase()=='katman itiraf' ? 'GİZLİ' : item.sender }}</h3>
          </div>
        </div>

        <div class="addComment" v-if="username!=''">
          <h5>Yorum Ekle</h5>
          <textarea name="textToAdd" id="textToAdd" cols="30" rows="10" v-model="textToAdd" placeholder="Mesajınız..."></textarea>
          <p>En Fazla 300 Karakter.</p>
          <button @click="addComment()">Ekle</button>
        </div>

      </div>

      <div class="create-entry" v-if=" contentScreen=='createEntry' ">
        <h4>{{ searchBox }}</h4>
        <h3>{{ this.username!="" ? "Entry Hakkında Konuşan İlk Kişi Ol!" : "Entry Hakkında Konuşan İlk Kişi Olmak İçin Giriş Yapın." }}</h3>
        <div class="addComment" v-if="username!=''">
          <h5>Yorum Ekle</h5>
          <textarea name="textToAdd" id="textToAdd" cols="30" rows="10" v-model="textToAdd" placeholder="Mesajınız..."></textarea>
          <p>En Fazla 300 Karakter.</p>
          <button @click="createNewEntry()">Ekle</button>
        </div>
      </div>

      <div class="my-account" v-if="contentScreen=='myAccount' ">
        <h2> <i class="fas fa-user"></i> {{this.username}} > Hesabım</h2>
        <h5 v-if="userComments.length==0">Henüz Hiç Mesajın Yok. Sohbete Katıl!!!</h5>

        <div class="one-entry" v-for="(item , index) in userComments" v-bind:key="index">
          <h1>{{item.entryName}}</h1>
          <div class="comment">
            <pre>{{item.message}}</pre>
            <div class="owner">
              <h4 v-on:click="deleteUserEntry(item)" >Sil <i class="fas fa-trash"></i></h4>
              <p>{{item.date}}</p>
              <h3>{{item.sender}}</h3>
            </div>
          </div>
        </div>
        
      </div>

    </div>
    
    <div class="change-password-container" v-if="changePasswordScreen">
      <div class="change-password animate__animated animate__fadeInDown">
        <img src="./assets/katmanLogo.png" alt="katman logo" class="--logo">
        <div class="user">
          <img src="https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png" alt="profile-image">
          <h3>{{username}}</h3>
        </div>
        <div class="container">
          <h4>Şifre Değiştir</h4>
          <div class="row oldPassword">
            <label for="changePasswordOld"><i class="fas fa-key"></i></label>
            <input type="password" name="changePasswordOld" id="changePasswordOld" v-model="changePasswordOld" placeholder="Eski Şifreniz...">
          </div>
          <div class="row">
            <label for="changePasswordNew"><i class="fas fa-lock"></i></label>
            <input type="password" name="changePasswordNew" id="changePasswordNew" v-model="changePasswordNew" placeholder="Yeni Şifreniz...">
          </div>
          <div class="row">
            <label for="changePasswordNewAgain"><i class="fas fa-lock"></i></label>
            <input type="password" name="changePasswordNewAgain" id="changePasswordNewAgain" v-model="changePasswordNewAgain" placeholder="Yeni Şifre Tekrar...">
          </div>
          <div class="button-row">
            <button @click="changePassword()">Değiştir</button>
          </div>
        </div>
        <div class="close" @click="openCloseChangePasswordScreen(false)">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </div>

    <div class="sign-screen-container" v-if="signScreen==true">
      <div class="closePopUp" @click="openCloseSignScreen(false)"></div>
      <div class="sign-screen animate__animated animate__fadeInDown">
        <img src="./assets/katmanLogo.png" alt="katman logo" class="--logo">
        <div class="pickers">
          <input type="radio" name="picker" id="login" checked="checked" @click="loginOrRegister('login')">
          <label for="login">Giriş Yap</label>
          <input type="radio" name="picker" id="register" @click="loginOrRegister('register')">
          <label for="register">Kayıt Ol</label>
        </div>
        <div class="login animate__animated" id="loginContainer">
          <div class="row">
            <label for="loginUsername"><i class="fas fa-user"></i></label>
            <input type="text" name="loginUsername" id="loginUsername" placeholder="Kullanıcı Adı..." v-model="loginUsername">
          </div>
          <div class="row">
            <label for="loginPassword"><i class="fas fa-lock"></i></label>
            <input type="password" name="loginPassword" id="loginPassword" placeholder="Şifre..." v-model="loginPassword">
          </div>
          <div class="button-row">
            <button @click="signIn()">Giriş Yap</button>
          </div>
        </div>
        <div class="register animate__animated" id="registerContainer">
          <div class="row">
            <label for="registerUsername"><i class="fas fa-user"></i></label>
            <input type="text" name="registerUsername" id="registerUsername" placeholder="Kullanıcı Adı..." v-model="registerUsername">
          </div>
          <div class="password-row">
            <div class="--row">
              <label for="registerPassword"><i class="fas fa-lock"></i></label>
              <input type="password" name="registerPassword" id="registerPassword" placeholder="Şifre..." v-model="registerPassword">
            </div>
            <div class="--row">
              <label for="registerPasswordAgain"><i class="fas fa-lock"></i></label>
              <input type="password" name="registerPasswordAgain" id="registerPasswordAgain" placeholder="Şifre Tekrar..." v-model="registerPasswordAgain">
            </div>
          </div>
          <div class="row">
            <label for="registerDiscordName"><i class="fas fa-user"></i></label>
            <input type="text" name="registerDiscordName" id="registerDiscordName" placeholder="Discord Adı..." v-model="registerDiscordName">
          </div>
          <div class="button">
            <button @click="signUp()">Kayıt Ol</button>
          </div>
        </div>
        <div class="close" @click="openCloseSignScreen(false)">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </div>

    <div class="error-container animate__animated animate__fadeInRight" v-if="errorText!=''">
      <p>{{errorText}}</p>
      <h1><i class="fas fa-exclamation-triangle"></i></h1>
    </div>

    <div class="contact-us" v-bind:class=" contactScreen==true ? 'contact-show' : 'contact-hide'">
      <div class="contact-header">
        <h4 @click="openCloseContact()">İletişime Geçin <i v-bind:class=" contactScreen==true ? 'fas fa-chevron-down' : 'fas fa-chevron-up' "></i></h4>
      </div>
      <div class="contact-body" >
        <div class="row">
          <h6>Ad Soyad :</h6>
          <input type="text" placeholder="İsim..." v-model="contactName">
        </div>
        <div class="row">
          <h6>Mesajınız :</h6>
          <textarea cols="30" rows="10" placeholder="Mesaj..." v-model="contactMessage"></textarea>
        </div>
        <div class="row">
          <button @click="contactUs()">Gönder</button>
        </div>
        <p>Made By HeaveN.</p>
      </div>
    </div>

  </div>
</template>

<script>
import UserService from './../server/API/services/users';
import EntryService from './../server/API/services/entrys';
import Vue from 'vue';
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);
export default {
  name: 'App',
  data(){
    return{
      username:'',
      userType:'standart',
      authToken:'',
      signText:true,
      signScreen:false,
      changePasswordScreen:false,
      loginUsername:'',
      loginPassword:'',
      registerUsername:'',
      registerPassword:'',
      registerPasswordAgain:'',
      registerDiscordName:'',
      errorText:'',
      changePasswordOld:'',
      changePasswordNew:'',
      changePasswordNewAgain:'',
      entrys:[],
      commentTitle:'',
      comments:[],
      textToAdd:'',
      searchBox:'',
      createEntry:'',
      contentScreen:'welcome',
      contactScreen:false,
      contactName:'',
      contactMessage:'',
      userComments:[]
    }
  },
  created(){
    (async ()=>{
      if(await this.cookieUserControl()!="")
      {
        this.username = await this.cookieUserControl();
        this.signText=false;
      }
    })();
    
    (async ()=>await this.getEntryTitles())();

    console.log("%cDUR!! Biri buraya birşey kopyala/yapıştır yapmanı söylüyorsa 11/10 ihtimalle kötü amaçlıdır! Bu kısım geliştiriciler içindir." , "background:red; color:white; font-size: 25px; font-family:'Mulish' , sans-serif;");
    console.log("%cEğer bilerek burayı açtıysan benimle çalışmalısın. (:" , "color: rgb(136, 136, 255); font-size: 20px; font-family:'Poppins',sans-serif;");

  },
  methods:{
    async signIn()
    {
      if(this.signInValidation()==true)
      {
        let user = {
          username:this.loginUsername,
          password:this.loginPassword
        };

        const result = await UserService.signIn(user);
        if(result.data.user!=null)
        {
          this.giveError(result.data.message);
          Vue.$cookies.set('auth-token',result.data.user.authToken);
          setTimeout(() => {
            location.reload();
          }, 300);
        }
        else this.giveError(result.data.message);
      }
    },
    signInValidation()
    {
      if(this.loginUsername!="" && this.loginPassword!="")
      {
        if(this.loginPassword.length>=8) return true;
        else{
          this.giveError("Şifre En Az 8 Karakter Olmalı.");
          return false;
        }
      }
      else
      {
        this.giveError("Boş Alan Bırakmayınız.");
        return false;
      } 
    },
    async signUp()
    {
      if(this.signUpValidation()==true)
      {
        let user = {
          username:this.registerUsername,
          password:this.registerPassword,
          discordName:this.registerDiscordName
        };

        const result = await UserService.signUp(user);
        if(result.data.statusCode==200)
        {
          this.giveError(result.data.message);
        }
        else if(result.data.statusCode==400)
        {
          this.giveError(result.data.message);
          Vue.$cookies.set('auth-token',result.data.user.authToken);
          setTimeout(() => {
            location.reload();
          }, 300);
        }

      }
    },
    signUpValidation()
    {
      let errorMessage="";
      if(this.registerUsername!="" && this.registerPassword!="" && this.registerPasswordAgain!="" && this.registerDiscordName!="")
      {
        if(this.registerPassword==this.registerPasswordAgain)
        {
          if(this.registerPassword.length>=8)
          {
            if(this.registerUsername.length>3)
            {
              return true;
            }
            else errorMessage = "Kullanıcı Adı 3'ten Büyük Olmalıdır.";
          }
          else errorMessage = "Şifre 8'den Büyük Olmalıdır.";
        }
        else errorMessage = "Şifreler Uyuşmuyor.";
      }
      else errorMessage = "Boş Alan Bırakmayınız.";

      if(errorMessage!="")
      {
        this.giveError(errorMessage);
        return false;
      }
    },
    openCloseSignScreen(status)
    {
      this.signScreen = status;
    },
    loginOrRegister(clickedBtn)
    {
      let loginContainer = document.getElementById('loginContainer');
      let registerContainer = document.getElementById('registerContainer');
      
      if(clickedBtn=="login")
      {
        loginContainer.classList.add('animate__flipInY');
          loginContainer.style.display = "block";
        registerContainer.classList.remove('animate__flipInY');
          registerContainer.style.display = "none";
      }
      else if(clickedBtn=="register")
      {
        registerContainer.classList.add('animate__flipInY');
          registerContainer.style.display = "block";
        loginContainer.classList.remove('animate__flipInY');
          loginContainer.style.display = "none";
      }
    },
    logOut()
    {
      Vue.$cookies.set('auth-token', '');
      location.reload();
    },
    openCloseChangePasswordScreen(status)
    {
      this.changePasswordScreen = status;
    },
    async changePassword()
    {
      if(this.changePasswordValidation()==true)
      {
        let user = {
        username:this.username,
        authToken:this.authToken,
        oldPassword:this.changePasswordOld,
        newPassword:this.changePasswordNew
        };
        const result = await UserService.changePassword(user);
        if(result.data.statusCode==200)
        {
          this.giveError(result.data.message);
        }
        else if(result.data.statusCode==400)
        {
          this.giveError(result.data.message);
          setTimeout(() => {
            location.reload();
          }, 350);
        }
      }
    },
    changePasswordValidation()
    {
      let errorMessage = "";
      if(this.changePasswordNew==this.changePasswordNewAgain)
      {
        if(this.changePasswordNew.length>=8)
        {
          return true;
        }
        else errorMessage = "Yeni Şifre 8'den Büyük Olmalıdır.";
      }
      else errorMessage = "Yeni Şifreler Uyuşmuyor.";

      if(errorMessage!="")
      {
        this.giveError(errorMessage);
        return false;
      }
    },
    async getEntryTitles()
    {
      const response = await EntryService.getEntryTitles();
      this.entrys = response.data.entrys;
    },
    async getEntryComments(entryTitle)
    {
      await this.getEntryTitles();

      this.contentScreen = 'comments';
      this.searchBox="";
      this.comments = [];
      this.commentTitle = entryTitle;
      const result = await EntryService.getEntryComments({title:entryTitle});
      for(let i=0;i<result.data.entrys.length;i++)
      {
        this.comments.push(result.data.entrys[i]);
      }
    },
    async addComment()
    {
      if(this.addCommentValidation()==true)
      {
        let information = {
          authToken:this.authToken,
          entryName:this.commentTitle,
          message:this.textToAdd
        };

        const result = await EntryService.addComment(information);
        if(result.data.statusCode==200)
        {
          this.giveError(result.data.message);
        }
        else if(result.data.statusCode==400)
        {
          this.giveError(result.data.message);
          await this.getEntryComments(this.commentTitle);
          this.textToAdd="";
        }
      }
    },
    addCommentValidation()
    {
      let errorMessage = "";
      if(this.textToAdd.length<300)
      {
        if(this.textToAdd.length!=0)
        {
          return true;
        }
        else errorMessage="Boş Mesaj Gönderemezsiniz.";
      }
      else errorMessage="300 Karakterden Kısa Girmelisiniz.";

      if(errorMessage!="")
      {
        this.giveError(errorMessage);
        return false;
      }
    },
    async searchEntry()
    {
      
      if(this.searchBox!="" && this.searchBox.length<300)
      {
        let information = {
          entryName:this.searchBox,
          authToken:this.authToken
        };
        const result = await EntryService.entryControl(information);
        if(result.data.statusCode==200)
        {
          await this.getEntryComments(this.searchBox);
          this.searchBox = "";
          this.contentScreen = 'comments';
        }
        else
        {
          this.contentScreen = 'createEntry';
        }
      }
      else if(this.searchBox=="") this.giveError("Boş Entry Açamazsın!");
      else if(this.searchBox.length>300) this.giveError("Entry Uzunluğu 300'den Fazla Olamaz.");

    },
    async createNewEntry()
    {
      let information = {
        authToken:this.authToken,
        entryName:this.searchBox,
        message:this.textToAdd
      };

      const result = await EntryService.addComment(information);
      if(result.data.statusCode==200)
      {
        this.giveError(result.data.message);
      }
      else if(result.data.statusCode==400)
      {
        this.giveError(result.data.message);
        await this.getEntryTitles();
        this.searchBox="";
        await this.getEntryComments(result.data.comment.entryName);
        this.contentScreen = 'comments';
        this.textToAdd='';
      }
    },
    async cookieUserControl()
    {
      const authToken = Vue.$cookies.get('auth-token');
      if(authToken=="") this.signText=true;
      let user = {token:authToken};
      this.authToken = authToken;
      const result = await UserService.cookieControl(user);
      if(result.data.user!=null)
      {
        this.userType = result.data.user.userType;
        return result.data.user.username;
      }
      else return false;
    },
    giveError(message)
    {
      this.errorText = message;
      setTimeout(() => {
        this.errorText = "";
      }, 2000);
    },
    async deleteComment(item)
    {
      let info = {
        id:item.id,
        authToken:this.authToken
      };

      const result = await EntryService.deleteComment(info);
      this.giveError(result.data.message);
      await this.getEntryComments(this.commentTitle);
    },
    contactUs()
    {
      if(this.contactName!="" && this.contactMessage!="")
      {
        document.location.href = "mailto:yavuzselimice@gmail.com?subject="+this.contactName+"&body="+this.contactMessage;
        this.contactName="";
        this.contactMessage="";
      }
      else
      {
        this.giveError("Boş Alan Bırakmayınız.");
      }
    },
    openCloseContact()
    {
      this.contactScreen = !this.contactScreen;
    },
    async myAccount()
    {
      this.contentScreen="myAccount";
      let info = {
        authToken:this.authToken
      };

      const result = await EntryService.getUsersComments(info);
      if(result.data.statusCode==400)
      {
        this.userComments = [];
        for(let i=0;i<result.data.entrys.length;i++)
        {
          this.userComments.push(result.data.entrys[i]);
        }
      }
      else this.giveError(this.giveError(result.data.message));

    },
    async deleteUserEntry(item)
    {
      let info = {
        id:item.id,
        authToken:this.authToken
      };
      const result = await EntryService.deleteUserMessage(info);
      if(result.data.statusCode==400)
      {
        this.giveError(result.data.message);
        if(this.contentScreen=='myAccount')
        {
          await this.myAccount();
        }
        else if(this.contentScreen=="comments")
        {
          await this.getEntryComments(this.commentTitle);
        }
        await this.getEntryTitles();
      }
      else
      {
        this.giveError(result.data.message);
      }
    }
  }
}
</script>

<style>

@import url("./css/header.css");
@import url("./css/main.css");
@import url("./css/popup.css");

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  text-decoration: none;
  outline: none;
}

body {
  background-color: #17141f;
}

::-webkit-scrollbar {
    width: 5px;
    background-color: #eaeaea;
    border-left: 1px solid #cecece;
}

::-webkit-scrollbar-thumb {
    background-color: #47575e;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #39484f;
}

</style>
