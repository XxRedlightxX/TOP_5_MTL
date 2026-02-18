<template>
    <form class="sign-up">
        <h2>{{ actualLang ? 'sign-up' : 'Inscrivez-Vous' }}</h2>

        <div class="field-container">
            <v-text-field
                :rules="Name"
                hint="this field is mandatory"
                :label="actualLang ? 'Username*' : 'Nom d\'utilisateur*'"
                type="input"
                clearable
                persistent-clear 
                hide-details="auto"
                v-model="formData.username"
                data-testid="register-username-input"
                required
            ></v-text-field>
            <p v-if="errors.username" class="error">{{ errors.username[0] }}</p>
        </div>

        <div class="sub">
            <div class="field-container">
                <v-text-field
                    :rules="Email"
                    hint="this field is mandatory"
                    :label="actualLang ? 'Email*' : 'Email*'"
                    type="input"
                    clearable
                    persistent-clear 
                    hide-details="auto"
                    data-testid="register-email-input"
                    v-model="formData.email"
                    required
                ></v-text-field>
                <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
            </div>

            <div class="field-container">
                <v-text-field
                    :rules="Number"
                    hint="this field is not mandatory"
                    :label="actualLang ? 'Phone' : 'Telephone'"
                    type="input"
                    clearable
                    persistent-clear 
                    hide-details="auto"
                    data-testid="register-phone-input"
                    v-model="formData.num_tel"
                ></v-text-field>
                <p v-if="errors.num_tel" class="error">{{ errors.num_tel[0] }}</p>
            </div>
        </div>

        <div class="field-container">
            <v-text-field
                :rules="Password"
                hint="this field is mandatory"
                :label="actualLang ? 'Password*' : 'Mot de passe*'"
                type="password"
                clearable
                persistent-clear 
                hide-details="auto"
                data-testid="register-password-input"
                v-model="formData.password"
            ></v-text-field>
            <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>
        </div>

        <div class="field-container">
            <v-text-field
                :rules="Password"
                hint="this field is mandatory"
                :label="actualLang ? 'Password confirm*' : 'Confirmer le mot de passe*'"
                type="password"
                clearable
                persistent-clear 
                hide-details="auto"
                data-testid="register-password_confirmation-input"
                required
                v-model="formData.password_confirmation"
            ></v-text-field>
        </div>

        <!-- Your radio group and button remain the same -->
        <v-radio-group 
            v-model="formData.type_utilisateur" 
            :rules="[v => !!v || 'User type is required']"
            required
            data-testid="user-type-group"
        >
            <v-radio
                v-for="(item, index) in items"
                :key="index"
                :label="item"
                :value="item"
                :data-testid="`user-type-option-${item}`"
            ></v-radio>
        </v-radio-group>

        <waterButton data-testid="btn-new-register" :text="actualLang ? 'Sign Up' : 'S\'inscrire'" :type="true" @click="Login()" />
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