<template>
    <form class="sign-up glass">

        <h2>{{actualLang ? 'sign-up' : 'Inscrivez-Vous'}}</h2>

        <v-text-field
            :rules="Name"
            hint="this field is mendatory"
            :label="actualLang ? 'Username*' : 'Nom d\'utilisateur*'"
            type="input"
            clearable
            persistent-clear 
            hide-details="auto"
        ></v-text-field>

        <div class="sub">
            <v-text-field
                :rules="Email"
                hint="this field is mendatory"
                :label="actualLang ? 'Email*' : 'Email*'"
                type="input"
                clearable
                persistent-clear 
                hide-details="auto"
            ></v-text-field>

            <v-text-field
                :rules="Number"
                hint="this field is not mendatory"
                :label="actualLang ? 'Phone' : 'Telephone'"
                type="input"
                clearable
                persistent-clear 
                hide-details="auto"
            ></v-text-field>
        </div>

        <v-text-field
            :rules="Password"
            hint="this field is mendatory"
            :label="actualLang ? 'Password*' : 'Mot de passe*'"
            type="input"
            clearable
            persistent-clear 
            hide-details="auto"
        ></v-text-field>

        <v-text-field
            :rules="Password"
            hint="this field is mendatory"
            :label="actualLang ? 'Password confirm*' : 'Confirmer le mot de passe*'"
            type="input"
            clearable
            persistent-clear 
            hide-details="auto"
        ></v-text-field>

        <!--<button type="submit">{{actualLang ? 'Sign Up' : 'S\'inscrire'}}</button>-->
        <waterButton :text="actualLang ? 'Sign Up' : 'S\'inscrire'" :type="true" @click=" Login()"/>
    </form>
</template>

<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted} from "vue";
    import waterButton from "../WaterButtonComponent.vue"
  
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