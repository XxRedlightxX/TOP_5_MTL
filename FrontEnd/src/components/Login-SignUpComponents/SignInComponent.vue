<template>
  <form class="sign-in glass">

    <h2>{{actualLang ? 'Sign In' : 'Connectez-Vous'}}</h2>
  
    <v-text-field
        :label="actualLang ? 'Email' : 'Email'"
        clearable
        persistent-clear 
        hide-details="auto"
        required
        data-testid="login-email-input"
        v-model="formData.email"
    ></v-text-field>
    <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
   
    <v-text-field
        :rules="Password"
        :label="actualLang ? 'Password' : 'Mot de passe'"
        type="password"
        data-testid="login-password-input"
        clearable
        persistent-clear 
        hide-details="auto"
        required
        v-model="formData.password"
    ></v-text-field>
     <p v-if="errors.password" class="error" >{{ errors.password[0] }} </p>
    

    <a href="#" class="forgot">{{actualLang ? 'Forgot your password ?' : 'Vous avez oublié votre mot de passe ?'}}</a>
    <p v-if="errors.general" class="error">{{ errors.general[0] }}</p>

    <waterButton data-testid="btn-sign-in"  :text="actualLang ? 'Sign In' : 'Se connecter'" :type="true" @click="Login()" />
  </form>

</template>

<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted,reactive, watch } from "vue";
    import waterButton from "../WaterButtonComponent.vue"
    import { useAuthStore } from "@/stores/auth";
    import { storeToRefs } from "pinia";

    let actualLang = ref(storageManager.getLang());
    let isLogged = ref(storageManager.getLogin());

   
    
    const messagePop = actualLang.value
      ? "Login successfully!" 
      : "connecter avec succès"
    

    const {errors} = storeToRefs(useAuthStore());
    const {authenticate}= useAuthStore();

    onMounted(() => (errors.value = {}));

    const formData =reactive({
        email : "",
        password : ""
    })

    


    // Authentication
   const Login = async () => {
    try {
        const success = await authenticate('login', formData);
        if (success) {
            console.log(success +" state")
            storageManager.setLogin(true);
            isLogged.value = storageManager.getLogin();
            window.$toast(messagePop);
        } else {
            console.log("Not Connect");
             storageManager.setLogin(false);
        }
    } 
    catch (errors) {
        // Handle any errors
        console.error('Login error:', errors);
        }
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

    // Remove from UI error message after 3 sec
   watch([
    () => errors.value.email,
    () => errors.value.password,
     () => errors.value.num_tel,
    () => errors.value.general,
    ], ([newEmail, newPassword,otherErrors, newNum_tel]) => {
    if (newEmail || newPassword || otherErrors || newNum_tel) {
        setTimeout(() => {
            errors.value.email = null;
            errors.value.password = null;
            errors.value.num_tel = null;
            errors.value.general = null;
        }, 113000)
    }
});

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

<style src="../../styles/Login-SignUpStyles/SignInComponentStyle.scss"></style>