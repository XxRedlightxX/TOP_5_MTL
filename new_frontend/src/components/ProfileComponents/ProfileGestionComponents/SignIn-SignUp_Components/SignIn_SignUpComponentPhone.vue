<template>
  <div id="in_up_Phone">
    <div class="form-container">
      <div class="slide-controls">
        <input id="login" checked name="slide" type="radio">
        <input id="signup" name="slide" type="radio">

        <label class="slide login" for="login" @click="showLogin()">Login</label>
        <label class="slide signup" for="signup" @click="showSignUp()">Signup</label>

        <div class="slider-tab"></div>
      </div>

      <div class="form-inner">

        <SignIn class="login" />

        <SignUp class="signup" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import SignIn from "./SignInComponent.vue";
  import SignUp from "./SignUpComponent.vue";

  const showSignUp = () => {
    document.querySelector("form.login").style.marginLeft = "-50%";
  };

  const showLogin = () => {
    document.querySelector("form.login").style.marginLeft = "0%";
  };
</script>

<style src="../../../../styles/ComponentsStyles/ProfileStyles/Signin_SignUpStyles/SignIn_SignUpPhoneStyle.scss"></style>
