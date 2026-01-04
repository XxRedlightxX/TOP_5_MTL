<template>
  <div v-if="theOrganisator != null" id="profileComponent">

    <div class="top">
      <ProfileHead :himself="props.himself" :user="theOrganisator.user"></ProfileHead>
      <ProfileOther v-show="props.himself"></ProfileOther>
    </div>
    <ProfileList :himself="props.himself" :user="theOrganisator.user"></ProfileList>
  </div>
</template>

<script setup>
  import { defineProps, ref, onMounted} from 'vue'
  import LocalStorageManager from '@/JS/LocalStorageManager'
  import Setup from '@/JS/Setup'

  import ProfileHead from './ProfileHeadComponent.vue'
  import ProfileOther from './ProfileOtherComponent.vue'
  import ProfileList from './ProfileListComponent.vue'
  import { el } from 'vuetify/locale'

  const props = defineProps({
    himself: Boolean, // Boolean type prop
  })

  let actualLang = Setup.languageSetup();
  let actualMode = Setup.modeSetup();

  let isLogged = Setup.loginSetup();
  let theOrganisator = ref(null);

  const Logout = () => {
    isLogged.value = LocalStorageManager.logout();
  }

  if (isLogged.value === null) {
    Logout()
  }

  onMounted(async () => {
    theOrganisator.value = await props.himself ? LocalStorageManager.getLogUser() : LocalStorageManager.getOrganisator();
  });
</script>

<style src="../../styles/ComponentsStyles/ProfileStyles/ProfileStyle.scss"></style>