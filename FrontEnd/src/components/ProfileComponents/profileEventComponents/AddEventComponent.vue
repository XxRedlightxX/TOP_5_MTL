<template>
    <div id="myModal" class="modal" style="display:none" @click.self="pop">
        <!-- Modal content -->
        <div class="modal-content" @click.self="pop">
            <div class="event-create-form">
                <span class="close" @click="pop" >&times;</span>
                <h2>Create Event</h2>
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
                            <img src="../../assets/bob.jpg"> <img src="../../assets/bob.jpg" alt=""> <img src="../../assets/bob.jpg"> <img src="../../assets/bob.jpg" alt="">
                        </div>
                    </div>
                
                    <div class="form-actions">
                        <button type="submit" class="btn-submit">Create Event</button>
                        <button type="reset" class="btn-cancel" @click="pop" >Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>
<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted, defineProps, defineEmits } from "vue";

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
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: hidden; 
        z-index: 100000; 
        background-color: rgb(0,0,0); 
        background-color: rgba(0,0,0,0.4); 

        .modal-content {
            background-color: transparent;
            margin: 0.2% auto;
            padding: 20px;
            width: 80%;
            height: 100%;
            box-sizing: content-box;
            position: relative;

            .event-create-form {
                width: 50%;
                margin: 1rem auto;
                padding: 1.5rem;
                background-color: #f9f9f9;
                border-radius: 8px;
                height: 87%;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            
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
                .form-group {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 1rem;
            
                    label {
                    font-size: 1rem;
                    color: #555;
                    margin-bottom: 0.5rem;
                    text-align: left;
                    }
            
                    input {
                    font-size: 1rem;
                    padding: 0.7rem;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    transition: all 0.3s;
                    color: #555;
                    

                    #event-date {
                        
                    }
            
                    &:focus {
                        border-color: #5a9;
                        box-shadow: 0 0 5px rgba(90, 154, 153, 0.5);
                        outline: none;
                    }
                    }

                    &_images {
                        display: flex;
                        padding-top: 2%;
                        gap: 0.5em;
                    img {
                        width: 40px;
                        border-radius: 50%;

                    }
                    }
                }
            
                .form-row {
                    display: flex;
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
                    display: flex;
                    justify-content: space-between;
                    margin-top: 1.5rem;
            
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
    }

    // .body {
    //     flex: 1;
    //     margin-top: 1%;
    //     padding: 0% 1% 0% 0%;
        
    //     max-height: 500px;
    //     overflow: auto;
    //     scrollbar-width: thin;

    //     #profileSingleEventComponent {
    //         margin-bottom: 2%;
    //     }
    // }
    
</style>