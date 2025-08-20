<template>
    <div id="myModal" class="modal" style="display:none" @click.self="pop">
        <!-- Modal content -->
        <div class="modal-content" @click.self="pop">
            <div class="event-create-form">
                <span class="close" @click="pop" >&times;</span>
                <h2>Create Event</h2>
                <form @submit.prevent="testInput" >
                    <div class="form-group">
                        <label for="event-name">Event Name</label>
                        <input type="text" v-model="formDataEvent.titre" id="event-name" placeholder="Enter event name" required>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="event-date">Date</label>
                            <input type="date"  ref="inputRefDate"  id="event-date" required>
                        </div>

                        <div class="form-group">
                            <label for="event-time">Time</label>
                            <input type="time" ref="inputRefTime"  id="event-time" required>
                        </div>

                        <div class="form-group">
                            <label for="event-duration">Duration (hours)</label>
                            <input type="number" id="event-duration" placeholder="e.g., 2" min="1" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="event-location">Location</label>
                        <input type="text"  v-model="formDataEvent.lieu" id="event-location" placeholder="Enter location" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="event-location">Description</label>
                        <input type="text"  v-model="formDataEvent.description" id="event-description" placeholder="Enter description" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="event-location">statut_journee</label>
                            <input type="text"  v-model="formDataEvent.statut_journee" id="event-description" placeholder="Enter description" required>
                        </div>

                        <select name="cars" id="cars">
                            <option value="volvo">Volvo</option>
                           
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="event-picture">Upload Picture</label>
                        <input type="file" name="file"  @change="handleFileUpload" id="event-picture"  accept="image/*">
                    </div>

                    <div class="form-group">
                        <label for="event-hosts">Co-hosts</label>
                        <input type="text" id="event-hosts" v-model="formDataEvent.saison_id" placeholder="Add other hosts (comma-separated)">
                        <div class="form-group_images">
                            <!-- <img :src="imgUrl"> <img :src="imgUrl" alt=""> <img :src="imgUrl"> -->
                        </div>
                    </div>
                
                    <div class="form-actions">
                          <button  type="submit"  >{{actualLang ? 'Sign Up' : 'S\'inscrire'}}</button>
                        <waterButton :text="actualLang ? 'Create' : 'Creer'" :type="true" class="btnn"/>
                        <waterButton :text="actualLang ? 'Cancel' : 'Annuler'" :type="false" class="btnn"  @click="pop"/>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>
<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted, defineProps, defineEmits, reactive } from "vue";
    import waterButton from "@/components/WaterButtonComponent.vue";
    import { useActivityStore } from "@/stores/activity";
    import { formatDateApi } from "@/JS/GlobalFunctions";

    const {addEvent} = useActivityStore();

    const inputRefDate = ref(null);
    const inputRefTime = ref(null);
    const result = ref(null);
    const selectedFile = ref(null)
    const errorMessage = ref(null);
    const  validationErrors  = ref(null);

    const formDataEvent= reactive({
            titre: "",
            date: "",
            description: "",
            statut_journee : "",
            lieu : "",
            image_data : "",
            saison_id
            : null
    });


    const handleFileUpload = (event) => {
        errorMessage.value = null;
        validationErrors.value = {};
        
        const file = event.target.files[0];
        if (!file) {
            errorMessage.value = 'Please select a file first';
            return;
        }
        selectedFile.value = file;
    };




    const testInput  =  async() => {
        const dateValue = inputRefDate.value.value;
        const timeValue = inputRefTime.value.value;
        
        const formattedDateTime = formatDateApi(dateValue, timeValue);
        formDataEvent.date = formattedDateTime;

        const formData = new FormData();

        formData.append('titre', formDataEvent.titre);
        formData.append('date', formDataEvent.date);
        formData.append('description', formDataEvent.description);
        formData.append('statut_journee', formDataEvent.statut_journee);
        formData.append('lieu', formDataEvent.lieu);
        formData.append('saison_id', formDataEvent.saison_id);

            if (selectedFile.value) {
                    formData.append('image_data', selectedFile.value);
                }
        const test = await addEvent(formData);



        console.log(test);
        pop();


};










   

    

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
    const emit = defineEmits(['pop']);

    // Fonction pour émettre l'événement "pop"
    const pop = () => {
        emit('pop');
    };

</script>

<style lang="scss">
    .modal {
        position: fixed; 
        left: 0;
        top: 0%;
        width: 100%; 
        height: 100%; 
        overflow: hidden; 
        z-index: 500; 

        .modal-content {
            background-color: transparent;
            box-sizing: content-box;
            position: relative;

            .event-create-form {
                border-radius: 16px;
                backdrop-filter: blur(7px);
                -webkit-backdrop-filter: blur(4.7px);
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
                        }

                        &_images {
                            display: flex;
                        }
                    }
                
                    .form-row {
                        display: flex;
                
                        .form-group {
                            flex: 1; 
                        }
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
    }
    .light {
        .modal {
            background-color: rgb(0,0,0); 
            background-color: rgba(0,0,0,0.4); 

            .modal-content {
                background-color: transparent;

                .event-create-form {
                    background-color: var(--light05);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    scrollbar-color: var(--graphite015) rgba(255, 255, 255, 0.06);
                
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
                                    border-color: var(--graphite05);
                                    box-shadow: 0 0 5px rgba(155, 155, 155, 0.5);
                                    outline: none;
                                }
                            }
                        }
                    }
                }
        
            }
        }
    }
    .dark {
        .modal {
            background-color: rgb(0,0,0); 
            background-color: rgba(0,0,0,0.4); 

            .modal-content {
                background-color: transparent;

                .event-create-form {
                    background-color: var(--light05);;
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
                                    outline: none;
                                }
                            }
                        }
                    }
                }
        
            }
        }
    }
    @media screen and (min-width: 1025.1px) {
        .modal {

            .modal-content {
                margin: 0.2% auto;
                padding: 20px;
                width: 80%;
                height: 100%;

                .event-create-form {
                    width: 53%;
                    margin: 3rem auto 1rem auto;
                    padding: 1.5rem;
                    height: 83%;
                    overflow: auto;
                    scrollbar-width: thin;
                
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
                            flex-direction: row;
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
                        }
                    }
                }
        
            }
        }
    }

    @media screen and (max-width: 1025px) {
        .modal {

            .modal-content {
                margin: 0.2% auto;
               // padding: 20px;
                width: 100%;
                height: 100%;

                .event-create-form {
                    width: 75%;
                    margin: 5rem auto 1rem auto;
                    padding: 1.5rem;
                    height: 80%;
                    overflow: auto;
                
                    h2 {
                        margin-bottom: 1rem;
                        font-size: 1.8rem;
                    }
                    .close {
                        font-size: 32px;
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
                                    width: 92%; 
                                }
                            }
                        }
                    
                        .form-actions {
                            margin-top: 1.5rem;
                        }
                    }
                }

            }
        }
    }
    
</style>