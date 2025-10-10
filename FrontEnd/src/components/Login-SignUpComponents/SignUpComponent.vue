

<template>


     <p v-if="authStore.user">{{ authStore.user.name }}</p>
       <p v-if="errors.general" class="error">{{ errors.general[0] }}</p>
    <form class="sign-up glass" >

        <h2>{{actualLang ? 'sign-up' : 'Inscrivez-Vous'}}</h2>
       

        <v-text-field
            :rules="Name"
            hint="this field is mendatory"
            :label="actualLang ? 'Username*' : 'Nom d\'utilisateur*'"
            type="input"
            clearable
            persistent-clear 
            hide-details="auto"
            v-model="formData.username"
           required
          
        ></v-text-field>
         <p v-if="errors.username" class="error">{{ errors.username[0] }}</p>

        <div class="sub">
            <v-text-field
                :rules="Email"
                hint="this field is mendatory"
                :label="actualLang ? 'Email*' : 'Email*'"
                type="input"
                clearable
                persistent-clear 
                hide-details="auto"
                v-model = "formData.email"
            ></v-text-field>
             <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
             

            <v-text-field
                :rules="Number"
                hint="this field is not mendatory"
                :label="actualLang ? 'Phone' : 'Telephone'"
                type="input"
                clearable
                persistent-clear 
                hide-details="auto"
                v-model = "formData.num_tel"
            ></v-text-field>
             <p v-if="errors.num_tel" class="error">{{ errors.num_tel[0] }}</p>
        </div>

        <v-text-field
            :rules="Password"
            hint="this field is mendatory"
            :label="actualLang ? 'Password*' : 'Mot de passe*'"
            type="input"
            clearable
            persistent-clear 
            hide-details="auto"
            v-model="formData.password"
        ></v-text-field>
        <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>

        <v-text-field
            :rules="Password"
            hint="this field is mendatory"
            :label="actualLang ? 'Password confirm*' : 'Confirmer le mot de passe*'"
            type="input"
            clearable
            persistent-clear 
            hide-details="auto"
             v-model="formData.password_confirmation"
        ></v-text-field>

        <v-radio-group 
            v-model="formData.type_utilisateur" 
         
            :rules="[v => !!v || 'User type is required']"
            required
            >
            <v-radio
                v-for="(item, index) in items"
                :key="index"
                :label="item"
                :value="item"
            ></v-radio>
    </v-radio-group>

        
    
        
        <waterButton :text="actualLang ? 'Sign Up' : 'S\'inscrire'" :type="true" @click="Login()" />
    </form>
</template>

<script setup>
    import { useAuthStore } from "@/stores/auth";
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted, reactive} from "vue";
    import waterButton from "../WaterButtonComponent.vue";
    import { storeToRefs } from "pinia";

    let actualLang = ref(storageManager.getLang());
    const { errors } = storeToRefs(useAuthStore());
    let isLogged = ref(storageManager.getLogin());

    onMounted(() => (errors.value = {}));
    const {authenticate} = useAuthStore();

    const authStore = useAuthStore();
    const formData  = reactive({
        username: '',
        email : '',
        num_tel : '',
        type_utilisateur : null ,
        password : '',
        password_confirmation : '',
    })

  
    const items = [
        'particulier',
        'organisateur',

    ];
   
    const Login = async() => {
        try {
            const success = await authenticate('register', formData);
            if (success) {
                storageManager.setLogin(true);
                isLogged.value = storageManager.getLogin();
            }
            console.log(success + "Authenticated") 
        } catch (errors) {
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

<style src="../../styles/Login-SignUpStyles/SignUpComponentStyle.scss"></style>