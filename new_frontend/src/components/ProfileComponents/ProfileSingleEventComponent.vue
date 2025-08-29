<template>
  <div id="profileSingleEventComponent" class="glass">
    <div class="first">
      <img alt="#" :src="props.event.image">
    </div>

    <div class="middle">

      <h2>{{ props.event.title }}</h2>

      <p>{{ props.event.desc }}</p>

    </div>

    <div v-show="props.himself"  class="last">
      <v-icon :class="['icon', {'glowLess' : !actualMode}]" icon="mdi-folder-edit" :title="actualLang ? 'Edit this Event' : 'Modifier cet evenement'" @click="showUp()"/>
      <v-icon :class="['icon', {'glowLess' : !actualMode}]" icon="mdi-delete-circle" :title="actualLang ? 'Delette this Event' : 'Supprimer cet evenement'" @click="showDel()"/>
    </div>

  </div>
</template>

<script setup>
  import { defineEmits, defineProps } from 'vue'
  import LocalStorageManager from '@/JS/LocalStorageManager'
  import Setup from '@/JS/Setup'

  let actualLang = Setup.languageSetup()
  let isLogged = Setup.loginSetup()
  let actualMode = Setup.modeSetup()

  const props = defineProps({
    event: Object, // Boolean type prop
    himself: Boolean, // Boolean type prop
  })

  // Définir les événements émis par ce composant
  const emit = defineEmits(['popUpdate'])

  const showUp = () => {
    emit('popUpdate')
  }

  const showDel = () => {
    emit('popDelete')
  }

  const Logout = () => {
    isLogged.value = LocalStorageManager.Logout()
  }

  if (isLogged.value === null) {
    Logout()
  }
</script>

<style src="../../styles/ComponentsStyles/ProfileStyles/ProfileSingleEventStyle.scss"></style>
