<template>
  <div id="profileComponent">

    <div class="top">
      <ProfileHead :himself="props.himself" :user="theOrganisator"></ProfileHead>
      <ProfileOther v-show="props.himself"></ProfileOther>
    </div>
    <ProfileList :himself="props.himself" :user="theOrganisator"></ProfileList>
  </div>
</template>

<script setup>
  import { defineProps, ref} from 'vue'
  import LocalStorageManager from '@/JS/LocalStorageManager'
  import Setup from '@/JS/Setup'

  import ProfileHead from './ProfileHeadComponent.vue'
  import ProfileOther from './ProfileOtherComponent.vue'
  import ProfileList from './ProfileListComponent.vue'

  const props = defineProps({
    himself: Boolean, // Boolean type prop
  })

  let actualLang = Setup.languageSetup()
  let actualMode = Setup.modeSetup()

  let isLogged = Setup.loginSetup()
  let theOrganisator = props.himself ? Setup.userSetup() : Setup.organisatorSetup()

  const Logout = () => {
    isLogged.value = LocalStorageManager.logout();
  }

  if (isLogged.value === null) {
    Logout()
  }

//   if (theOrganisator.value === null) {
//     console.log("yesss  ")
//     theOrganisator.value = organisator;
//   }

</script>

<style src="../../styles/ComponentsStyles/ProfileStyles/ProfileStyle.scss"></style>