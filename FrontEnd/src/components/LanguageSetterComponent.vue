<template>
    <div @click="changeLang()" id="languageSetter"  class="glass drop">
        <p v-if="actualLang != true">EN</p>
        <p v-else>FR</p>
    </div>


</template>

<script setup>
  import storageManager from "@/JS/LocalStaorageManager"
  import { ref } from "vue";

  let actualLang = ref(storageManager.getLang());

  if (actualLang.value === null) {
    storageManager.setLang(true);
    actualLang.value = storageManager.getLang();
  }

  const changeLang = () => {
      console.log("new lang val = " + !actualLang.value)
      storageManager.setLang(!actualLang.value);
      actualLang.value = !actualLang.value
  }

</script>

<style lang="scss">
    #languageSetter {
        display: block;
        width: 65px;
        height: 65px;
        text-align: center;
        border-radius: 50%;
        position: fixed;
        bottom: 9%;
        right: 2%;
        z-index: 1000;
        cursor: pointer;
        background: transparent;
        border-radius: 57% 43% 37% 63% / 45% 52% 48% 52%;
        animation: anim 1s infinite alternate;

        p {
            width: 100%;
            height: 100%;
            align-content: center;
            font-size: 2rem;
            border-radius: 50%;
            align-self: center;
        }
    }

    #languageSetter:before {
        content: "";
        position: absolute;
        bottom: 9%;
        right: 2%;
        width: 10px;
        height: 10px;
        border-radius: 42% 58% 37% 63% / 40% 43% 57% 60%;
        background: #fff;
    }

    /* Visit https://democoding.in/ for more free css animation */
    #languageSetter:after {
        content: "";
        position: absolute;
        bottom: 9%;
        right: 2%;
        width: 5px;
        height: 5px;
        border-radius: 42% 58% 37% 63% / 40% 43% 57% 60%;
        background: #ffffff;
    }

    .light {
        #languageSetter {
            box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05), 15px 25px 10px rgba(0, 0, 0, 0.1),
                15px 20px 20px rgba(0, 0, 0, 0.05), inset -10px -10px 15px rgba(237, 237, 237, 0.9);

            p {
                color: var(--graphite);
            }

            p:hover {
                color: var(--graphite06);
            }
        }

        #languageSetter:before {
            background: #fff;
        }

        /* Visit https://democoding.in/ for more free css animation */
        #languageSetter:after {
            background: #ffffff;
        }
    }

    .dark {
        #languageSetter {
            box-shadow: inset 10px 10px 10px rgba(255, 255, 255, 0.05), 15px 25px 10px rgba(255, 255, 255, 0.1),
                15px 20px 20px rgba(255, 255, 255, 0.05), inset -10px -10px 15px rgba(38, 38, 38, 0.9);

            p {
                color: var(--light);       
                animation: neonGlow 0.5s ease-in-out infinite alternate;
                //color: var(--light-trans-text);
            }

            p:hover {
                color: var(--light-trans015);
            }
        }

        #languageSetter:before {
            background: var(--light-trans-text);
        }

        /* Visit https://democoding.in/ for more free css animation */
        #languageSetter:after {
            background: var(--light-trans-text);
        }
    }
    @keyframes anim {
        0% {
            transform: translateY(0);
            width: 65px;
            height: 65px;
        }

        100% {
            transform: translateY(10px);
            width: 59px;
            height: 69px;
        }
    }
</style>