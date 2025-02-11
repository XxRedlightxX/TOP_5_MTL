<template>
    <div class="ratings">
        <v-rating v-if="!GiveRate"
          readonly
          half-increments
          :length="5"
          :size="32"
          :model-value="props.rating"
          :active-color="actualMode ? 'rgba(173, 173, 173, 0.7)' : 'rgba(255, 255, 255, 0.7)'"
          class="rat"
        />

        <v-rating v-else
          half-increments
          :length="5"
          :size="32"
          :model-value="props.rating"
          :active-color="actualMode ? 'rgba(173, 173, 173, 0.7)' : 'rgba(255, 255, 255, 0.7)'"
          class="rat"
        />
    </div>
</template>
<script setup>
    import storageManager from "@/JS/LocalStaorageManager"
    import { defineProps, ref, onMounted, onUnmounted} from "vue";

    const GiveRate = ref(null);
    const props = defineProps({
        rating: Number,
        Rate: Boolean,
    });
    if (props.Rate == null){
        GiveRate.value = false;
    }
    else {
        GiveRate.value = props.Rate;
    }

    console.log("valllll : " , GiveRate.value)
    let actualMode = ref(storageManager.getMode());

    if (actualMode.value === null) {
        storageManager.setMode(true);
        actualMode.value = storageManager.getMode();
    }

    // Function to handle mode change event
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
</script>