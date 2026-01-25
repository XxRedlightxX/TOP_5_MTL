<template>
    <div id="introTextComponent">
        <p>{{ actualLang ? "Discover, create, and share unforgettable events in your city. Plan with ease, connect with organizers, and explore what’s happening around you" 
        : "Découvrez, créez et partagez des événements inoubliables dans votre ville. Planifiez facilement, connectez-vous avec les organisateurs et explorez tout ce qui se passe autour de vous." }}
        </p>
        <hr>
    </div>
</template>

<script setup>
import storageManager from "@/JS/LocalStaorageManager";
import { ref, onMounted} from "vue";


const actualLang = ref(storageManager.getLang());

if (actualLang.value === null) {
    storageManager.setLang(true);
    actualLang.value = storageManager.getLang();
}


const handleLangChange = (event) => {
    actualLang.value = JSON.parse(event.detail.storage);
};

 onMounted(() => {
    window.addEventListener('lang-changed', handleLangChange);
});

</script>

<style src="../../styles/HomesStyles/IntroTextComponentStyle.scss"></style>