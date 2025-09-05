<template>
  <div id="filterPopUp" @click.self="popClosee()">
    <div class="event-update-form">
      <form>
        <h2>{{ actualLang ? "Filter" : "Filtre" }}</h2>
        <div v-show="small">
          <ul>
            <li @click="changeEventType(0)"  :class="{ active: eventType === 0 }"><a>{{ actualLang ? "All" : "Tous"}}</a></li>
            <li @click="changeEventType(1)" :class="{ active: eventType === 1 }"><a>{{ actualLang ? "Night Life" : "De nuit"}}</a></li>
            <li @click="changeEventType(2)" :class="{ active: eventType === 2 }"><a>{{ actualLang ? "Day life" : "De Jour"}}</a></li>
          </ul>
        </div>
      </form>
    </div>
  </div>

</template>
<script setup>
  import Setup from "@/JS/Setup";
  import LocalStorageManager from "@/JS/LocalStorageManager";
  import { ref, onMounted, onUnmounted, defineProps, defineEmits, watch } from "vue";

  // let trans = ref(null);
  let actualLang = Setup.languageSetup();
  let actualMode = Setup.modeSetup();
  let small = ref(false);
  const eventType = ref(0);

  const emit = defineEmits(['popClosee']);

  // Fonction pour émettre l'événement "popClosee"
  const popClosee = () => {
    // trans.value = false
    emit('popClosee');
  };

  const props = defineProps({
    toShow: Boolean
  });

  if (actualMode.value == false) {
    eventType.value = 1;
  }

  const checkMobileSize = () => {
    const width = window.innerWidth;
    small.value = width < 600 ? true : false;
  };

  const changeEventType = (index) => {
    eventType.value = index;
    if (index == 1) {
      LocalStorageManager.changeMode(false);
      // actualMode.value = false;
    } else if (index == 2) {
      LocalStorageManager.changeMode(true);
      // actualMode.value = true;
    }
  };

  watch(actualMode, (newVal, oldVal) => {
    eventType.value = newVal == false ? 1 : 2;
  });
  // Add event listener for mode changes
  onMounted(() => {
    checkMobileSize(); // Appel initial
    window.addEventListener('resize', checkMobileSize); // Rendre réactif
  });

  // Remove event listener when component is unmounted
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobileSize);
  });
</script>

<style lang="scss">
    #filterPopUp {
        position: fixed;
        overflow: hidden;
        z-index: 100000;
        background-color: rgba(0,0,0,0.6);
        backdrop-filter: blur(4.7px);
        -webkit-backdrop-filter: blur(4.7px);
        //background-color: #8989893e;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;

        .event-update-form {
            display: block;
            //padding: 1.5rem;
            background-color: var(--light05);
            border-radius: 42% 58% 37% 63% / 40% 43% 57% 60%;

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
                h2 {
                    text-align: center;
                    margin-bottom: 1rem;
                    color: #333;
                    font-size: 1.8rem;
                }
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
                div {
                    ul {
                        display: flex;
                        align-items: center;
                        list-style-type: none;
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        //border: 2px solid red;
                        justify-content: center;
                        li {
                            padding: 5px;
                            height: 100%;
                            //border: 2px solid red;

                            a {
                            font-family:'Times New Roman', Times, serif;
                            font-size: 1.4em;
                            transition: 0.3s;
                            padding: 10px;
                            }

                            a:hover {
                            border-radius: 57% 43% 37% 63% / 45% 52% 48% 52%;
                            transition: 0.4s;
                            cursor: pointer;
                            }
                        }
                        .active a {
                            border-radius: 57% 43% 37% 63% / 45% 52% 48% 52%;
                            font-size: 1.6em;
                            padding: 10px;
                        }
                    }
                }
            }
        }
    }
    .light {
        #filterPopUp {
            background-color: rgba(0,0,0,0.6);

            .event-update-form {
                background-color: var(--light05);

                .close {
                    color: #aaa;

                    &:hover,
                    &:focus {
                        color: black;
                    }
                }
                form {
                    h2 {
                        color: #333;
                    }
                    div {
                        ul {
                            li {

                                a {
                                    color: var(--graphite);
                                }

                                a:hover {
                                    border-radius: 57% 43% 37% 63% / 45% 52% 48% 52%;
                                    background: transparent;
                                    box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05), 15px 25px 10px rgba(0, 0, 0, 0.1),
                                                15px 20px 20px rgba(0, 0, 0, 0.05), inset -10px -10px 15px rgba(237, 237, 237, 0.9);
                                    color: var(--graphite06);
                                }
                            }
                            .active a {
                                background: transparent;
                                box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05), 15px 25px 10px rgba(0, 0, 0, 0.1),
                                            15px 20px 20px rgba(0, 0, 0, 0.05), inset -10px -10px 15px rgba(237, 237, 237, 0.9);
                                color: var(--graphite06);
                            }
                        }
                    }
                }
            }
        }
    }
    .dark {
        #filterPopUp {
            background-color: rgba(0,0,0,0.6);

            .event-update-form {
                background-color: var(--light05);

                .close {
                    color: #aaa;

                    &:hover,
                    &:focus {
                        color: black;
                    }
                }
                form {
                    h2 {
                        color: #333;
                    }
                    div {
                        ul {
                            li {

                                a {
                                    color: var(--light-trans-text);
                                }

                                a:hover {
                                    border-radius: 57% 43% 37% 63% / 45% 52% 48% 52%;
                                    background: transparent;
                                    box-shadow: 5px 5px 10px #0008,
                                    10px 6px 15px #0008 inset,
                                    -5px -5px 8px #f5f5ff inset,
                                    10px 6px 15px #0004 inset;
                                    color: var(--light);
                                    animation: neonGlow 0.5s ease-in-out infinite alternate;
                                }
                            }
                            .active a {
                                background: transparent;

                                box-shadow: 5px 5px 10px #0008,
                                10px 6px 15px #0008 inset,
                                -5px -5px 8px #f5f5ff inset,
                                10px 6px 15px #0004 inset;
                                color : var(--light);
                                animation: neonGlow 0.5s ease-in-out infinite alternate;
                            }
                        }
                    }
                }
            }
        }
    }
    @media screen and (min-width: 1025.1px){
        #filterPopUp {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            .event-update-form {
                width: 50%;
                height: 60%;
                align-self: center;
            }
        }
    }
    @media screen and (max-width: 1025px){
        #filterPopUp {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            .event-update-form {
                width: 90%;
                height: 80%;
                align-self: center;
            }
        }
    }
    @media screen and (max-width: 600px){

    }
</style>