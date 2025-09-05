<template>
  <form class="sign-in glass" @submit.prevent="Login()">

    <h2>{{actualLang ? 'Sign In' : 'Connectez-Vous'}}</h2>

    <v-text-field
      :rules="Email"
      :label="actualLang ? 'Email' : 'Email'"
      type="email"
      clearable
      persistent-clear
      hide-details="auto"
      required
    ></v-text-field>

    <v-text-field
      :rules="Password"
      :label="actualLang ? 'Password' : 'Mot de passe'"
      type="input"
      clearable
      persistent-clear
      hide-details="auto"
      required
    ></v-text-field>
    <!-- <p v-if="errors.password" >{{ errors.password }} brrr</p> -->

    <a href="#" class="forgot">{{actualLang ? 'Forgot your password ?' : 'Vous avez oublié votre mot de passe ?'}}</a>

    <waterButton :text="actualLang ? 'Sign In' : 'Se connecter'" :type="true" @click=" Login()" />
    <!-- <button  type="submit">{{actualLang ? 'Sign Up' : 'S\'inscrire'}}</button> -->
  </form>

</template>

<script setup>
  import LocalStorageManager from "@/JS/LocalStorageManager";
  import Setup from "@/JS/Setup";
  import FakeDataBase from "@/JS/ToBeDeleted/FakeDataBase";
  import waterButton from "../../../StaticComponents/WaterButtonComponent.vue";

  let actualLang = Setup.languageSetup();
  let isLogged = Setup.loginSetup();

  const Login = () => {
    let user = FakeDataBase.getUser();
    isLogged.value = LocalStorageManager.login(user);
  }

  if (isLogged.value === null) {
    isLogged.value = LocalStorageManager.logout();
  }
</script>

<style src="../../../../styles/ComponentsStyles/ProfileStyles/SignIn_SignUpStyles/SignInStyle.scss"></style>
<style src="../../../../styles/ComponentsStyles/ProfileStyles/SignIn_SignUpStyles/SignInStyleColor.scss"></style>