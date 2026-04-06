<template>
  <div id="profileSingleEventComponent" class="glass" @click="goToEvent(event.id)" :title="actualLang ? 'Go to the event page' : 'Allez a la page de l\'event'">
    <div class="first">
      <img alt="#" :src="props.event.image_data">
    </div>

    <div class="middle">

      <h2>{{ props.event.titre }}</h2>

      <p>{{ props.event.description }}</p>

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
  import SetupEvent from "@/JS/SetupEvents";
  import Setup from '@/JS/Setup'
  import { useRouter } from "vue-router";

  let actualLang = Setup.languageSetup()
  let isLogged = Setup.loginSetup()
  let actualMode = Setup.modeSetup()

  const router = useRouter();
  const props = defineProps({
    event: Object, // Boolean type prop
    himself: Boolean, // Boolean type prop
  })

  // Définir les événements émis par ce composant
  const emit = defineEmits(['popUpdate'])

  async function goToEvent(id) {
    await setEvent(id);   // 1) stocker l’event
    router.push("/Event"); // 2) naviguer ensuite
  } 

  async function setEvent(id) {
    const event = await SetupEvent.singleEventSetup(id)
  }

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
