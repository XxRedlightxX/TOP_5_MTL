<template>
    <div id="gestionProfileView" class="glass">
        <AvatarUploader/>

        <form action="#" class="forms">
            <div class="leftForm">
                <h2 class="titles">{{ actualLang ? "Account informations" : "Informations sur le compte" }}</h2>
                <div class="sub">
                    <v-text-field
                        :rules="Name"
                        :label="actualLang ? 'Name' : 'Nom'"
                        type="input"
                        clearable
                        persistent-clear 
                        hide-details="auto"
                    ></v-text-field>

                    <v-text-field
                        :rules="Name"
                        :label="actualLang ? 'First name' : 'Prenom'"
                        type="input"
                        clearable
                        persistent-clear 
                        hide-details="auto"
                    ></v-text-field>
                </div>

                <v-text-field
                    :rules="Name"
                    :label="actualLang ? 'Username' : 'Nom d\'utilisateur'"
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

                <v-textarea :label="actualLang ? 'Type your Message' : 'Entrez votre message'"></v-textarea>
            </div>

            <div class="rightForm">
                <h2 class="titles">{{ actualLang ? "Login informations" : "Informations de connection" }}</h2>
                <v-text-field
                    :rules="Email"
                    :value="actualLang ? 'Email/Username' : 'Email/Nom d\'utilisateur'"
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
        <waterButton :text="actualLang ? 'Send' : 'Envoyer'" :type="true" class="btn"/>
    </div>
</template>

<script setup>
    import AvatarUploader from '../../components/ProfileComponents/ProfileGestionComponents/AvatarUploader.vue';
    import waterButton from '../../components/WaterButtonComponent.vue'
    import storageManager from "../../JS/LocalStaorageManager"
    import { ref, onMounted, onUnmounted } from 'vue';

    const actualMode = ref(storageManager.getMode());
    const actualLang = ref(storageManager.getLang());

    if (actualLang.value === null) {
        storageManager.setLang(true);
        actualLang.value = storageManager.getLang();
    }

    if (actualMode.value === null) {
        storageManager.setMode(true);
        actualMode.value = storageManager.getMode();
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
</script>

<style src="../../styles/ProfilesStyles/GestionProfileViewStyle.scss"></style>