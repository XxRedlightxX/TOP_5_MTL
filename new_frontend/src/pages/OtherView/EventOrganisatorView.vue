<template>
  <div id="eventOrganisatorView">
    <Profile :himself="false" />
  </div>
</template>

<script setup>
  import Profile from '../../components/ProfileComponents/ProfileComponent.vue'
</script>

<style lang="scss">
    #eventOrganisatorView {
      padding: 1% 0% 3% 0%;
      //border: 2px solid red;
    }
</style>
