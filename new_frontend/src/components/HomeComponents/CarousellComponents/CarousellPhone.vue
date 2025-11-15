<template>
  <div v-if="newEvent.length > 0 && eventInfo != null" id="carousellPhoneComponent">
    <CarouselSwipper :events="newEvent" @phone-event-swiped="changeInfos" />

    <div class="reste">
      <div class="carousellPhoneSwipperInfos">
        <h3 :class="eventInfo.id == -1 ? 'fakeTitle' : ''">{{ eventInfo.title }}</h3>
        <p :class="eventInfo.id == -1 ? 'fakeDesc' : ''">{{ eventInfo.desc }}</p>
      </div>
      <div class="carousellPhoneSwipperBtn">
        <router-link class="button" to="/Event" @click="setEvent()"> {{ actualLang ? "See the event" : "Voir l'evenement" }}</router-link>
        <router-link class="button" to="/Event Organisator" @click="setEvent()">{{ actualLang ? "Organisator" : "Découvrir les Organisateurs" }}</router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { defineProps, onMounted, ref, watch } from 'vue'
  import Setup from '@/JS/Setup'
  import FakeDataBase from '@/JS/ToBeDeleted/FakeDataBase'
  import CarouselSwipper from './CarousellPhoneSwipper.vue'

  let actualMode = Setup.modeSetup()
  let actualLang = Setup.languageSetup()
  const props = defineProps({
    events: {
      type: Array,
      default: () => [],
    },
  })

  let newEvent = ref([])

  let i = ref(0)
  const eventInfo = ref(null)

  // Méthode appelée quand le slide change
  const changeInfos = currentIndex => {
    // ✅ Utiliser l’index envoyé par le carrousel
    i.value = currentIndex

    // ✅ Mettre à jour l'événement affiché
    eventInfo.value = newEvent.value[i.value]
    //console.log('infooo :', eventInfo)
  }

  const setEvent = () => {
    LocalStorageManager.setEvent(eventInfo.value)
  }

  onMounted(() => {
    newEvent.value = props.events
    eventInfo.value = newEvent.value[0]
  })
</script>

<style lang="scss">
  #carousellPhoneComponent {
    //border: 2px solid rgb(251, 255, 0);
    //height: 93svh;
    height: 855px;
    width: 100%;
    padding-top: 65px;
    //border: 3px solid rgb(11, 66, 232);
    #carousellPhoneSwiper {
        height: 40%;
        z-index: 1000;
    }
    .reste {
        //border: 2px solid rgb(0, 0, 0);
        //border: 3px solid red;
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .carousellPhoneSwipperInfos{
            //border: 2px solid rgb(193, 24, 156);
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            width: 96%;
            margin: 3% auto 0% auto;
            h3 {
                font-size: 3rem;
                text-align: center;
            }
            p {
                font-size: 1.2rem;
            }

        }
        .carousellPhoneSwipperBtn {
            //border: 2px solid rgb(39, 85, 191);
            display: flex;
            flex-direction: column;
            width: 96%;
            margin: 2% auto 3% auto;

            .button {
                //border: 2px solid red;
                width: 100%;
                margin: 2% auto;
                font-size: 1.5rem;
                padding: 10px 0%;
                text-align: center;
                text-decoration: none;
            }
        }
    }

  }
  .light {
    #carousellPhoneComponent {
        //background-color: rgba(29, 30, 24, 0.118);
        //background: linear-gradient(to bottom, #efefef, #ccc);
        background: linear-gradient(to bottom, #ccc, #efefef);
        .reste {
            .carousellPhoneSwipperInfos{
              h3 {
                  color: var(--graphite);
              }
              p {
                  color: var(--graphite06);
              }
              .fakeTitle {
                padding-top: 25%;
                  color: rgba(255, 255, 255, 0);
                  text-decoration: overline;
                  text-decoration-color: var(--graphite015);
                  text-decoration-thickness: 1em;
                  text-decoration-skip-ink: none;
              }
              .fakeDesc {
                color: rgba(255, 255, 255, 0);
                text-decoration: overline;
                text-decoration-color: var(--graphite015);
                text-decoration-thickness: 1em;
                text-decoration-skip-ink: none;
              }

            }
            .carousellPhoneSwipperBtn {

               .button {
                    color: var(--graphite);

                    background-color: rgba(114, 114, 114, 0);
                    border: 2px solid rgb(255, 255, 255);
                }
                .button:hover, .button:active {
                    color: var(--graphite06);
                    background-color: rgba(114, 114, 114, 0);
                    border: 2px solid rgb(255, 255, 255);
                }
            }
        }

    }
  }
  .dark {
    #carousellPhoneComponent {
        //background-color: rgb(29, 30, 24);
        //background: linear-gradient(to bottom, #ccc, rgb(29, 30, 24));
        background: linear-gradient(to bottom, rgb(29, 30, 24), #cbcbcb);

        .reste {
            .carousellPhoneSwipperInfos{
              h3 {
                  color: var(--light-text);
              }
              p {
                  color: var(--light-trans-2Shine);
              }
              .fakeTitle {
                padding-top: 25%;
                  color: rgba(255, 255, 255, 0);
                  text-decoration: overline;
                  text-decoration-color: var(--light07);
                  text-decoration-thickness: 1em;
                  text-decoration-skip-ink: none;
              }
              .fakeDesc {
                color: rgba(255, 255, 255, 0);
                text-decoration: overline;
                text-decoration-color: var(--light07);
                text-decoration-thickness: 1em;
                text-decoration-skip-ink: none;
              }

            }
            .carousellPhoneSwipperBtn {

                .button {
                    color: var(--light-text);

                    background-color: rgba(114, 114, 114, 0);
                    border: 2px solid rgb(255, 255, 255);
                }
                .button:hover, .button:active {
                    color: var(--light-trans-text);

                    background-color: rgba(114, 114, 114, 0);
                    border: 2px solid rgb(255, 255, 255);
                }
            }
        }

    }
  }
</style>
