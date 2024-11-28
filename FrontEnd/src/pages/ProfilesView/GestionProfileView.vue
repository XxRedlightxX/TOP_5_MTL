<template>
    <div id="gestionProfileView">
        <h3> Gestion profile View</h3>
        <div class="photo-profile">
            <div class="test">
            <img src="../../assets/bob.jpg">
            <div class="overlay">My Name is John</div>
        </div>
        </div>


        <form action="">
    <div>
        <label for="fname">Full name:</label>
        <input type="text" id="fname" name="fname" value="John">
    </div>
    <div>
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" value="Doe">
    </div>
    <div>
        <label for="number">Number:</label>
        <input type="text" id="number" name="number" value="Doe">
    </div>
    <div>
        <label for="city">City:</label>
        <input type="text" id="city" name="city" value="Doe">
    </div>
    <div class="row_input">
        <div >
            <label for="region">Region:</label>
            <input type="text" id="region" name="region" value="Doe">
        </div>
        <div>
            <label for="postal-code">Postal Code:</label>
            <input type="text" id="postal-code" name="postal-code" value="Doe">
        </div>
    </div>

   <div class="button_confirmer">
    
        <input type="submit" value="Cancel">

        <input type="submit" value="Submit">
    </div>
</form>


    </div>
</template>

<script setup>
    import AvatarUploader from '../../components/ProfileComponents/ProfileGestionComponents/AvatarUploader.vue';
    import waterButton from '../../components/WaterButtonComponent.vue'
    import storageManager from "@/JS/LocalStaorageManager"
    import { ref, onMounted, onUnmounted } from 'vue';

    const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";
    const user = {
        avatar: "/src/assets/p1.jpg",
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