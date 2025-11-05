<template>
  <div>
    <!-- Toast Container -->
    <div class="toast-container">
      <div 
        v-for="(toast, index) in toasts" 
        :key="toast.id"
        class="toast-message"
        :class="toast.type"
        @click="removeToast(toast.id)"
      >
        <strong>{{ toast.title }}</strong>
        <p>{{ toast.message }}</p>
        <p>{{ toast.date }}</p>
      </div>
    </div>

   
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import '../../src/JS/config/echo';
import { formatDateApi } from '@/JS/GlobalFunctions';

const notifications = ref([]);
const toasts = ref([]);
let toastId = 0;

const showToast = (title, message, date,type = 'info') => {
  const id = toastId++;
  toasts.value.push({
    id,
    title,
    message,
    date,
    type
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    removeToast(id);
  }, 8000);
};

const removeToast = (id) => {
  const index = toasts.value.findIndex(toast => toast.id === id);
  if (index > -1) {
    toasts.value.splice(index, 1);
  }
};

onMounted(() => {
  window.Echo.channel('public-events')
    .listen('.new-event', (payload) => {
      console.log('New event broadcast:', payload);
      notifications.value.unshift(payload);
      
      // Show custom toast
      showToast('New Event', payload.titre, payload.date_debut, 'info');
    });
});
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9000;
}

.toast-message {
  min-width: 300px;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.toast-message.info {
  background-color: #f44336;
}

.toast-message.success {
  background-color: #4CAF50;
}

.toast-message.error {
  background-color: #f44336;
}

.toast-message.warning {
  background-color: #ff9800;
}
</style>