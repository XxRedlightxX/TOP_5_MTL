<template>
  <div id="in_up_Grand">

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

        <SignUp />
        <SignIn />

      </div>
    </article>
  </div>
</template>

<script setup>
  import LocalStorageManager from "@/JS/LocalStorageManager";
  import Setup from "@/JS/Setup";
  import FakeDataBase from "@/JS/ToBeDeleted/FakeDataBase";
  import { ref, onMounted, onUnmounted} from "vue";
  import SignUp from "./SignUpComponent.vue";
  import SignIn from "./SignInComponent.vue";
  import waterButton from "../../../StaticComponents/WaterButtonComponent.vue"

  // State management
  const signUp = ref(false);

  // Toggle between Sign Up and Sign In
  const toggleSignUp = () => {
    signUp.value = !signUp.value;
    //let user = FakeDataBase.getUser();
    //LocalStorageManager.setLogUser(user)
  };

  let actualLang = Setup.languageSetup();
</script>

<style src="../../../../styles/ComponentsStyles/ProfileStyles/Signin_SignUpStyles/SignIn_SignUpStyle.scss"></style>
