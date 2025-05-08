<template>
    <div id="Log-Sign-Bett">
      <article>
        <div class="container" :class="{ 'sign-up-active': signUp }">

          <div class="overlay-container">
            <div class="overlay">

                <div class="overlay-left">
                    <h2>{{actualLang ? 'Welcome Back!' : 'Bon retour'}}</h2>
                    <p>{{actualLang ? 'If you already have an account please Sign In' : 'Si vous avez déjà un compte, veuillez vous connecter'}}</p>
                    <!--<button class="invert" id="signIn" @click="toggleSignUp">{{actualLang ? 'here !' : 'ici !'}}</button>-->
                    <waterButton :text="actualLang ? 'here !' : 'ici !'" :type="false" @click="toggleSignUp"/>
                </div>

                <div class="overlay-right">
                    <h2>{{actualLang ? 'Welcome' : 'Bienvenu'}}</h2>
                    <p>{{actualLang ? 'You don\'t have an account ? Please Sign Up' : 'Vous n\'avez pas de compte ? Veuillez vous inscrire'}} </p>
                    <!--<button class="invert" id="signUp" @click="toggleSignUp">{{actualLang ? 'here !' : 'ici !'}}</button>-->
                    <waterButton :text="actualLang ? 'here !' : 'ici !'" :type="false" @click="toggleSignUp" />
                </div>

            </div>
          </div>

          <SignUp/>
          <SignIn/>

        </div>
        
        <LoginSignUpPhone class="containerPhone"/>

      </article>
    </div>
  </template>
  
<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted} from "vue";
    import SignUp from "./SignUpComponent.vue";
    import SignIn from "./SignInComponent.vue";
    import waterButton from "../WaterButtonComponent.vue"
    import LoginSignUpPhone from "./Login-SignUpComponentPhone.vue";

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
    // State management
    const signUp = ref(false);
    
    // Toggle between Sign Up and Sign In
    const toggleSignUp = () => {
        signUp.value = !signUp.value;
        //storageManager.setLogin(true);
        storageManager.setLogUser(user);
        // let theOrganisator = storageManager.getLogUser();
        // console.log('user page view is : ' + storageManager.getLogUser() );
    };

    let actualLang = ref(storageManager.getLang());

    if (actualLang.value === null) {
        storageManager.setLang(true);
        actualLang.value = storageManager.getLang();
    }

    // Function to handle mode change event
    const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };

    onMounted(() => {
        window.addEventListener('lang-changed', handleLangChange);
    });

    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('lang-changed', handleLangChange);
    });
</script>
  
<style src="../../styles/Login-SignUpStyles/Login-SignUpComponentStyle.scss"></style>