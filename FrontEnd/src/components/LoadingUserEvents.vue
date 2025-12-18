<template>
  <div id="singleEventShimmer" :class="themeClass">
    
    <!-- LEFT IMAGE -->
    <div class="shimmer-img"></div>

    <!-- MIDDLE TEXT -->
    <div class="shimmer-middle">
      <div class="shimmer-title shimmer-line"></div>
      <div class="shimmer-desc shimmer-line"></div>
      <div class="shimmer-desc short shimmer-line"></div>
    </div>

    <!-- RIGHT ICONS -->
    <div class="shimmer-right" v-if="himself">
      <div class="shimmer-icon"></div>
      <div class="shimmer-icon"></div>
    </div>

  </div>
</template>

<script setup>
import storageManager from "@/JS/LocalStaorageManager";
const props = defineProps({
  himself: Boolean
});

const themeClass = storageManager.getMode() ? 'light' : 'dark';
</script>

<style scoped>
#singleEventShimmer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 96%;
  margin: 2% auto;
  border-radius: 20px;
  padding: 15px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.25);
}

/* IMAGE */
.shimmer-img {
  width: 200px;
  height: 200px;
  border-radius: 20px 0 0 20px;
  animation: shimmer 1.5s infinite;
  background-size: 200% 100%;
}

/* TEXT */
.shimmer-middle {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 5%;
}

.shimmer-line {
  height: 18px;
  border-radius: 8px;
  margin: 6px 0;
  animation: shimmer 1.5s infinite;
  background-size: 200% 100%;
}

.shimmer-title {
  width: 60%;
  height: 22px;
}

.shimmer-desc {
  width: 90%;
}

.shimmer-desc.short {
  width: 70%;
}

/* ICONS */
.shimmer-right {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.shimmer-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  animation: shimmer 1.5s infinite;
  background-size: 200% 100%;
}

/* 🟡 ANIMATION */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* 🌞 LIGHT THEME */
.light .shimmer-img,
.light .shimmer-line,
.light .shimmer-icon {
  background: linear-gradient(
    90deg,
    rgba(128,128,128,0.2) 25%,
    rgba(169,169,169,0.4) 50%,
    rgba(128,128,128,0.2) 75%
  );
}

/* 🌚 DARK THEME */
.dark .shimmer-img,
.dark .shimmer-line,
.dark .shimmer-icon {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.1) 25%,
    rgba(255,255,255,0.2) 50%,
    rgba(255,255,255,0.1) 75%
  );
}
</style>
