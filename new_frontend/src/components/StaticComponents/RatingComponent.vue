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
              @update:modelValue="updateRating"
    />
  </div>
</template>

<script setup>
  import { defineProps, ref} from "vue";
  import Setup from "@/JS/Setup";

  const GiveRate = ref(null);
  const props = defineProps({
    modelValue: Number,
    rating: Number,
    Rate: Boolean,
  });

  const emit = defineEmits(['update:modelValue']);

  const updateRating = (value) => {
    emit('update:modelValue', value);
  };

  GiveRate.value = props.Rate == null ? false : props.Rate;
  let actualMode = Setup.modeSetup();
</script>
