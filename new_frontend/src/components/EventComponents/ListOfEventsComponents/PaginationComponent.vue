<template>
  <div v-if="pages != null && pages.length > 0" class="paginationComponent">
    <ul class="pagination">
      <li @click="prevPage" :class="['pageText', currentPage > 0 ? 'glowPJ' : '']">
        {{ actualLang ? "Prev" : "Precedent"}}
      </li>

      <li
        v-for="page in pages"
        :key="page"
        @click="changePage(page)"
        :class="{ active: currentPage === page }"
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
  import { ref, defineProps, defineEmits, onMounted, watch } from 'vue';
  import Setup from '@/JS/Setup';

  
  let actualLang = Setup.languageSetup();

  const props = defineProps({
    lenght: {type: Number},
    page: {type: Number},
  })

  const emit = defineEmits(['paginationChanged'])

  const pages = ref([]);
  const currentPage =ref(props.page)// ref(null);

  const createPagination = () => {
    console.log("taille : " + props.lenght)
    pages.value = []; // reset pour éviter doublons
    for (let i = 1; i <= props.lenght; i++) {
      pages.value.push(i);
    }
    //console.log('pagess : ', pages)
  }

  const changePage = (index) => {
    //console.log('page send : '+ index)
    currentPage.value = index;
    emit('paginationChanged', index)
  };

  const prevPage = () => {
    if (currentPage.value > 0) {
      currentPage.value--;
      emit('paginationChanged', currentPage.value);
    }
  };

  const nextPage = () => {
    if (currentPage.value < pages.value.length) {
      currentPage.value++;
      emit('paginationChanged', currentPage.value);
    }
  };

  watch(() => props.lenght, (newVal, oldVal) => {
    if (newVal !== oldVal) {
      createPagination();

      if (currentPage.value > newVal) {
        currentPage.value = newVal > 0 ? newVal : 1;
        emit('paginationChanged', currentPage.value);
      }
    }
  });

  onMounted(() => {
    createPagination();
    currentPage.value = props.page;
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
        flex-wrap: wrap;
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
  @media screen and (max-width: 600px){
      .paginationComponent {
        margin-bottom: 12%;
      }
  }
</style>