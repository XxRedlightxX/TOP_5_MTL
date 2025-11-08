<template>
  <div v-if="tagFilters.length > 0" class="eventFilter" ref="wrapper">
    <span id="left" @click="scroll('left')" :class="[{'glow' : !actualMode}]"><</span>
    <ul class="carousel" ref="carousel">
      <li v-for="(tag, index) in tagFilters" :key="index" class="card" @click="setTag(tag)">
        <v-icon :icon="tag.image_data" :class="['icon', {'glow' : !actualMode}]"/>
        <h4>{{ tag.nom }}</h4>
      </li>
    </ul>
    <span id="right" @click="scroll('right')" :class="[{'glow' : !actualMode}]">></span>
  </div>

  <div v-else class="eventFilter" ref="wrapper">
    <span id="left" :class="[{'glow' : !actualMode}]"><</span>
    <ul class="carousel" ref="carousel">
      <li v-for="(tag, index) in fakeTags" :key="index" class="card">
        <v-icon :icon="tag.image_data" :class="['icon', {'glow' : !actualMode}]"/>
        <h4>{{ tag.nom }}</h4>
      </li>
    </ul>
    <span id="right" :class="[{'glow' : !actualMode}]">></span>
    <LoadingComponent />
  </div>

</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
  import Setup from "@/JS/Setup";
  import { useActivityStore } from "@/stores/activity"
  import LocalStorageManager from "@/JS/LocalStorageManager";
  import AsyncData from "@/JS/AsyncData";
  import LoadingComponent from "@/components/StaticComponents/LoadingComponent.vue";

  const actualMode = Setup.modeSetup();
  const activitiesStore = useActivityStore()
  const tagFilters = ref([]);
  const fakeTags = AsyncData.getEventsTag();

  const wrapper = ref(null);
  const carousel = ref(null);
  const isDragging = ref(false);
  const startX = ref(0);
  const startScrollLeft = ref(0);
  const timeoutId = ref(null);
  const isAutoPlay = ref(true);

  const scroll = (direction) => {
    const firstCard = carousel.value?.querySelector(".card");
    if (!firstCard) return;
    const step = firstCard.offsetWidth;
    carousel.value.scrollLeft += direction === "left" ? -step : step;
  };

  const dragStart = (e) => {
    if (!carousel.value) return;
    isDragging.value = true;
    carousel.value.classList.add("dragging");
    startX.value = e.pageX;
    startScrollLeft.value = carousel.value.scrollLeft;
    e.preventDefault();
  };

  const dragging = (e) => {
    if (!isDragging.value || !carousel.value) return;
    e.preventDefault();
    carousel.value.scrollLeft = startScrollLeft.value - (e.pageX - startX.value);
  };

  const dragStop = () => {
    isDragging.value = false;
    carousel.value?.classList.remove("dragging");
  };

  const infiniteScroll = () => {
    const el = carousel.value;
    if (!el) return;

    if (el.scrollLeft === 0) {
      el.classList.add("no-transition");
      el.scrollLeft = el.scrollWidth - 2 * el.offsetWidth;
      el.classList.remove("no-transition");
    } else if (Math.ceil(el.scrollLeft) >= el.scrollWidth - el.offsetWidth) {
      el.classList.add("no-transition");
      el.scrollLeft = el.offsetWidth;
      el.classList.remove("no-transition");
    }

    clearTimeout(timeoutId.value);
    if (!wrapper.value?.matches(":hover")) autoPlay();
  };

  const autoPlay = () => {
    const firstCard = carousel.value?.querySelector(".card");
    if (!firstCard || window.innerWidth < 800 || !isAutoPlay.value) return;
    timeoutId.value = setTimeout(() => {
      carousel.value.scrollLeft += firstCard.offsetWidth;
    }, 2500);
  };

  const initializeTags = async () => {
    await nextTick(); // s'assurer que le DOM est prêt
    const el = carousel.value;
    if (!el) return;

    const firstCard = el.querySelector(".card");
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const cardsPerView = Math.round(el.offsetWidth / cardWidth);
    const children = Array.from(el.children);

    // Clone virtuellement au lieu d’injecter du HTML (évite bugs Vue)
    for (let i = 0; i < cardsPerView; i++) {
      const firstClone = children[i].cloneNode(true);
      const lastClone = children[children.length - 1 - i].cloneNode(true);
      el.appendChild(firstClone);
      el.insertBefore(lastClone, el.firstChild);
    }

    el.scrollLeft = el.offsetWidth;

    // Événements
    el.addEventListener("mousedown", dragStart);
    el.addEventListener("mousemove", dragging);
    window.addEventListener("mouseup", dragStop);
    el.addEventListener("scroll", infiniteScroll);
    wrapper.value.addEventListener("mouseenter", () => clearTimeout(timeoutId.value));
    wrapper.value.addEventListener("mouseleave", autoPlay);

    autoPlay();
  };

  const setTag = (tag) => {
    LocalStorageManager.setTag(tag);
    console.log('Tag selected :', tag);
  };

  onMounted(async () => {
    tagFilters.value = await activitiesStore.getCategories()
    if (tagFilters.value.length) initializeTags();
  });

  onBeforeUnmount(() => {
    const el = carousel.value;
    if (!el) return;
    el.removeEventListener("mousedown", dragStart);
    el.removeEventListener("mousemove", dragging);
    window.removeEventListener("mouseup", dragStop);
    el.removeEventListener("scroll", infiniteScroll);
  });
</script>

<style src="../../../styles/ComponentsStyles/EventStyles/ListOfEventStyle/EventsTagStyle.scss"></style>
<style src="../../../styles/ComponentsStyles/EventStyles/ListOfEventStyle/EventsTagStyleColor.scss"></style>
