<template>
    <div id="eventOrganisatorView">
        <Profile :himself="false"/>
    </div>
</template>

<script setup>
    import Profile from "../../components/ProfileComponents/ProfileComponent.vue"
</script>

<style lang="scss">
    #eventOrganisatorView {
        padding: 8% 0% 3% 0%;
    }
</style>