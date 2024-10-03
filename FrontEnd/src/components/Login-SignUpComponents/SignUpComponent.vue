<template>
    <form class="sign-up" @submit.prevent="submitForm('signup')">

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

    if (actualLang.value === null) {
        storageManager.setLang(true);
        actualLang.value = storageManager.getLang();
    }

    // Function to handle mode change event
    const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };
    // Add event listener for mode changes
    onMounted(() => {
        window.addEventListener('lang-changed', handleLangChange);
    });

    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('lang-changed', handleLangChange);
    });
</script>

<style lang="scss">
  .sign-up {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 5% 3%;
    
    text-align: center;
    background: linear-gradient(to bottom, #efefef, #ccc);

    .v-text-field {
      border: none;
      padding: 8px 15px;
      margin: 6px 0;
      width: 100%;
      max-height: 65px;
      overflow: hidden;

      &:focus {
        outline: none;
        background-color: #fff;
      }
    }
    .sub {
        width: 100%;
        display: flex;
        flex-direction: row;   
        justify-content: space-between;
        .v-text-field {
            width: 50%;
        }
    }
    .forgot {
      color: black;
      text-decoration: none;
    }
    .forgot:hover {
      color: red;
      cursor: pointer;
    }
    button {
      border-radius: 20px;
      border: 1px solid #009345;
      background-color: #009345;
      color: #fff;
      font-size: 1rem;
      font-weight: bold;
      padding: 10px 40px;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: transform .1s ease-in;

      &:active {
        transform: scale(.9);
      }

      &:focus {
        outline: none;
      }
    }
    button:hover {
      background-color: #0093458d;
    }
    button.invert {
      background-color: transparent;
      border-color: #fff;
    }
  }
</style>