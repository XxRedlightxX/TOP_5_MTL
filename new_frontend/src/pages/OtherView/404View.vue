<template>
  <div id="view404">
    <div class="main">
      <LogoComponent class="logoIcon" :size="3" :text="404" />
      <p>{{ !actualLang ? 'Page not found' : 'Page invalide' }}</p>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, onUnmounted, ref, watch } from 'vue';
  import LogoComponent from '@/components/LogoComponent/LogoComponent.vue';
  import Setup from '@/JS/Setup';

  let actualLang = Setup.languageSetup();
  let actualMode = Setup.modeSetup();

  const width = ref(window.innerWidth);
  const mainWidth = ref(null);

  const calculateWidth = () => {
    mainWidth.value = width.value > 1025 ? (width.value * 0.75) / 2 : width.value * 0.9;
  }
  const setIconPosition = () => {
    calculateWidth();
    let tailleIcon = width.value > 1025 ? 197 : 178;

    let left = (mainWidth.value / 2) - tailleIcon;
    let leftPercentage = left > 0 ? (left * 100) / mainWidth.value : 0;

    console.log('taille icon = ' + tailleIcon);
    console.log('width value = ' + mainWidth.value + ' left value = ' + left);
    console.log('left % = ' + leftPercentage);

    // ✅ on ajoute l'unité %
    document.querySelector('.logoIcon').style.left = leftPercentage + '%';
  };

  // Fonction pour mettre à jour les dimensions de la fenêtre
  function updateDimensions() {
    width.value = window.innerWidth;
    setIconPosition();
  }

  // Écouteur pour surveiller les changements de largeur
  watch(width, (newVal) => {
    console.log('new dimension :', newVal);
    updateDimensions()
  });

  // Add event listener for mode changes
  onMounted(() => {
    setIconPosition();
    window.addEventListener('resize', updateDimensions);
  });

  // Remove event listener when component is unmounted
  onUnmounted(() => {
    window.removeEventListener('resize', updateDimensions);
  });
</script>

<style lang="scss">
#view404 {
    margin: auto;

    .main {
        position: relative;
        p {
            font-weight: bold;
        }
    }
}
@media screen and (min-width: 1025.1px) {
  #view404 {
      width: 75%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      .main {
          width: 50%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          margin: auto;
          .logoIcon {
              top: 10%;
          }
          p {
              margin-top: 10%;
              font-size: 2rem;
          }
      }
  }
}
@media screen and (max-width: 1025px) {
  #view404 {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      //border: 2px solid red;

      .main {
          width: 90%;
          height: 75%;
          //border: 2px solid red;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          margin: 0% auto;
          .logoIcon {
              top: 10%;
          }
          p {
              margin-top: 10%;
              font-size: 2rem;
          }
      }
  }
}
.light {
    #view404 {
        .main {
            p {
                color: var(--graphite06);
            }
        }
    }
}
.dark {
    #view404 {
        .main {
            p {
                color: var(--light05);
                animation: neonGlowLess 0.5s ease-in-out infinite alternate; 
            }
        }
    }
}

</style>
