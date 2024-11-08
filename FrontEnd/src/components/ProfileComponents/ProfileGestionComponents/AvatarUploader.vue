<template>
    <div id="avatarUploader">
        <v-avatar size="180">
            <img
                alt="John"
                :src="img"
            />
        </v-avatar>
        <input type="file" name="file" id="avatarFile" @change="onFileChange" />
        <label for="avatarFile" class="avatarLabel">
            <v-icon icon="mdi-camera-party-mode" :class="['icon', {'justGlow' : !actualMode}]"/>
        </label>
    </div>
</template>

<script setup>
import defaultImg from '../../../assets/p1.jpg';
import storageManager from "../../../JS/LocalStaorageManager"
import { ref, onMounted, onUnmounted } from 'vue';

const img = ref(null);
const actualMode = ref(storageManager.getMode());
const actualLang = ref(storageManager.getLang());

if (actualLang.value === null) {
    storageManager.setLang(true);
    actualLang.value = storageManager.getLang();
}

if (actualMode.value === null) {
    storageManager.setMode(true);
    actualMode.value = storageManager.getMode();
}

// Function to handle mode change event
const handleLangChange = (event) => {
    actualLang.value = JSON.parse(event.detail.storage);
};

const handleModeChange = (event) => {
    actualMode.value = JSON.parse(event.detail.storage);
};

// Add event listener for mode changes
onMounted(() => {
    window.addEventListener('lang-changed', handleLangChange);
    window.addEventListener('mode-changed', handleModeChange);
});

// Remove event listener when component is unmounted
onUnmounted(() => {
    window.removeEventListener('lang-changed', handleLangChange);
    window.removeEventListener('mode-changed', handleModeChange);
});

// Event handler for file input change
const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        img.value = URL.createObjectURL(file);  // Create a URL for the selected file
        console.log('New file selected:', img.value);
    }
};

// Initialize with default image if no file selected
img.value = defaultImg;

</script>


<style lang="scss">
    #avatarUploader {
        //border: 2px solid red;
        position: relative;
        .v-avatar {
            border: 2px solid var(--graphite015);
            img {
                width: 100%;
            }
        }
        #avatarFile {
            display: none;
        }
        .avatarLabel {
            position: absolute;
            padding: 5px;
            //border: 2px solid red;
            background-color: var(--light-text);
            border-radius: 50%;
            bottom: -3%;
            right: 25%;
            cursor: pointer;

            .icon {
                color: var(--graphite06);

            }
            .icon:hover {
                color: var(--graphite);
            }
        }
        .avatarLabel:hover {
            color: var(--light-trans-2Shine);
        }
    }
</style>