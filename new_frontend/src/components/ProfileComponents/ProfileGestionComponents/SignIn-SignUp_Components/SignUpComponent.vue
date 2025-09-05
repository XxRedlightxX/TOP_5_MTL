<template>
  <form class="sign-up glass">

    <h2>{{actualLang ? 'sign-up' : 'Inscrivez-Vous'}}</h2>

    <v-text-field
      :rules="Name"
      hint="this field is mendatory"
      :label="actualLang ? 'Username*' : 'Nom d\'utilisateur*'"
      type="input"
      clearable
      persistent-clear
      hide-details="auto"
      required
    ></v-text-field>

    <div class="sub">
      <v-text-field
        :rules="Email"
        hint="this field is mendatory"
        :label="actualLang ? 'Email*' : 'Email*'"
        type="input"
        clearable
        persistent-clear
        hide-details="auto"
      ></v-text-field>

      <v-text-field
        :rules="Number"
        hint="this field is not mendatory"
        :label="actualLang ? 'Phone' : 'Telephone'"
        type="input"
        clearable
        persistent-clear
        hide-details="auto"
      ></v-text-field>
    </div>

    <v-text-field
      :rules="Password"
      hint="this field is mendatory"
      :label="actualLang ? 'Password*' : 'Mot de passe*'"
      type="input"
      clearable
      persistent-clear
      hide-details="auto"
    ></v-text-field>

    <v-text-field
      :rules="Password"
      hint="this field is mendatory"
      :label="actualLang ? 'Password confirm*' : 'Confirmer le mot de passe*'"
      type="input"
      clearable
      persistent-clear
      hide-details="auto"
    ></v-text-field>

    <v-radio-group

      :rules="[v => !!v || 'User type is required']"
      required
    >
      <v-radio
        v-for="(item, index) in items"
        :key="index"
        :label="item"
        :value="item"
      ></v-radio>
    </v-radio-group>

    <!-- <button type="submit" @click="Login()" >{{actualLang ? 'Sign Up' : 'S\'inscrire'}}</button> -->
    <waterButton :text="actualLang ? 'Sign Up' : 'S\'inscrire'" :type="true" @click=" Login()" />
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

<style src="../../../../styles/ComponentsStyles/ProfileStyles/SignIn_SignUpStyles/SignUpStyle.scss"></style>
<style src="../../../../styles/ComponentsStyles/ProfileStyles/SignIn_SignUpStyles/SignUpStyleColor.scss"></style>