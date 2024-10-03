<template>
    <form class="sign-up" @submit=" Login()">

        <h2>{{actualLang ? 'sign-up' : 'Inscrivez-Vous'}}</h2>

        <v-text-field
            :rules="Name"
            hide-details="auto"
            :label="actualLang ? 'Username' : 'Nom d\'utilisateur'"
        ></v-text-field>

        <div class="sub">
            <v-text-field
                :rules="Email"
                hide-details="auto"
                :label="actualLang ? 'Email' : 'Email'"
            ></v-text-field>

            <v-text-field
                :rules="Number"
                hide-details="auto"
                :label="actualLang ? 'Phone' : 'Telephone'"
            ></v-text-field>
        </div>

        <v-text-field
            :rules="Password"
            hide-details="auto"
            :label="actualLang ? 'Password' : 'Mot de passe'"
        ></v-text-field>

        <v-text-field
            :rules="Password"
            hide-details="auto"
            :label="actualLang ? 'Password confirm' : 'Confirmer le mot de passe'"
        ></v-text-field>

        <button type="submit">{{actualLang ? 'Sign Up' : 'S\'inscrire'}}</button>
    </form>
</template>

<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted} from "vue";
  
    let actualLang = ref(storageManager.getLang());
    let isLogged = ref(storageManager.getLogin());

    const Login = () => {
        storageManager.setLogin(true);
        isLogged.value = storageManager.getLogin();
    }

    if (actualLang.value === null) {
        storageManager.setLang(true);
        actualLang.value = storageManager.getLang();
    }

    if (isLogged.value === null) {
        storageManager.setLogin(false);
        isLogged.value = storageManager.getLogin();
    }

    // Function to handle mode change event
    const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };
    const handleLoginChange = (event) => {
        isLogged.value = JSON.parse(event.detail.storage);
    };

    onMounted(() => {
        window.addEventListener('lang-changed', handleLangChange);
        window.addEventListener('login-changed', handleLoginChange);
    });

    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('lang-changed', handleLangChange);
        window.removeEventListener('login-changed', handleLoginChange);
    });
</script>

<style src="../../styles/Login-SignUpStyles//SignUpComponentStyle.scss"></style>