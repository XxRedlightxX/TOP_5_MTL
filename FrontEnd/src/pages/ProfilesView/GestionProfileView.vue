<template>
    <div id="gestionProfileView">
        <AvatarUploader/>

        <form action="#" class="forms">
            <div class="leftForm">
                <h2 class="titles">{{ actualLang ? "Account informations" : "Informations sur le compte" }}</h2>
                <div class="sub">
                    <v-text-field
                        :rules="Name"
                        :label="`${actualLang ? 'Name' : 'Nom'} : ${theUser?.name || ''}`"
                        type="input"
                        clearable
                        persistent-clear 
                        hide-details="auto"
                        v-model="formDataUser.name"
                    />


                    <v-text-field
                        :rules="Name"
                        :label="`${actualLang ? 'User Type' : 'Type Utilisateur'} : ${theUser?.type_utilisateur || ''}`"
                        
                        type="input"
                        clearable
                        persistent-clear 
                        hide-details="auto"
                        v-model="formDataUser.type_utilisateur"
                    ></v-text-field>
                </div>

                <v-text-field
                    :rules="Name"
                        :label="`${actualLang ? 'Username' : 'Nom d\'utilisateur'} : ${theUser?.name || ''}`"
                    
                    type="input"
                    clearable
                    persistent-clear 
                    hide-details="auto"
                    v-model="formDataUser.username"
                ></v-text-field>

                <div class="sub">
                    <v-text-field
                        :rules="Email"
                        hint="this field is mendatory"
                        :label="`${actualLang ? 'Email*' : 'Email*'} : ${theUser?.email || ''}`"
                        
                        type="input"
                        clearable
                        persistent-clear 
                        hide-details="auto"
                        v-model="formDataUser.email"
                    ></v-text-field>

                    <v-text-field
                        :rules="Number"
                        hint="this field is not mendatory"
                        :label="`${actualLang ? 'Phone' : 'Telephone'} : ${theUser?.num || ''}`"
                        
                        type="input"
                        clearable
                        persistent-clear 
                        hide-details="auto"
                        v-model="formDataUser.num_tel"
                    ></v-text-field>
                </div>

                <v-textarea :label="actualLang ? 'Type your Message' : 'Entrez votre message'"  v-model="formDataUser.description">{{ theUser.desc }}</v-textarea>
            </div>

            <div class="rightForm">
                <h2 class="titles">{{ actualLang ? "Login informations" : "Informations de connection" }}</h2>
                <v-text-field
                    :rules="Email"
                    :value="actualLang ? 'Email/Username ' : 'Email/Nom d\'utilisateur'"
                    type="input"
                    readonly="true"
                    hide-details="auto"
                ></v-text-field>

                <v-text-field
                    :rules="Password"
                    :label="actualLang ? 'Password' : 'Mot de passe'"
                    type="input"
                    clearable
                    persistent-clear 
                    hide-details="auto"
                ></v-text-field>

                <v-text-field
                    :rules="Password"
                    :label="actualLang ? 'Confirm password' : 'Confirmer le mot de passe'"
                    type="input"
                    clearable
                    persistent-clear 
                    hide-details="auto"
                ></v-text-field>

            </div>
        </form>
        <waterButton :text="actualLang ? 'Send' : 'Envoyer'" :type="true" class="btn" @click="updateUser()"/>
    </div>
</template>

<script setup>
    import AvatarUploader from '../../components/ProfileComponents/ProfileGestionComponents/AvatarUploader.vue';
    import waterButton from '../../components/WaterButtonComponent.vue';
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted, reactive } from 'vue';
    import { useAuthStore } from '@/stores/auth';
    import { useUserStore } from '@/stores/user';


    const authStore = useAuthStore();
    const errorMessage = ref(null);
    const  validationErrors  = ref(null);
    const { modifyUser} = useUserStore();

    const formDataUser = reactive({
        name : authStore.user.name,
        username : authStore.user.username,
        description : authStore.user.description,
        num_tel : authStore.user.num_tel,
        email : authStore.user.email,
        type_utilisateur : authStore.user.type_utilisateur
    })

    
   

    const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";
 
    const actualMode = ref(storageManager.getMode());
    const actualLang = ref(storageManager.getLang());
    let isLogged = ref(storageManager.getLogin());
    let theUser = ref(authStore.user);

 





    if (actualLang.value === null) {
        storageManager.setLang(true);
        actualLang.value = storageManager.getLang();
    }

    if (actualMode.value === null) {
        storageManager.setMode(true);
        actualMode.value = storageManager.getMode();
    }

    if (isLogged.value === true) {
        theUser.value = storageManager.getLogUser();
        console.log('isLogged 1 : ' + isLogged.value);
        console.log('theUser 1 : ', theUser.value);
    }

    if(theUser.value === null) {
        console.log(theUser , "No User");
    }
    // Function to handle mode change event
    const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };

    const handleModeChange = (event) => {
        actualMode.value = JSON.parse(event.detail.storage);
    };

    // Add event listener for mode changes
    onMounted(() => {
        window.addEventListener('lang-changed', handleLangChange);
        window.addEventListener('mode-changed', handleModeChange);
    });

    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('lang-changed', handleLangChange);
        window.removeEventListener('mode-changed', handleModeChange);
    });
    console.log('isLoged : ' + isLogged.value);
    console.log('the user : ' + theUser.value);

    const updateUser = async () => {

        console.log(formDataUser);
      
      
        try {
            const modifiedUser =await modifyUser(formDataUser);
            if (modifiedUser) {
                await authStore.getUser();
            }

        } catch (error) {
            errorMessage.value = error.message;
            console.error("Upload failed:", error);
        }

    }
</script>

<style src="../../styles/ProfilesStyles/GestionProfileViewStyle.scss"></style>