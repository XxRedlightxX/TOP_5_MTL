<template>
    <div id="carousellPhoneComponent">
        <CarouselSwipper :events="newEvent" @phoneEventSwiped="changeInfos"/>

        <div class="reste">
            <div class="carousellPhoneSwipperInfos">
                <h3>{{ eventInfo.title }}</h3>
                <p>{{ eventInfo.desc }}</p>
            </div>
            <div class="carousellPhoneSwipperBtn">
                <button>learn more</button>
                <button>Organisator</button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import CarouselSwipper from "./CarousellPhoneSwipper.vue";
    import LocalStorageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted, watch } from 'vue';

    const actualMode = ref(LocalStorageManager.getMode());

    if (actualMode.value == null){
        LocalStorageManager.setMode(true);
        actualMode.value = LocalStorageManager.getMode();
    }

    const handleModeChange = (event) => {
        actualMode.value = JSON.parse(event.detail.storage);
    };
      // Add event listener for mode changes
    onMounted(() => {
        window.addEventListener('mode-changed', handleModeChange);
    });

    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('mode-changed', handleModeChange);
    });
    
    const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";
    const newEventJours = [
    { image: "https://picsum.photos/1894/799", title: "Mont-Royal", desc: text, rating: 3 },
    { image: "https://picsum.photos/1894/780", title: "Vieux-Port", desc: text, rating: 5 },
    { image: "https://picsum.photos/1894/792", title: "Laronde", desc: text, rating: 1 },
    { image: "https://picsum.photos/1894/804", title: "Jardin Botanique", desc: text, rating: 2.5 }
  ];

  const newEventNuit = [
    {image : "https://picsum.photos/1894/794", title: "Bateau Mouche de nuit", desc: text, rating: 4 },
    {image : "https://picsum.photos/1894/802", title: "Pont Jacque Cartier", desc: text, rating: 1 },
    {image : "https://picsum.photos/1894/801", title: "La Voute", desc: text, rating: 3.5 },
    {image : "https://picsum.photos/1894/780", title: "Casino", desc: text, rating: 2 }
  ];

  let newEvent = ref(null);
  newEvent.value = actualMode.value ? newEventJours : newEventNuit;
  let i = ref(0);
  const eventInfo = ref(newEvent.value[i.value]);

  // Correction du watcher
  watch(actualMode, (newVal, oldVal) => {
    newEvent.value = newVal ? newEventJours : newEventNuit;
  });

    const changeInfos = () => {
    if (i.value === newEvent.value.length - 1) {
        i.value = 0;
    } else {
        i.value++;
    }
    eventInfo.value = newEvent.value[i.value];
    };

</script>
<style lang="scss">
  #carousellPhoneComponent {
    //border: 2px solid rgb(251, 255, 0);
    height: 93svh;
    width: 100%;
    padding-top: 65px;
    #carousellPhoneSwiper {
        height: 40%;
    }
    .reste {
        //border: 2px solid rgb(0, 0, 0);
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

            button {
                //border: 2px solid red;
                width: 100%;
                margin: 2% auto;
                font-size: 1.5rem;
                padding: 10px 0%;
            }
        }
    }

  }
  .light {
    #carousellPhoneComponent {
        //background-color: rgba(29, 30, 24, 0.118);
        background: linear-gradient(to bottom, #efefef, #ccc);
        .reste {
            .carousellPhoneSwipperInfos{
                h3 {
                    color: var(--graphite);
                }
                p {
                    color: var(--graphite06);
                }

            }
            .carousellPhoneSwipperBtn {

                button {
                    color: var(--graphite);

                    background-color: rgba(114, 114, 114, 0);
                    border: 2px solid rgb(255, 255, 255);
                }
                button:hover, button:active {
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
        background: linear-gradient(to bottom, #ccc, rgb(29, 30, 24));

        .reste {
            .carousellPhoneSwipperInfos{
                h3 {
                    color: var(--light-text);
                }
                p {
                    color: var(--light-trans-2Shine);
                }

            }
            .carousellPhoneSwipperBtn {

                button {
                    color: var(--light-text);

                    background-color: rgba(114, 114, 114, 0);
                    border: 2px solid rgb(255, 255, 255);
                }
                button:hover, button:active {
                    color: var(--light-trans-text);

                    background-color: rgba(114, 114, 114, 0);
                    border: 2px solid rgb(255, 255, 255);
                }
            }
        }

    }
  }
  @media screen and (max-width: 1025px){
        #carousellPhoneComponent {
            display: block;
        }
    }
    @media screen and (min-width: 1026px){
        #carousellPhoneComponent {
            display: none;
        }
    }
</style>