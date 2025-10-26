<template>
  <div>
    <h2>Real-time Events</h2>
    <div v-for="(n, i) in notifications" :key="i" class="border p-2 my-2 rounded">
      <strong>{{ n.titre }}</strong>
      <p>{{ n.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import '../../src/JS/config/echo'

const notifications = ref([]);

onMounted(() => {
  window.Echo.channel('public-events')
    .listen('.new-event', (payload) => {
      console.log('New event broadcast:', payload);
      notifications.value.unshift(payload);
    });
});
</script>