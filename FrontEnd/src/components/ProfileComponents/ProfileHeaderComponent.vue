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
            
            <v-icon icon="mdi-account-edit" :class="['icon', {'justGlowless' : !actualMode}]"/>
            <v-icon icon="mdi-logout" :class="['icon', {'justGlowless' : !actualMode}]" @click="Logout()"/>

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
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 2% 1% 2% 2%;
        box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
                    0 10px 10px rgba(0, 0, 0, .2);

        .first {
            width: 30%;
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
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 0% 5%;

            h2 {
                color: var(--graphite08);
            }
            p {
                color: var(--graphite08);
            }
        }

        .last {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            padding: 0%;

            .icon {
                padding: 2% 4%;
                color: var(--graphite06);
                font-size: 3.2rem;
            }
            .icon:hover {
                cursor: pointer;
                color: var(--graphite);
            }
        }
    }
</style>