<template>
  <transition name="fade">
    <div v-if="isShow"  class="toast">
      <div class="icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17L4 12" 
                stroke="#2EB872"
                stroke-width="2.5" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="text">
        {{ message }}
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  isShow: Boolean,
  message: String
});
</script>

<style scoped>
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
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  animation: slideIn 0.25s ease-out;
}

.icon {
  display: flex;
  align-items: center;
}

.text {
  font-size: 15px;
  color: black;
  font-weight: 600;
}

/* Animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes slideIn {
  from { transform: translateY(-10px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
</style>
