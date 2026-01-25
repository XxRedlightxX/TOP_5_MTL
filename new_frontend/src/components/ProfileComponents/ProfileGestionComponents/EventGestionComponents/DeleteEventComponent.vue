<template>
  <div id="deleteEvent" @click.self="popDelete()">
    <div class="event-update-form">
      <span class="close" @click="popDelete()">&times;</span>
      <form>
        <h3> Etes-vous sur de vouloir supprimer cet event ?</h3>
        <div class="form-actions">
          <waterButton class="btnn" :text="actualLang ? 'Yes' : 'Oui'" :type="true" />
          <waterButton class="btnn" :text="actualLang ? 'No' : 'Non'" :type="false" @click="popDelete" />
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
  const emit = defineEmits(['popDelete'])

  // Fonction pour émettre l'événement "popDelete"
  const popDelete = () => {
    // eslint-disable-next-line vue/custom-event-name-casing
    emit('popDelete')
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
    #deleteEvent {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 500;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;

        .event-update-form {
            align-self: center;
            border-radius: 16px;
            backdrop-filter: blur(7px);
            -webkit-backdrop-filter: blur(7px);
            scrollbar-width: thin;
            z-index: 1000;

            h3 {
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
                margin-top: 7%;

                .form-actions {
                    display: flex;
                    justify-content: center;

                    .btnn {
                        width: 40%;
                    }

                }
            }
        }
    }
    .light {
        #deleteEvent {
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0,0.4);

            .event-update-form {
                background-color: var(--light05);
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

                h3 {
                    color: var(--graphite);
                }
                .close {
                    color: var(--graphite);

                    &:hover,
                    &:focus {
                        color: var(--graphite015);
                    }
                }
            }
        }
    }
    .dark {
        #deleteEvent {
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0,0.4);

            .event-update-form {
                background-color: var(--light05);
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

                h3 {
                    color: var(--light);
                }
                .close {
                    color: var(--light);

                    &:hover,
                    &:focus {
                        color: var(--light-text);
                    }
                }
            }
        }
    }
    @media screen and (min-width: 1025.1px) {
        #deleteEvent {
            .event-update-form {
                width: 40%;
                padding: 1.5rem;
                border-radius: 8px;
                //height: 87%;

                h3 {
                    margin-bottom: 1rem;
                    font-size: 1.8rem;
                }
                .close {
                    font-size: 28px;
                }
                form {
                    margin-top: 7%;

                    .form-actions {
                        gap: 25%;
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
        #deleteEvent {
            .event-update-form {
                width: 90%;
                padding: 1.5rem;
                border-radius: 8px;
                //height: 87%;

                h3 {
                    margin-bottom: 1rem;
                    font-size: 1.5rem;
                }
                .close {
                    font-size: 28px;
                }
                form {
                    margin-top: 7%;

                    .form-actions {
                        gap: 25%;
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
