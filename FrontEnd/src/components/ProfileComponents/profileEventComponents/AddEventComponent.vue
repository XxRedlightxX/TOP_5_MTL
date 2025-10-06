<template>
    <div id="myModal" class="modal" style="" @click.self="pop">
        <div class="modal-content" @click.self="pop">
            <div class="event-create-form">
                <span class="close" @click="pop">&times;</span>
                <h2>Create Event</h2>
                <form @submit.prevent="testInput">
                    <div class="form-group">
                        <label for="event-name">Event Name</label>
                        <input type="text" v-model="formDataEvent.titre" id="event-name" placeholder="Enter event name" required>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="event-date">Date</label>
                            <input type="date" ref="inputRefDate" id="event-date" required>
                        </div>

                        <div class="form-group">
                            <label for="event-time">Time</label>
                            <input type="time" ref="inputRefTime" id="event-time" required>
                        </div>

                        <div class="form-group">
                            <label for="event-duration">Duration (hours)</label>
                            <input type="number" v-model="durationHours" id="event-duration" placeholder="e.g., 2" min="1" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="event-location">Location</label>
                        <input type="text" v-model="formDataEvent.lieu" id="event-location" placeholder="Enter location" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="event-description">Description</label>
                        <input type="text" v-model="formDataEvent.description" id="event-description" placeholder="Enter description" required>
                    </div>

                    <div class="form-row">
                       <div class="form-group">
                            <label for="event-type">Daytime</label>
                            <select id="event-type" v-model="formDataEvent.statut_journee" required>
                                <option value="JOUR">Day</option>
                                <option value="NUIT">Night</option>
                            </select>
                        </div>


                         <div class="form-group">
                            <label for="event-type">Season</label>
                            <select id="event-type" v-model="formDataEvent.saison_name" required>
                                <option value="été">Summer</option>
                                <option value="hiver">Winter</option>
                                <option value="printemps">Spring</option>
                                <option value="automne">Automn</option>
                              
                            </select>
                        </div>

                        

                        <div class="form-group">
                            <label for="event-type">Type</label>
                            <select id="event-type" v-model="formDataEvent.type_name" required>
                                <option  v-for="category in listCategories" key="category.id" :value="category.nom"> {{ category.nom }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="event-picture">Upload Picture</label>
                        <input type="file" @change="handleFileUpload" id="event-picture" accept="image/*">
                    </div>
                    <MapComponent @event-coords="handleEventCoords"></MapComponent>
                    
                    <div class="form-actions">
                        <button type="submit">{{ actualLang ? 'Create Event' : 'Créer Événement' }}</button>
                        <waterButton :text="actualLang ? 'Cancel' : 'Annuler'" :type="false" class="btnn" @click="pop"/>
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
    import { useAuthStore } from "@/stores/auth";
    import MapComponent from "@/components/MapComponent.vue";

    const {addEvent} = useActivityStore();
    const activitiesStore = useActivityStore();

    const authStore = useAuthStore();

    const inputRefDate = ref(null);
    const inputRefTime = ref(null);
    const result = ref(null);
    const selectedFile = ref(null)
    const errorMessage = ref(null);
    const  validationErrors  = ref(null);
    const listCategories = ref([])
  

    const formDataEvent= reactive({
            titre: "",
            date_debut: "",
            date_fin: "2025-09-30 21:00:00",
            description: "",
            statut_journee : "",
            lieu : "",
            image_data : "",
            saison_name: "",
            type_name : "",
            longitude : "",
            latitude : ""
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




const testInput = async(event) => {
    const dateValue = inputRefDate.value.value;
    const timeValue = inputRefTime.value.value;

    const formattedDateTime = formatDateApi(dateValue, timeValue);
    formDataEvent.date_debut = formattedDateTime; 

    const formData = new FormData();
    formData.append('titre', formDataEvent.titre);
    formData.append('date_debut', formDataEvent.date_debut);
    formData.append('date_fin', formDataEvent.date_fin);
    formData.append('description', formDataEvent.description);
    formData.append('statut_journee', formDataEvent.statut_journee);
    formData.append('lieu', formDataEvent.lieu);
    formData.append('saison_name', String(formDataEvent.saison_name));
    formData.append('type_name', String(formDataEvent.type_name));
    formData.append('latitude', String(formDataEvent.latitude));
    formData.append('longitude', String(formDataEvent.longitude));
    

    if (selectedFile.value) {
        formData.append('image_data', selectedFile.value);
    }

    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

        try {
            const eventUrl = await addEvent(formData);
            if (eventUrl) {
                console.log(eventUrl);

                await authStore.getUser();
                pop();
                
            }
        } catch (error) {
            errorMessage.value = error.message;
            console.error("Upload failed:", error);
        }
    };

   const handleEventCoords = (coords) => {
        console.log("Received coordinates:", coords);
        console.log("Latitude:", coords.lat);
        console.log("Longitude:", coords.lng);
        formDataEvent.latitude = coords.lat;
        formDataEvent.longitude = coords.lng;
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

     onMounted(async () => {
        listCategories.value =await activitiesStore.getCategories();
        console.log(listCategories)
     
     });



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
        //overflow: hidden; 
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

                    .glass {
                        color : black
                    }
                        
                    
                    .form-group {
                        display: flex;
                        flex-direction: column;

                       
                        
                        label {
                        text-align: left;
                        }
                
                        input {
                            transition: all 0.3s;
                            color: black;
                            border-color: black;
                        }
                            
                        select {
                          
                            background-image: url('data:image/svg+xml;utf8,<svg fill="%23333" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'); /* Custom arrow SVG */
                            background-repeat: no-repeat;
                            background-position: right 10px center;
                            padding-right: 30px;
                            color : black;
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