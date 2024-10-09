<template>
    <div class="ratings">
        <v-rating
          readonly
          half-increments
          :length="5"
          :size="32"
          :model-value="props.rating"
          active-color="rgba(173, 173, 173, 0.7)"
          class="rat"
        />
    </div>
</template>
<script setup>
    import { defineProps} from "vue";

    const props = defineProps({
        rating: Number
    });
</script>