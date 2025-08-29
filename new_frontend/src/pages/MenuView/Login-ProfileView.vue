<template>
  <div id="login-profileView">
    <SignIn_SignUp v-if="!isLogged" />

    <Profile v-else :himself="true" />
  </div>
</template>

<script setup>
  import LocalStorageManager from '@/JS/LocalStorageManager';
  import Setup from '@/JS/Setup';
  import Profile from '../../components/ProfileComponents/ProfileComponent.vue'
  import SignIn_SignUp from '../../components/ProfileComponents/ProfileGestionComponents/SignIn-SignUp_Components/SignIn_SignUp_Component.vue'

  let isLogged = Setup.loginSetup();

  if (isLogged.value === null) {
    isLogged.value = LocalStorageManager.logout();
  }
</script>

<style lang="scss">
#login-profileView {
    display: block;
    //height: 100svh;
    padding: 8% 0% 2% 0%;
}
</style>