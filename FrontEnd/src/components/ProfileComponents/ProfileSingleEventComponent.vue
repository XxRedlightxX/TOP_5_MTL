<template>
    <div id="profileSingleEventComponent" class="glass">
        <div class="first">
            <img :src="imgAvatar" alt="#">
        </div>

        <div class="middle">
            
            <h2>FullName</h2>

            <p> 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam inventore tempore quis 
                voluptatibus similique porro, aperiam fugit accusantium! Impedit repudiandae reprehenderit
            </p>

        </div>

        <div class="last">

            <v-icon icon="mdi-folder-edit" :class="['icon', {'glowLess' : !actualMode}]"/>
            <v-icon icon="mdi-delete-circle" :class="['icon', {'glowLess' : !actualMode}]"/>

        </div>

    </div>
  </template>
  
<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted} from "vue";
    import imgAvatar from "/src/assets/HomeCarousel/Jardin-botanique.jpg"

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
    #profileSingleEventComponent {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .first {
            width: 20%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            img {
                width: 100%;
            }
        }


        .middle {
            flex: 1;
            //width: 55%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 0% 5%;
        }

        .last {
            //width: 15%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            padding: 0%;


            .icon {
                padding: 2% 4%;
                font-size: 3.2rem;
            }
            .icon:hover {
                cursor: pointer;
            }
        }
    }

    .light {
        #profileSingleEventComponent {
            .middle {
                h2, p {
                    color: var(--graphite08);
                }
            }

            .last {
                .icon {
                    color: var(--graphite06);
                }
                .icon:hover {
                    color: var(--graphite);
                }
            }
        }
    }

    .dark {
        #profileSingleEventComponent {
            .middle {
                h2, p {
                    color: var(--light-trans-text);
                }
            }

            .last {
                .icon {
                    color: var(--light-trans-2Shine);
                }
            }
        }
    }
</style>