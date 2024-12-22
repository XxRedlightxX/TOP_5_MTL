<template>
     <div class="paginationComponent">
       <ul class="pagination">
         <li @click="prevPage" :class="['pageText', currentPage > 0 ? 'glowPJ' : '']">
           {{ actualLang ? "Prev" : "Precedent"}}
         </li>
 
         <li 
           v-for="(page, index) in pages" 
           :key="index" 
           @click="changePage(index)" 
           :class="{ active: currentPage === index }"
         >
           {{ page }}
         </li>
 
         <li @click="nextPage" :class="['pageText', currentPage < pages.length -1 ? 'glowPJ' : '']">
           {{ actualLang ? "Next" : "Suivant"}}
         </li>
       </ul>
     </div>
 </template>
 
 <script setup >
 import { onMounted, ref, onUnmounted } from 'vue'; 
 import LocalStorageManager from "@/JS/LocalStaorageManager"

    const pages = [1, 2, 3, 4, 5];
    const currentPage = ref(0);


    const changePage = (index) => {
        currentPage.value = index;
    };

    const prevPage = () => {
        if (currentPage.value > 0) {
        currentPage.value--;
        }
    };

    const nextPage = () => {
        if (currentPage.value < pages.length - 1) {
        currentPage.value++;
        }
    };
    
   let actualLang = ref(LocalStorageManager.getLang());

   if (actualLang.value === null) {
        LocalStorageManager.setLang(true);
        actualLang.value = LocalStorageManager.getLang();
    }

   
    // Function to handle mode change event
    const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };

     // Add event listener for mode changes
   onMounted(() => {
       window.addEventListener('lang-changed', handleLangChange);
   });
 
   // Remove event listener when component is unmounted
   onUnmounted(() => {
       window.removeEventListener('lang-changed', handleLangChange);
   });
 </script>
 
 <style lang="scss">
.paginationComponent {
    width: 100%;
    .pagination {
      position: relative;
      margin-top: 2%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 2px;


      li {
        list-style-type: none;
        display: inline-block;
          position: relative;
          padding: 15px 20px;
          margin: 0px 5px;
          text-decoration: none;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
      }
    }
}    


.light {
    .paginationComponent {
      .pagination {
  
        .pageText{
          a { 
            color: var(--light);  
          }
        }
  
        li {
            color: var(--graphite);
        }
        li:hover {
          border-radius: 57% 43% 37% 63% / 45% 52% 48% 52%;
          background: transparent;   
            color: var(--light);         
            box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05), 15px 25px 10px rgba(0, 0, 0, 0.1),
                        15px 20px 20px rgba(0, 0, 0, 0.05), inset -10px -10px 15px rgba(237, 237, 237, 0.9);
        }
        .active {
          border-radius: 57% 43% 37% 63% / 45% 52% 48% 52%;
          background: transparent;    
          color: var(--light);    
          
          box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05), 15px 25px 10px rgba(0, 0, 0, 0.1),
                        15px 20px 20px rgba(0, 0, 0, 0.05), inset -10px -10px 15px rgba(237, 237, 237, 0.9);      
        }
      }
    }    
}

.dark {
    .paginationComponent {
      .pagination {
  
        .pageText{
          a { 
            color: var(--light);  
          }
        }
        .glowPJ {
          animation: neonGlow 0.5s ease-in-out infinite alternate;
        }
        li {
            color: var(--light-trans-2Shine);
        }
        li:hover {
            background: transparent;   
            color: var(--light);
            animation: neonGlow 0.5s ease-in-out infinite alternate;
        }
        .active {
          background: transparent;    
          color: var(--light-trans-2Shine);
          animation: neonGlow 0.5s ease-in-out infinite alternate;
                      
        }
      }
    }    
  }
</style>