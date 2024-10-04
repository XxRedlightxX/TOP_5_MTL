<template>
    <div id="profileHeaderComponent">
        <div class="first">
            <v-avatar size="180">
                <img
                    alt="John"
                    :src="imgAvatar"
                />
            </v-avatar>
        </div>
        <div class="middle">
            <h2>FullName</h2>

            <p> 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam inventore tempore quis 
                voluptatibus similique porro, aperiam fugit accusantium! Impedit repudiandae reprehenderit
            </p>
        </div>

        <div class="last">
            <button @click="Logout()">Logout</button>
            <button @click="Logout()">Logout</button>
        </div>
        
    </div>
  </template>
  
<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted} from "vue";
    import imgAvatar from '../../assets/p1.jpg';

    let actualLang = ref(storageManager.getLang());
    let isLogged = ref(storageManager.getLogin());

    const Logout = () => {
        storageManager.setLogin(false);
        isLogged.value = storageManager.getLogin();
    }

    if (actualLang.value === null) {
        storageManager.setLang(true);
        actualLang.value = storageManager.getLang();
    }

    if (isLogged.value === null) {
        Logout();
    }


    // Function to handle mode change event
    const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };
        // Function to handle mode change event
    const handleLoginChange = (event) => {
        isLogged.value = JSON.parse(event.detail.storage);
    };
    // Add event listener for mode changes
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

<style lang="scss">
    #profileHeaderComponent {
        border: 2px solid red;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .first {
            width: 30%;
            border: 2px solid black;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .v-avatar {
                img {
                    width: 100%;
                }
            }
        }


        .middle {
            width: 45%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            border: 2px solid black;

            h2 {
                color: black;
            }
            p {
                color: black;
            }
        }

        .last {
            width: 15%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            border: 2px solid black;
            padding: 0% 1%;

            button {
                border: 2px solid black;
                background-color: rgba(244, 0, 0, 0.5);
                padding: 1% 2%;
                color: black;
                font-weight: bold;
            }
            button:hover {
                background-color: rgba(255, 0, 0, 0.3);
            }
        }
    }
</style>