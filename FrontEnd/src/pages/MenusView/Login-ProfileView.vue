<template>
    <div id="login-profileView">
        <SignIn_SignUp v-if="!isLogged"/>

        <Profile v-else  :himself="true"/>
    </div>
</template>

<script setup>
    import SignIn_SignUp from "../../components/Login-SignUpComponents/Login-SignUpComponentButBetter.vue"
    import Profile from "../../components/ProfileComponents/ProfileComponent.vue"
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted, watch} from "vue";
  
    let isLogged = ref(storageManager.getLogin());

    if (isLogged.value === null) {
        storageManager.setLogin(false);
        isLogged.value = storageManager.getLogin();
    }

    const handleLoginChange = (event) => {
        isLogged.value = JSON.parse(event.detail.storage);
    };

    onMounted(() => {
        window.addEventListener('login-changed', handleLoginChange);
    });

    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('login-changed', handleLoginChange);
    });
</script>

<style src="../../styles/MenusViewStyles/Login-ProfileView.scss"></style>