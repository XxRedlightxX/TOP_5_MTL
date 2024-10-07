<template>
    <div id="Log-Sign-Bett">
      <article>
        <div class="container" :class="{ 'sign-up-active': signUp }">

          <div class="overlay-container">
            <div class="overlay">

                <div class="overlay-left">
                    <h2>{{actualLang ? 'Welcome Back!' : 'Bon retour'}}</h2>
                    <p>{{actualLang ? 'If you already have an account please Sign In' : 'Si vous avez déjà un compte, veuillez vous connecter'}}</p>
                    <!--<button class="invert" id="signIn" @click="toggleSignUp">{{actualLang ? 'here !' : 'ici !'}}</button>-->
                    <waterButton :text="actualLang ? 'here !' : 'ici !'" :type="false" @click="toggleSignUp"/>
                </div>

                <div class="overlay-right">
                    <h2>{{actualLang ? 'Welcome' : 'Bienvenu'}}</h2>
                    <p>{{actualLang ? 'You don\'t have an account ? Please Sign Up' : 'Vous n\'avez pas de compte ? Veuillez vous inscrire'}} </p>
                    <!--<button class="invert" id="signUp" @click="toggleSignUp">{{actualLang ? 'here !' : 'ici !'}}</button>-->
                    <waterButton :text="actualLang ? 'here !' : 'ici !'" :type="false" @click="toggleSignUp" />
                </div>

            </div>
          </div>

          <SignUp/>
          <SignIn/>

        </div>
      </article>
    </div>
  </template>
  
<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted} from "vue";
    import SignUp from "./SignUpComponent.vue";
    import SignIn from "./SignInComponent.vue";
    import waterButton from "../WaterButtonComponent.vue"
  
    // State management
    const signUp = ref(false);
    
    // Toggle between Sign Up and Sign In
    const toggleSignUp = () => {
        signUp.value = !signUp.value;
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

    onMounted(() => {
        window.addEventListener('lang-changed', handleLangChange);
    });

    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('lang-changed', handleLangChange);
    });
</script>
  
  

<style src="../../styles/Login-SignUpStyles/Login-SignUpComponentStyle.scss"></style>