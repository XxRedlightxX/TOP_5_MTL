<template>
  <div v-if="events.length > 0" class="upComingEvent" ref="wrapper">
    <button id="left" @click="scroll('left')"><</button>

    <ul class="carousel" ref="carousel">
      <div
        v-for="(event, index) in events"
        :key="event.id || index"
        class="card"
        @click="goToEvent(event.id)"
      >
        <div class="img">
          <img :src="event.image" alt="event image" draggable="false" />
        </div>

        <h2>{{ event.title }}</h2>

        <div class="eventDescriptionInfos">
          <div class="d">
            <v-icon
              icon="mdi-map-marker"
              :class="['icon', { justGlow: !actualMode }]"
            />
            Montréal, {{ event.title }}
          </div>
          <div class="d">
            <v-icon
              icon="mdi-clock-outline"
              :class="['icon', { justGlow: !actualMode }]"
            />
            12 h
          </div>
        </div>
      </div>
    </ul>

    <button id="right" @click="scroll('right')">></button>
  </div>

  <div v-else class="upComingEvent" ref="wrapper">
    <button id="left" @click="scroll('left')"><</button>

    <ul class="carousel" ref="carousel">
      <router-link
        v-for="(event, index) in fakeData"
        :key="event.id || index"
        class="card"
        to="/Event"
        @click="setEvent(event)"
      >
        <div class="img">
          <img :src="event.image" alt="event image" draggable="false" />
        </div>

        <h2 class="fakeTitle">{{ event.title }}</h2>

        <div class="eventDescriptionInfos">
          <div class="d fakeDesc">
            City, {{ event.title }}
          </div>
          <div class="d fakeDesc">
            Hours
          </div>
        </div>
      </router-link>
    </ul>

    <button id="right" @click="scroll('right')">></button>
    <LoadingComponent :size="150"/>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
  import { useRouter } from "vue-router";
  import Setup from "@/JS/Setup";
  import SetupEvent from "@/JS/SetupEvents";
  import LocalStorageManager from "@/JS/LocalStorageManager";
  import AsyncData from "@/JS/AsyncData";
  import LoadingComponent from "@/components/StaticComponents/LoadingComponent.vue";

  const actualMode = Setup.modeSetup();
  const events = ref([]);
  const fakeData = AsyncData.getEvents(3);
  const router = useRouter();

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

  const initializeCarousel = async () => {
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

  async function goToEvent(id) {
    await setEvent(id);   // 1) stocker l’event
    router.push("/Event"); // 2) naviguer ensuite
  }

  async function setEvent(id) {
    const event = await SetupEvent.singleEventSetup(id)
  }

  const handleModeChange = (event) => {
    SetupEvent.actualEventModeManagerGeneric(LocalStorageManager.getUpcomingEvents, events)
  };

  onMounted(async () => {
    const reactiveList = await SetupEvent.upcomingEventSetup();
    events.value = reactiveList.value;
    if (events.value.length) initializeCarousel();
    window.addEventListener('mode-changed', handleModeChange);
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

<style src="../../../styles/ComponentsStyles/EventStyles/ListOfEventStyle/UpComingStyle.scss"></style>
<style src="../../../styles/ComponentsStyles/EventStyles/ListOfEventStyle/UpComingStyleColor.scss"></style>
