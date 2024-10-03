<template>
    <div id="Log-Sign-Bett">
      <article>
        <div class="container" :class="{ 'sign-up-active': signUp }">

         
          <div class="overlay-container">
            <div class="overlay">

              <div class="overlay-left">
                <h2>{{actualLang ? 'Welcome Back!' : 'Bon retour'}}</h2>
                <p>{{actualLang ? 'If you already have an account please Sign In' : 'Si vous avez déjà un compte, veuillez vous connecter'}}</p>
                <button class="invert" id="signIn" @click="toggleSignUp">{{actualLang ? 'here !' : 'ici !'}}</button>
              </div>

              <div class="overlay-right">
                <h2>{{actualLang ? 'Welcome' : 'Bienvenu'}}</h2>
                <p>{{actualLang ? 'You don\'t have an account ? Please Sign Up' : 'Vous n\'avez pas de compte ? Veuillez vous inscrire'}} </p>
                <button class="invert" id="signUp" @click="toggleSignUp">{{actualLang ? 'here !' : 'ici !'}}</button>
              </div>

            </div>
          </div>


          <form class="sign-up" @submit.prevent="submitForm('signup')">

            <h2>{{actualLang ? 'sign-up' : 'Inscrivez-Vous'}}</h2>

            <v-text-field
                :rules="Name"
                hide-details="auto"
                :label="actualLang ? 'Username' : 'Nom d\'utilisateur'"
            ></v-text-field>

            <div class="sub">
                <v-text-field
                    :rules="Email"
                    hide-details="auto"
                    :label="actualLang ? 'Email' : 'Email'"
                ></v-text-field>

                <v-text-field
                    :rules="Number"
                    hide-details="auto"
                    :label="actualLang ? 'Phone' : 'Telephone'"
                ></v-text-field>
            </div>

            <v-text-field
                :rules="Password"
                hide-details="auto"
                :label="actualLang ? 'Password' : 'Mot de passe'"
            ></v-text-field>

            <v-text-field
                :rules="Password"
                hide-details="auto"
                :label="actualLang ? 'Password confirm' : 'Confirmer le mot de passe'"
            ></v-text-field>

            <button type="submit">{{actualLang ? 'Sign Up' : 'S\'inscrire'}}</button>
          </form>

          <form class="sign-in" @submit.prevent="submitForm('signin')">

            <h2>{{actualLang ? 'Sign In' : 'Connectez-Vous'}}</h2>

            <v-text-field
                :rules="Email"
                hide-details="auto"
                :label="actualLang ? 'Email' : 'Email'"
            ></v-text-field>

            <v-text-field
                :rules="Password"
                hide-details="auto"
                :label="actualLang ? 'Password' : 'Mot de passe'"
            ></v-text-field>

            <a href="#" class="forgot">{{actualLang ? 'Forgot your password ?' : 'Vous avez oublié votre mot de passe ?'}}</a>
            <button type="submit">{{actualLang ? 'Sign In' : 'Se connecter'}}</button>
          </form>

        </div>
      </article>
    </div>
  </template>
  
<script setup>
    import storageManager from "@/JS/LocalStaorageManager"
    import { ref, onMounted, onUnmounted} from "vue";
  
  // State management
  const signUp = ref(false);
  const name = ref('');
  const email = ref('');
  const password = ref('');
  
  // Toggle between Sign Up and Sign In
  const toggleSignUp = () => {
    signUp.value = !signUp.value;
  };
  
  // Handle form submission (dummy API for now)
  const submitForm = (action) => {
    if (action === 'signup') {
      // Send sign-up request
      console.log('Signing up:', { name: name.value, email: email.value, password: password.value });
    } else if (action === 'signin') {
      // Send sign-in request
      console.log('Signing in:', { email: email.value, password: password.value });
    }
  };

    let actualLang = ref(storageManager.getLang());

    if (actualLang.value === null) {
        storageManager.setLang(true);
        actualLang.value = storageManager.getLang();
    }

    // Function to handle mode change event
    const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };
    // Add event listener for mode changes
    onMounted(() => {
        window.addEventListener('lang-changed', handleLangChange);
    });

    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('lang-changed', handleLangChange);
    });
</script>
  
  

<style lang="scss" scoped>
/*body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}*/

#Log-Sign-Bett {
  font-family: Tahoma;
  font-size: 1rem;
  color: #222;
  background-color: #ffffff;
  width: 75%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
article {
    border: 2px solid red;
    width: 100%;
    margin: auto;
}
.container {
  position: relative;
  width: 100%;
  height: 550px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
    0 10px 10px rgba(0, 0, 0, .2);
  background: linear-gradient(to bottom, #efefef, #ccc);

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform .5s ease-in-out;
    z-index: 100;
  }

  .overlay {
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    background: linear-gradient(to bottom right, #7FD625, #009345);
    color: #fff;
    transform: translateX(0);
    transition: transform .5s ease-in-out;
  }

  @mixin overlays($property) {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 70px 40px;
    width: calc(50% - 80px);
    height: calc(100% - 140px);
    text-align: center;
    transform: translateX($property);
    transition: transform .5s ease-in-out;
  }

  .overlay-left {
    @include overlays(-20%);
    display: flex;
    width: 50%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    border: 2px solid red;
}

  .overlay-right {
    @include overlays(0);
    right: 0;
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid red;

  }
}

h2 {
  margin: 0;
}

p {
  margin: 20px 0 30px;
}

a {
  color: #222;
  text-decoration: none;
  margin: 15px 0;
  font-size: 1rem;
}

button {
  border-radius: 20px;
  border: 1px solid #009345;
  background-color: #009345;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 40px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform .1s ease-in;

  &:active {
    transform: scale(.9);
  }

  &:focus {
    outline: none;
  }
}

button.invert {
  background-color: transparent;
  border-color: #fff;
}

form {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 5% 3%;
  width: calc(50% - 120px);
  height: calc(100% - 180px);
  text-align: center;
  background: linear-gradient(to bottom, #efefef, #ccc);
  transition: all .5s ease-in-out;
  border: 2px solid red;

  div {
    font-size: 1rem;
  }
  .forgot:hover {
    color: red;
    cursor: pointer;
  }
  .v-text-field {
    //background-color: #eee;
    border: none;
    padding: 8px 15px;
    margin: 6px 0;
    width: 100%;
    max-height: 65px;
    // border-radius: 15px;
    //border-bottom: 1px solid #ddd;
    /*box-shadow: inset 0 1px 2px rgba(0, 0, 0, .4), 
      0 -1px 1px #fff, 
      0 1px 0 #fff;*/
    overflow: hidden;

    &:focus {
      outline: none;
      background-color: #fff;
    }
  }
  .sub {
    width: 100%;
    display: flex;
    flex-direction: row;   
    justify-content: space-between;
    .v-text-field {
        width: 50%;
      }
  }
}

.sign-in {
  left: 0;
  width: 50%;
  height: 100%;
  z-index: 2;
}

.sign-up {
  left: 0;
  width: 50%;
  height: 100%;
  z-index: 1;
  opacity: 0;
}

.sign-up-active {
  .sign-in {
    transform: translateX(100%);
  }

  .sign-up {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show .5s;
  }

  .overlay-container {
    transform: translateX(-100%);
  }

  .overlay {
    transform: translateX(50%);
  }

  .overlay-left {
    transform: translateX(0);
  }

  .overlay-right {
    transform: translateX(20%);
  }
}

@keyframes show {
  0% {
    opacity: 0;
    z-index: 1;
  }
  49% {
    opacity: 0;
    z-index: 1;
  }
  50% {
    opacity: 1;
    z-index: 10;
  }
}


/* Youtube Link */
#yt_link
{
  position: absolute;
  right: 0;
  left: 0;
  bottom: -200px;
  display: block;
  width: 160px;
  text-align: center;
  color: red;
  font-size: 15px;
  text-decoration: none;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 10px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 2px;
  animation: showYtLink 1.5s ease 3s forwards;
}

@keyframes showYtLink
{
  0%{ bottom: -200px; }
  100%{ bottom: 20px; }
}
</style>