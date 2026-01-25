<template>
  <div id="updateEvent" @click.self="popUpdate">
    <div class="event-update-form">
      <span class="close" @click="popUpdate">&times;</span>
      <h2>Update Event</h2>
      <form>
        <div class="form-group">
          <label for="event-name">Event Name</label>
          <input id="event-name" placeholder="Enter event name" required type="text">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="event-date">Date</label>
            <input id="event-date" required type="date">
          </div>

          <div class="form-group">
            <label for="event-time">Time</label>
            <input id="event-time" required type="time">
          </div>

          <div class="form-group">
            <label for="event-duration">Duration (hours)</label>
            <input id="event-duration" min="1" placeholder="e.g., 2" required type="number">
          </div>
        </div>

        <div class="form-group">
          <label for="event-location">Location</label>
          <input id="event-location" placeholder="Enter location" required type="text">
        </div>

        <div class="form-group">
          <label for="event-picture">Upload Picture</label>
          <input id="event-picture" accept="image/*" type="file">
        </div>

        <div class="form-group">
          <label for="event-hosts">Co-hosts</label>
          <input id="event-hosts" placeholder="Add other hosts (comma-separated)" type="text">
          <div class="form-group_images">
            <!-- <img :src="imgUrl"> <img :src="imgUrl" alt=""> <img :src="imgUrl"> -->
          </div>
        </div>

        <div class="form-actions">
          <waterButton class="btnn" :text="actualLang ? 'Update' : 'Mettre a jour'" :type="true" />
          <waterButton class="btnn" :text="actualLang ? 'Cancel' : 'Annuler'" :type="false"  @click="popUpdate" />
        </div>
      </form>
    </div>
  </div>

</template>
<script setup>
  import { defineEmits, defineProps } from 'vue'
  import LocalStorageManager from '@/JS/LocalStorageManager'

  import Setup from '@/JS/Setup'
  import waterButton from '../../../StaticComponents/WaterButtonComponent.vue'

  const props = defineProps({
    user: Object,
  })

  // Définir les événements émis par ce composant
  const emit = defineEmits(['popUpdate'])

  // Fonction pour émettre l'événement "popUpdate"
  const popUpdate = () => {
    // eslint-disable-next-line vue/custom-event-name-casing
    emit('popUpdate')
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
            z-index: 1000;
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
                margin: 4.5rem auto 0rem auto;
                padding: 1.5rem;
                height: 88%;
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
