<template>
    <div id="updateEvent" @click.self="popUpdate">
        <div class="event-update-form">
            <span class="close" @click="popUpdate" >&times;</span>
            <h2>Update Event</h2>
            <form>
                <div class="form-group">
                    <label for="event-name">Event Name</label>
                    <input type="text" id="event-name" placeholder="Enter event name" required>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="event-date">Date</label>
                        <input type="date" id="event-date" required>
                    </div>

                    <div class="form-group">
                        <label for="event-time">Time</label>
                        <input type="time" id="event-time" required>
                    </div>

                    <div class="form-group">
                        <label for="event-duration">Duration (hours)</label>
                        <input type="number" id="event-duration" placeholder="e.g., 2" min="1" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="event-location">Location</label>
                    <input type="text" id="event-location" placeholder="Enter location" required>
                </div>

                <div class="form-group">
                    <label for="event-picture">Upload Picture</label>
                    <input type="file" id="event-picture" accept="image/*">
                </div>

                <div class="form-group">
                    <label for="event-hosts">Co-hosts</label>
                    <input type="text" id="event-hosts" placeholder="Add other hosts (comma-separated)">
                    <div class="form-group_images">
                        <img src="https://picsum.photos/id/375/200/300"> <img src="https://picsum.photos/id/375/200/300" alt=""> <img src="https://picsum.photos/id/375/200/300">
                    </div>
                </div>
            
                <div class="form-actions">
                    <waterButton :text="actualLang ? 'Update' : 'Mettre a jour'" :type="true" class="btnn"/>
                    <waterButton :text="actualLang ? 'Cancel' : 'Annuler'" :type="false" class="btnn"  @click="popUpdate"/>
                </div>
            </form>
        </div>
    </div>

</template>
<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted, defineProps, defineEmits } from "vue";
    import waterButton from "@/components/WaterButtonComponent.vue";
    //import imgUrl from "../../../assets/bob.jpg";

    const props = defineProps({
        user: Object
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
    const emit = defineEmits(['popUpdate']);

    // Fonction pour émettre l'événement "popUpdate"
    const popUpdate = () => {
        emit('popUpdate');
    };

</script>

<style lang="scss">
    #updateEvent {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: hidden; 
        z-index: 500; 

        .event-update-form {
            border-radius: 16px;
            backdrop-filter: blur(7px);
            -webkit-backdrop-filter: blur(7px);
            scrollbar-width: thin;
            h2 {
                text-align: center;
            }
            .close {
                float: right;
                font-weight: bold;

                &:hover,
                &:focus {
                    text-decoration: none;
                    cursor: pointer;
                }
            }
            form {
                .form-group {
                    display: flex;
                    flex-direction: column;
            
                    label {
                        text-align: left;
                    }
            
                    input {
                        transition: all 0.3s;
                    
            
                        &:focus {
                            outline: none;
                        }
                    }

                    &_images {
                        display: flex;
                    }
                }
        
                .form-row {
                    display: flex;
                }
        
                .form-actions {
                    display: flex;
                    justify-content: space-between;
            
                    .btnn {
                        width: 40%;
                    }
                    
                }
            }
        }
    }
    .light { 
        #updateEvent {
            background-color: rgb(0,0,0); 
            background-color: rgba(0,0,0,0.4);

            .event-update-form {
                background-color: var(--light05);
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            
                h2 {
                    color: var(--graphite);
                }
                .close {
                    color: var(--graphite);

                    &:hover,
                    &:focus {
                        color: var(--graphite015);
                    }
                }
                form {
                    .form-group {
                        label {
                            color: var(--graphite);
                        }
                
                        input::placeholder {
                            color: var(--graphite05);
                        }
                        input {
                            border: 1px solid var(--graphite015);
                            color: var(--graphite);
                        
                
                            &:focus {
                                border-color: var(--graphite);
                                box-shadow: 0 0 5px rgba(155, 155, 155, 0.5);
                            }
                        }
                    }
                }
            }
        }
    }
    .dark { 
        #updateEvent {
            background-color: rgb(0,0,0); 
            background-color: rgba(0,0,0,0.4);

            .event-update-form {
                background-color: var(--light05);
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                scrollbar-color: var(--light015) var(--light05);
            
                h2 {
                    color: var(--light);
                }
                .close {
                    color: var(--light);

                    &:hover,
                    &:focus {
                        color: var(--light-text);
                    }
                }
                form {
                    .form-group {
                        label {
                            color: var(--light);
                        }
                
                        input::placeholder {
                            color: var(--light-text);
                        }
                        input {
                            border: 1px solid #ddd;
                            color: var(--light);
                        
                
                            &:focus {
                                border-color: #fffcfc;
                                box-shadow: 0 0 5px rgba(155, 155, 155, 0.5);
                            }
                        }
                    }
                }
            }
        }
    }
    @media screen and (min-width: 1025.1px) {
        #updateEvent {
            .event-update-form {
                width: 50%;
                margin: 1rem auto;
                padding: 1.5rem;
                height: 91%;
            
                h2 {
                    margin-bottom: 1rem;
                    font-size: 1.8rem;
                }
                .close {
                    font-size: 28px;
                }
                form {
                    .form-group {
                        margin-bottom: 1rem;
                
                        label {
                            font-size: 1rem;
                            margin-bottom: 0.5rem;
                        }
                
                        input {
                            font-size: 1rem;
                            padding: 0.7rem;
                            border-radius: 5px;
                        }

                        &_images {
                            padding-top: 2%;
                            gap: 0.5em;
                            img {
                                width: 40px;
                                border-radius: 50%;

                            }
                        }
                    }
            
                    .form-row {
                        gap: 1rem; 
                        margin-bottom: 1rem;
                
                        .form-group {
                            flex: 1; 
                
                            input {
                                width: 80%; 
                            }
                        }
                    }
            
                    .form-actions {
                        margin-top: 1.5rem;
                
                        button {
                            padding: 0.8rem 1.5rem;
                            font-size: 1rem;
                            border-radius: 5px;
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 1025px) {
        #updateEvent {
            .event-update-form {
                width: 90%;
                margin: 5rem auto 1rem auto;
                padding: 1.5rem;
                height: 83%;
                overflow: auto;
            
                h2 {
                    margin-bottom: 1rem;
                    font-size: 1.8rem;
                }
                .close {
                    font-size: 28px;
                }
                form {
                    .form-group {
                        margin-bottom: 1rem;
                
                        label {
                            font-size: 1rem;
                            margin-bottom: 0.5rem;
                        }
                
                        input {
                            font-size: 1rem;
                            padding: 0.7rem;
                            border-radius: 5px;
                        }

                        &_images {
                            padding-top: 2%;
                            gap: 0.5em;
                            img {
                                width: 40px;
                                border-radius: 50%;

                            }
                        }
                    }
            
                    .form-row {
                        flex-direction: column;
                        gap: 1rem; 
                        margin-bottom: 1rem;
                
                        .form-group {
                            flex: 1; 
                
                            input {
                                width: 100%; 
                            }
                        }
                    }
            
                    .form-actions {
                        margin-top: 1.5rem;
                
                        button {
                            padding: 0.8rem 1.5rem;
                            font-size: 1rem;
                            border-radius: 5px;
                        }
                    }
                }
            }
        }
    }
</style>