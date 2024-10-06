<template>
    <div id="Logo">
        <Logo/>
    </div>
</template>

<script setup>
    import Logo from "../../components/JustLogo.vue"
</script>


<style lang="scss">
    #Logo {
        padding: 5% 0% 8% 0%;
        border: 2px solid red;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>