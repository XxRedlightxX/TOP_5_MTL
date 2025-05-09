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
                    />


                    <v-text-field
                        :rules="Name"
                        :label="`${actualLang ? 'First name' : 'Prenom'} : ${theUser?.fistname || ''}`"
                        
                        type="input"
                        clearable
                        persistent-clear 
                        hide-details="auto"
                    ></v-text-field>
                </div>

                <v-text-field
                    :rules="Name"
                        :label="`${actualLang ? 'Username' : 'Nom d\'utilisateur'} : ${theUser?.username || ''}`"
                    
                    type="input"
                    clearable
                    persistent-clear 
                    hide-details="auto"
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
                    ></v-text-field>

                    <v-text-field
                        :rules="Number"
                        hint="this field is not mendatory"
                        :label="`${actualLang ? 'Phone' : 'Telephone'} : ${theUser?.num || ''}`"
                        
                        type="input"
                        clearable
                        persistent-clear 
                        hide-details="auto"
                    ></v-text-field>
                </div>

                <v-textarea :label="actualLang ? 'Type your Message' : 'Entrez votre message'" >{{ theUser.desc }}</v-textarea>
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
    import waterButton from '../../components/WaterButtonComponent.vue'
    import storageManager from "@/JS/LocalStaorageManager"
    import { ref, onMounted, onUnmounted } from 'vue';

    const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";
    const user = {
        avatar: "https://picsum.photos/id/375/200/300",
        username: "Debrazer",
        name: "Wakanda",
        fisrtName: "Dede",
        email: "dedeTheBest@gmail.com",
        num: 1122222222,
        desc: text,
        listEvent: [
            { image: "/src/assets/HomeCarousel/Mont-royal.jpg", title: "Mont-Royal", desc: text, rating: 1 },
            { image: "/src/assets/HomeCarousel/Vieux-port.jpg", title: "Vieux-Port", desc: text, rating: 3 },
            { image: "/src/assets/HomeCarousel/LaRonde.jpg", title: "Laronde", desc: text, rating: 5 },
            { image: "/src/assets/HomeCarousel/Jardin-botanique.jpg", title: "Jardin Botanique", desc: text, rating: 4 },
            { image: "/src/assets/HomeCarousel/Vieux-port.jpg", title: "Vieux-Port", desc: text, rating: 3 }
        ]
    };

    const actualMode = ref(storageManager.getMode());
    const actualLang = ref(storageManager.getLang());
    let isLogged = ref(storageManager.getLogin());
    let theUser = ref(null);

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
        theUser.value = user
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

    const updateUser = () => {

    }
</script>

<style src="../../styles/ProfilesStyles/GestionProfileViewStyle.scss"></style>