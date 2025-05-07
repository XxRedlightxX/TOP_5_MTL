<template>
    <div id="allEventView">
        <ListcategorieEvent></ListcategorieEvent>
        <div>
            <h3>{{ actualLang ? 'Up coming events' : 'Evenement en approche'}}</h3>
            <UpComingEvent/>
        </div>
        <AlListEvent/>
    </div>
</template>

<script setup>
    import ListcategorieEvent from "../../components/EventComponents/ListOfEventsComponents/EventFilterComponent.vue"
    import UpComingEvent from '../../components/EventComponents/ListOfEventsComponents/UpComingEventComponent.vue'
    import AlListEvent from "../../components/EventComponents/ListOfEventsComponents/AllEventsComponent.vue"
    import LocalStorageManager from "@/JS/LocalStaorageManager"
    import { ref, onMounted, onUnmounted} from "vue";

    let actualLang = ref(LocalStorageManager.getLang());

    if (actualLang.value === null) {
        LocalStorageManager.setLang(true);
        actualLang.value = LocalStorageManager.getLang();
    }

    // Function to handle mode change event
    const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };
    
  // Add event listener for Lang changes
  onMounted(() => {
    window.addEventListener('lang-changed', handleLangChange);
  });

  // Remove event listener when component is unmounted
  onUnmounted(() => {
    window.removeEventListener('lang-changed', handleLangChange);
  });
</script>

<style src="../../styles/MenusViewStyles/AllEventViewStyle.scss"></style>
