<template>
  <div class="loading">
    <v-progress-circular
      :size="size"
      :color="actualMode ? 'rgba(29, 30, 24, 0.6)' : 'rgba(255, 255, 255, 1)'"
      indeterminate
      :class="['loader', darker ? 'darker': '']"
    />
  </div>
</template>

<script setup>
  import Setup from '@/JS/Setup';
  import { defineProps } from 'vue'; 
  
  const props = defineProps({
    size: Number,
    darker: Boolean
  });
  let size = props.size == null ? 70 : props.size;
  const actualMode = Setup.modeSetup()
</script>

<style lang="scss">
    .loading {
        //border: 2px solid red;
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        z-index: 1000;

        .loader {
            z-index: 1500;
            //border: 2px solid red;
        }
    }
    .light {
        .loading {
            background: #EFEFEF;
            background: linear-gradient(90deg,rgba(239, 239, 239, 0) 0%, rgba(239, 239, 239, 0.6) 5%, rgba(239, 239, 239, 0.6) 95%, rgba(239, 239, 239, 0) 100%);
        }
    }
    .dark {
        .loading {
            background: #CCCCCC;
            background: linear-gradient(90deg,rgba(204, 204, 204, 0) 0%, rgba(204, 204, 204, 0.6) 5%, rgba(204, 204, 204, 0.6) 95%, rgba(204, 204, 204, 0) 100%);
        }
    }
</style>