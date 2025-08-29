<template>
  <div id="myModal" class="modal" style="display:none" @click.self="pop">
    <!-- Modal content -->
    <!-- <div class="modal-content" @click.self="pop">
      <div class="event-create-form">
        <span class="close" @click="pop">&times;</span>
        <h2>Create Event</h2>
        <form @submit.prevent="testInput">
          <div class="form-group">
            <label for="event-name">Event Name</label>
            <input id="event-name" v-model="formDataEvent.titre" placeholder="Enter event name" type="text" required>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="event-date">Date</label>
              <input id="event-date" ref="inputRefDate"  required type="date">
            </div>

            <div class="form-group">
              <label for="event-time">Time</label>
              <input id="event-time" ref="inputRefTime"  required type="time">
            </div>

            <div class="form-group">
              <label for="event-duration">Duration (hours)</label>
              <input id="event-duration" placeholder="e.g., 2" min="1" type="number" required>
            </div>
          </div>

          <div class="form-group">
            <label for="event-location">Location</label>
            <input id="event-location"  v-model="formDataEvent.lieu" placeholder="Enter location" type="text" required>
          </div>

          <div class="form-group">
            <label for="event-location">Description</label>
            <input id="event-description"  v-model="formDataEvent.description" placeholder="Enter description" type="text" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="event-location">statut_journee</label>
              <input id="event-description"  v-model="formDataEvent.statut_journee" placeholder="Enter description" type="text" required>
            </div>

            <select id="cars" name="cars">
              <option value="volvo">Volvo</option>

            </select>
          </div>

          <div class="form-group">
            <label for="event-picture">Upload Picture</label>
            <input id="event-picture"  accept="image/*" type="file">
          </div>

          <div class="form-group">
            <label for="event-hosts">Co-hosts</label>
            <input id="event-hosts" v-model="formDataEvent.saison_id" placeholder="Add other hosts (comma-separated)" type="text">
            <div class="form-group_images">
            </div>
          </div>

          <div class="form-actions">
            <button  type="submit"  >{{actualLang ? 'Sign Up' : 'S\'inscrire'}}</button>
            <waterButton class="btnn" :text="actualLang ? 'Create' : 'Creer'" :type="true"/>
            <waterButton class="btnn" :text="actualLang ? 'Cancel' : 'Annuler'" :type="false"  @click="pop"/>
          </div>
        </form>
      </div>
    </div> -->
  </div>

</template>
<script setup>
  import LocalStorageManager from '@/JS/LocalStorageManager'
  import Setup from '@/JS/Setup'

  import { ref, onMounted, onUnmounted, defineProps, defineEmits, reactive } from 'vue'
  import waterButton from '../../../StaticComponents/WaterButtonComponent.vue'
//   import { useActivityStore } from "@/stores/activity";
//   import { formatDateApi } from "@/JS/GlobalFunctions";

//   const {addEvent} = useActivityStore();

//   const inputRefDate = ref(null);
//   const inputRefTime = ref(null);
//   const result = ref(null);

//   const formDataEvent= reactive({
//     titre: "",
//     date: "",
//     description: "",
//     statut_journee : "",
//     lieu : "",
//     image_data : "",

//     saison_id
//       : null
//   })

//   const testInput  =  async() => {
//     const dateValue = inputRefDate.value.value;
//     const timeValue = inputRefTime.value.value;

//     const formattedDateTime = formatDateApi(dateValue, timeValue);
//     formDataEvent.date = formattedDateTime;
//     console.log(formDataEvent);
//     const test = await addEvent(formDataEvent);
//     console.log(test);


//   };

  const props = defineProps({
    user: Object
  })

  // Définir les événements émis par ce composant
  const emit = defineEmits(['pop'])

  // Fonction pour émettre l'événement "pop"
  const pop = () => {
    emit('pop')
  };

  let actualLang = Setup.languageSetup()
  let isLogged = Setup.loginSetup()

  const Logout = () => {
    isLogged.value = LocalStorageManager.logout()
  };

  if (isLogged.value === null) {
    Logout()
  }
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