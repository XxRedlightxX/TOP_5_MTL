<template>
  <div id="profileHeaderComponent">
    <div :class="['first', { 'middleAvatar': !props.himself }]">
      <v-avatar size="180">
        <img
          alt="John"
          :src="props.user.avatar"
        />
      </v-avatar>
    </div>
    <div class="middle">
      <h2>{{ props.user.username }}</h2>

      <p>{{ props.user.desc }}</p>
    </div>

    <div class="last"  v-show="props.himself">
      <router-link to="/Gestion Profile" class="router">
        <v-icon icon="mdi-account-edit" class="iconHead" :title="actualLang ? 'Manage your account' : 'Gerer votre compte'"/>
      </router-link>
      <v-icon icon="mdi-logout" class="iconHead" @click="Logout()" :title="actualLang ? 'Logout' : 'Se deconnecter'"/>

    </div>
  </div>
</template>

<script setup>
  import { defineProps, ref} from 'vue'
  import LocalStorageManager from '@/JS/LocalStorageManager'
  import Setup from '@/JS/Setup'

  const props = defineProps({
    himself: Boolean, // Boolean type prop
    user: Object
  })

  let actualLang = Setup.languageSetup()
  let isLogged = Setup.loginSetup()

  const Logout = () => {
    isLogged.value = LocalStorageManager.logout()
  }

  if (isLogged.value === null) {
    Logout()
  }
</script>

<style src="../../styles/ComponentsStyles/ProfileStyles/ProfileHeadStyle.scss"></style>
<style src="../../styles/ComponentsStyles/ProfileStyles/ProfileHeadStyleColor.scss"></style>