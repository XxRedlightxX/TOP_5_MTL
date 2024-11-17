<template>
    <div id="filterrComponent">
 
        <div class="button-container">
            <ul >
                <li @click="changeEventType(0)"  :class="{ active: eventType === 0 }"><a>{{ actualLang ? "All" : "Tous"}}</a></li>
                <li @click="changeEventType(1)" :class="{ active: eventType === 1 }"><a>{{ actualLang ? "Night Life" : "De Jour"}}</a></li>
                <li @click="changeEventType(2)" :class="{ active: eventType === 2 }"><a>{{ actualLang ? "Day life" : "De nuit"}}</a></li>
                
                
                <li class="button-wrapper">
                <button @click="toggleCalendarPopup">
                    <v-icon icon="mdi-filter-variant " :class="['icon', {'justGlow' : !actualMode}]"/>
                    {{ actualLang ? "Filter" : "Filtrer"}}
                </button>
                </li>
            </ul>
        </div>

        <FilterPopUpComponent :show="showCalendarPopup"/>

   </div>
 </template>
 
 <script setup >
 
 import { onMounted, ref, watch, onUnmounted } from 'vue'; 
 import LocalStorageManager from "@/JS/LocalStaorageManager"
 import FilterPopUpComponent from './FilterPopUpComponent.vue';
 
   const showCalendarPopup = ref(false);
   //const calendarInput = ref(null);
 
   const actualMode = ref(LocalStorageManager.getMode());
   let actualLang = ref(LocalStorageManager.getLang());
   const eventType = ref(0);

   const toggleCalendarPopup = () => {
     showCalendarPopup.value = !showCalendarPopup.value;
     console.log(showCalendarPopup)
   };
 
   const closePopup = () => {
     showCalendarPopup.value = false
   } 
 
   const changeEventType = (index) => {
     eventType.value = index;
     if(index == 1){
       LocalStorageManager.setMode(false);
       actualMode.value = false;
     }
     else if (index ==2 || index == 0){
       LocalStorageManager.setMode(true);
       actualMode.value = true;
     }
   };
 
   if (actualLang.value === null) {
        LocalStorageManager.setLang(true);
        actualLang.value = LocalStorageManager.getLang();
    }
   if (actualMode.value == null){
       LocalStorageManager.setMode(true);
       actualMode.value = LocalStorageManager.getMode();

       if(actualMode.value == false){
        eventType.value = 1;
       }
   }
   // Correction du watcher
   watch(actualMode, (newVal, oldVal) => {
     if(newVal == false){
        eventType.value = 1;
     }
    else{
        eventType.value = 0;
    }
   });
   
    // Function to handle mode change event
    const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };
   const handleModeChange = (event) => {
       actualMode.value = JSON.parse(event.detail.storage);
   };

     // Add event listener for mode changes
   onMounted(() => {
       window.addEventListener('mode-changed', handleModeChange);
       window.addEventListener('lang-changed', handleLangChange);
   });
 
   // Remove event listener when component is unmounted
   onUnmounted(() => {
       window.removeEventListener('mode-changed', handleModeChange);
       window.removeEventListener('lang-changed', handleLangChange);
   });
 </script>
 
<style lang="scss">
#AllEventComponent {
  .button-container {
    margin: 1% 0%;

    ul {
      display: flex;
      align-items: center;
      list-style-type: none;
      margin: 0;
      padding: 0;
      width: 100%;
  
      li {
        padding: 10px;
        height: 100%;

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

        &.button-wrapper {
          margin-left: auto;

          button {
            padding: 8px 12px;
            float: right;
            font-size: 1.2rem;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            overflow: hidden;
            border-radius: 57% 43% 37% 63% / 45% 52% 48% 52%;
          
            .icon {
              font-size: 2rem;
            }
          }
          button:hover {
            border-radius: 45% 55% 49% 51% / 61% 19% 81% 39%;
          }
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

.light {
  #AllEventComponent {
    .button-container {
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
            color: var(--light);
          }
  
          &.button-wrapper {
  
            button {
              color: var(--graphite06);
              filter: brightness(1);
              background: transparent;                
              box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05), 15px 25px 10px rgba(0, 0, 0, 0.1),
                          15px 20px 20px rgba(0, 0, 0, 0.05), inset -10px -10px 15px rgba(237, 237, 237, 0.9);
            
              .icon {
                color: var(--graphite06);
              }
            }
            button:hover {
              color: var(--graphite);
              .icon {
                color: var(--graphite);
              }
            }
          }
        }
        .active a {
          background: transparent;                
          // box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05), 15px 25px 10px rgba(0, 0, 0, 0.1),
          //             15px 20px 20px rgba(0, 0, 0, 0.05), inset -10px -10px 15px rgba(237, 237, 237, 0.9);
  
          box-shadow: 5px 5px 10px #0008,
          10px 6px 15px #0008 inset,
          -5px -5px 8px #f5f5ff inset,
          10px 6px 15px #0004 inset;
          color : var(--light);
        }
      }
    }
     
  }
}

.dark {
  #AllEventComponent {
    .button-container {
      ul {
    
        li {
  
          a {
            color: var(--light-trans-text);
          }
  
          a:hover {
            border-radius: 57% 43% 37% 63% / 45% 52% 48% 52%;
            background: transparent;                
            box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05), 15px 25px 10px rgba(0, 0, 0, 0.1),
                        15px 20px 20px rgba(0, 0, 0, 0.05), inset -10px -10px 15px rgba(237, 237, 237, 0.9);
            color: var(--light);
            animation: neonGlow 0.5s ease-in-out infinite alternate;
          }
  
          &.button-wrapper {
  
            button {
              color: var(--light-trans-text);
              filter: brightness(1);
              background: transparent;                
              box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05), 15px 25px 10px rgba(0, 0, 0, 0.1),
                          15px 20px 20px rgba(0, 0, 0, 0.05), inset -10px -10px 15px rgba(237, 237, 237, 0.9);
            
              .icon {
                color: var(--light-trans-text);
              }
            }
            button:hover {
              color: var(--light);
              .icon {
                color: var(--light);
              }
            }
          }
        }
        .active a {
          background: transparent;                
          // box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05), 15px 25px 10px rgba(0, 0, 0, 0.1),
          //             15px 20px 20px rgba(0, 0, 0, 0.05), inset -10px -10px 15px rgba(237, 237, 237, 0.9);
  
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
</style>