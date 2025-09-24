<template>
    <div id="updateEvent" @click.self="popUpdate">
        <div class="event-update-form">
            <span class="close" @click="popUpdate">&times;</span>
            
            
            <form  @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="event-name">Event Name</label>
                    <input type="text" id="event-name" v-model="formDataEvent.titre" placeholder="Enter event name" required>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="event-date">Date</label>
                        <input type="date" id="event-date" ref="inputRefDate" >
                    </div>

                    <div class="form-group">
                        <label for="event-time">Time</label>
                        <input type="time" id="event-time" ref="inputRefTime" >
                    </div>

                    <div class="form-group">
                        <label for="event-duration">Duration (hours)</label>
                        <input type="number" id="event-duration"   placeholder="e.g., 2" min="1" >
                    </div>
                </div>

                <div class="form-group">
                    <label for="event-location">Location</label>
                    <input type="text" id="event-location"  v-model="formDataEvent.lieu"placeholder="Enter location" >
                </div>

                <div class="form-group">
                    <label for="event-picture">Upload Picture</label>
                    <input type="file" id="event-picture"  ref="inputRefImage" @change="handleFileUpload" accept="image/*">
                </div>

                <div class="form-group">
                    <label for="event-hosts">Co-hosts</label>
                    <input type="text" id="event-hosts" placeholder="Add other hosts (comma-separated)">
                    <div class="form-group_images">
                        <!-- <img :src="imgUrl"> <img :src="imgUrl" alt=""> <img :src="imgUrl"> -->
                    </div>
                </div>
          
                <div class="form-actions">
                    <waterButton  :text="actualLang ? 'Update' : 'Mettre a jour'" :type="true" class="btnn"/>
                    <waterButton :text="actualLang ? 'Cancel' : 'Annuler'" :type="false" class="btnn"  @click="popUpdate"/>
                </div>

                <button class="primary-btn">Update</button>
            </form>
        </div>
    </div>

</template>
<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted, defineProps,watch, defineEmits,reactive } from "vue";
    import waterButton from "@/components/WaterButtonComponent.vue";
    import { useActivityStore } from "@/stores/activity";
    import { storeToRefs } from "pinia";
    import { formatDateApi } from "@/JS/GlobalFunctions";
    import { useAuthStore } from '@/stores/auth';
    
    
    const { user } = storeToRefs(useActivityStore());

    let actualLang = ref(storageManager.getLang());
    let isLogged = ref(storageManager.getLogin());
    let activity = ref(null);

    const selectedFile = ref(null);

    const inputRefDate = ref(null);
    const inputRefTime = ref(null);
    const inputRefImage = ref(null);
    const errorMessage = ref(null);
    const  validationErrors  = ref(null);
    
    const authStore = useAuthStore();
    const {getActivityById, updateEvent } = useActivityStore();

    const formDataEvent= reactive({
            titre: "",
            date_debut: "",
            lieu : "",
            image_data : "",
    });


    const props = defineProps({
        user: Object,
        eventId : Number
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



    
    watch(() => props.eventId, async (newEventId) => {
        if (!newEventId) return;
        
        try {
            activity.value = await getActivityById(newEventId);
           

            if(activity.value) {
              formDataEvent.titre = activity.value.titre;

           
            
                
            } 
        
        } catch (error) {
            console.error("Error loading activity:", error);
        }
    }, { immediate: true });

    /*async () => {
        activity.value = await getActivityById(props.eventId);
        console.log(activity.value);
    }*/


        const handleSubmit = async () => {
             const dateValue = inputRefDate.value?.value;
            const timeValue = inputRefTime.value?.value;
            
                if (!activity.value  || !activity.value.id)  {
                    console.error("Activity not loaded.");
                    return;
                }
                 const formData = new FormData();
                const formattedDate = formatDateApi(dateValue, timeValue);
               

                formData.append("titre", formDataEvent.titre);
                formData.append("lieu", formDataEvent.lieu);
                formData.append("date_debut", formattedDate);
                
                const imageFile = inputRefImage.value?.files[0];
                if (imageFile) {
                    formData.append("image_data", imageFile); 
                }
                
               
                for (let [key, value] of formData.entries()) {
                    console.log(key, value);
               }
            
                try {
                    const updated= await updateEvent(activity.value,  formData);
                       console.log("Updated activity:", updated);

                        if (updated) {
                        // Replace old activity with fresh one
                        activity.value = updated;
                        console.log(updated)
                        }
                } catch (error) {
                    errorMessage.value = error.message;
                    console.error("Upload failed:", error);
                }
                
            
        };
    
    

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