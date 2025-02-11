<template>
    <div id="filterPopUp" @click.self="popClosee()">
        <div class="event-update-form">
            <form>
                <h2>{{ actualLang ? "Filter" : "Filtre" }}</h2>
            </form>
        </div>
    </div>

</template>
<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted, defineProps, defineEmits, watch } from "vue";

    let trans = ref(null);
    const props = defineProps({
        user: Object,
        toShow: Boolean
    });
    if(props.toShow == null){
        trans.value = false
    }
    else {
        trans.value = props.toShow
    }
    watch(props.toShow, (newVal, oldVal) => {
        trans.value = newVal;
    });
    let actualLang = ref(storageManager.getLang());
    let isLogged = ref(storageManager.getLogin());

    const Logout = () => {
    storageManager.setLogin(false);
    isLogged.value = storageManager.getLogin();
    };

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

    // Définir les événements émis par ce composant
    const emit = defineEmits(['popClosee']);

    // Fonction pour émettre l'événement "popClosee"
    const popClosee = () => {
        trans.value = false
        emit('popClosee');
    };

</script>

<style lang="scss">
    #filterPopUp {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: hidden; 
        z-index: 100000; 
        background-color: rgba(0,0,0,0.4);
        //background-color: #8989893e;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;

        .nop {
            display: none;
        }
        .event-update-form {
            display: block;
            width: 50%;
            height: 60%;
            align-self: center;
            //padding: 1.5rem;
            background-color: var(--light05);
            border-radius: 42% 58% 37% 63% / 40% 43% 57% 60%;
        
            h2 {
                text-align: center;
                margin-bottom: 1rem;
                color: #333;
                font-size: 1.8rem;
            }
            .close {
                color: #aaa;
                float: right;
                font-size: 28px;
                font-weight: bold;

                &:hover,
                &:focus {
                    color: black;
                    text-decoration: none;
                    cursor: pointer;
                }
            }
            form {
                margin-top: 7%;
        
                .form-actions {
                    display: flex;
                    justify-content: center;
                    gap: 25%;
                    margin-top: 1.5rem;
                    //border: 2px solid red;
            
                    button {
                        padding: 0.8rem 1.5rem;
                        font-size: 1rem;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: all 0.3s;
            
                        &.btn-submit {
                            background-color: #5a9;
                            color: #fff;
                
                            &:hover {
                                background-color: #4a8;
                            }
                        }
            
                        &.btn-cancel {
                            background-color: #f44336;
                            color: #fff;
                
                            &:hover {
                                background-color: #d32f2f;
                            }
                        }
                    }
                }
            }
        }
    }
    
</style>