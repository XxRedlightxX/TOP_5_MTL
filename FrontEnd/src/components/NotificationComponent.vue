<template>
  <div class="toast-container">
    <transition-group name="fade" tag="div">
      <div 
        v-for="(toast, index) in toasts" 
        :key="toast.id"
        class="toast"
        @click="removeToast(toast.id)"
      >
        <div class="icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path 
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 
                10-4.48 10-10S17.52 2 12 2zm0 5v6" 
              stroke="red"
              stroke-width="2.5"
              stroke-linecap="round"
            />
            <circle cx="12" cy="17" r="1.5" fill="#2EB872"/>
          </svg>
        </div>

        <div class="text">
          <strong>{{ toast.title }}</strong>
          <p>{{ toast.message }}</p>
          
          <small>{{ formatDate(toast.date) }}</small>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import '../../src/JS/config/echo';
import { formatDate } from '@/JS/GlobalFunctions';

const toasts = ref([]);
let toastId = 0;

const showToast = (title, message, date, creator) => {
  const id = toastId++;

  toasts.value.push({
    id,
    title,
    message,
    date,
    creator
  });

  setTimeout(() => removeToast(id), 6000);
};

const removeToast = (id) => {
  const index = toasts.value.findIndex(t => t.id === id);
  if (index > -1) toasts.value.splice(index, 1);
};

onMounted(() => {
  window.Echo.channel('public-events')
    .listen('.new-event', payload => {
      showToast('New Event', payload.titre, payload.date_debut, payload.creator);
    });
});
</script>

<style scoped>
/* Container positioning */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Toast card styling */
.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 300px;

  background: white;
  border: 1px solid #dce6f1;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);

  padding: 12px 18px;
  border-radius: 8px;
  
  animation: slideIn 0.25s ease-out;
  cursor: pointer;
}

.icon {
  display: flex;
  align-items: center;
}

.text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.text strong {
  color: black;
  font-size: 15px;
  font-weight: 700;
}

.text p {
  margin: 2px 0;
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.text small {
  font-size: 12px;
  color: #777;
}

/* Fade animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Slide animation */
@keyframes slideIn {
  from { transform: translateY(-10px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
</style>
