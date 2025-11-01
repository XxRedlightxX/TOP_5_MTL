<template>
    <div id="login-profileView">
        <SignIn_SignUp v-if="!authStore.user"/>

        <Profile v-else  :himself="true"/>
    </div>
</template>

<script setup>
    import SignIn_SignUp from "../../components/Login-SignUpComponents/Login-SignUpComponentButBetter.vue"
    import Profile from "../../components/ProfileComponents/ProfileComponent.vue"
    import LocalStorageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted} from "vue";
    import { useAuthStore } from "@/stores/auth";

    const authStore = useAuthStore();
  
    let isLogged = ref(LocalStorageManager.getLogin());

    if (isLogged.value === null) {
        LocalStorageManager.setLogin(false);
        isLogged.value = LocalStorageManager.getLogin();
    }

    const handleLoginChange = (event) => {
        isLogged.value = JSON.parse(event.detail.storage);
        console.log('login page view is : ' + isLogged.value );
    };

    onMounted(() => {
        window.addEventListener('login-changed', handleLoginChange);
    });

    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('login-changed', handleLoginChange);
    });
    console.log('login page view is : ' + isLogged.value );
    //console.log('user page view is : ' + theOrganisator.value );
</script>

<style src="../../styles/MenusViewStyles/Login-ProfileView.scss"></style>