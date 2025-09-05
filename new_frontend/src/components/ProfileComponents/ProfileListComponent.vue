<template>
  <div id="profileListEventComponent">
    <div class="head">
      <h4 v-if="props.himself">{{ actualLang ? 'List of event you add' : 'Les evenements que vous avez ajoute' }}</h4>
      <h4 v-else>{{ actualLang ? 'List of event the organisator publish' : 'Les evenements que l\'organisateur a publier' }}</h4>

      <div v-show="props.himself" class="router" @click="showAdd2()">
        <v-icon class="icon" icon="mdi-plus-box-multiple" :title="actualLang ? 'Add an Event' : 'Ajouter un evenement'" />
      </div>

    </div>

    <div class="body">
      <ProfileSingleEvent v-for="(item, index) in props.user.listEvent" :key="index" :event="item" :himself="props.himself" @popDelete="showDel2()" @popUpdate="showUp2()"/>
    </div>
    <AddEvent v-show="isShowAdd2" @pop="showAdd2()" />
    <UpdateEvent v-show="isShowUp2" @popUpdate="showUp2()" />
    <DeleteEvent v-show="isShowDel2" @popDelete="showDel2()" />
  </div>
</template>

<script setup>
  import { defineProps, ref } from 'vue'
  import LocalStorageManager from '@/JS/LocalStorageManager'
  import Setup from '@/JS/Setup'
  import FakeDataBase from '@/JS/ToBeDeleted/FakeDataBase'

  import AddEvent from './ProfileGestionComponents/EventGestionComponents/AddEventComponent.vue'
  import DeleteEvent from './ProfileGestionComponents/EventGestionComponents/DeleteEventComponent.vue'
  import UpdateEvent from './ProfileGestionComponents/EventGestionComponents/UpdateEventComponent.vue'

  import ProfileSingleEvent from './ProfileSingleEventComponent.vue'

  const props = defineProps({
    himself: Boolean, // Boolean type prop
    user: Object,
  })

  let actualLang = Setup.languageSetup()
  let isLogged = Setup.loginSetup()

  const Logout = () => {
    isLogged.value = LocalStorageManager.logout()
  };

  if (isLogged.value === null) {
    Logout()
  }

  let isShowAdd2 = ref(false)
  let isShowUp2 = ref(false)
  let isShowDel2 = ref(false)

  const showAdd2 = () => {
    isShowAdd2.value = !isShowAdd2.value
  }
  const showUp2 = () => {
    isShowUp2.value = !isShowUp2.value
  }
  const showDel2 = () => {
    isShowDel2.value = !isShowDel2.value
  }
  console.log('liste event : ' + props.user)
</script>

<style src="../../styles/ComponentsStyles/ProfileStyles/ProfileListStyle.scss"></style>
<style src="../../styles/ComponentsStyles/ProfileStyles/ProfileListStyleColor.scss"></style>