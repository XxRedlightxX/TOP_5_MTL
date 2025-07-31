<template>
    <div id="avatarUploader">
        <v-avatar size="180">
            <img
                alt="John"
                :src="img"
            />
        </v-avatar>
        <input type="file" name="file" id="avatarFile" @change="onFileChange" />
        <label for="avatarFile" class="avatarLabel" :title="actualLang ? 'Change Avatar' : 'Changer l\'avatar'">
            <v-icon icon="mdi-camera-party-mode" :class="['icon', {'justGlowless' : !actualMode}]"/>
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
            //background-color: var(--light-text);
            border-radius: 57% 43% 37% 63% / 45% 52% 48% 52%;
            animation: animmm 1s infinite alternate;
            //border-radius: 50%;
            cursor: pointer;
        }
    }
    @media screen and (min-width: 1025.1px) {
        #avatarUploader {
            .avatarLabel {
                bottom: -2%;
                right: 13%;
            }
        }
    }
    
    @media screen and (max-width: 1025px) and (min-width: 500.1px) {
        #avatarUploader {
            .avatarLabel {
                bottom: -2%;
                right: 43%;
            }
        }
    }
    @media screen and (max-width: 500px) {
        #avatarUploader {
            .avatarLabel {
                bottom: -2%;
                right: 35%;
            }
        }
    }
    .light {
        #avatarUploader {
            .v-avatar {
                border: 2px solid var(--graphite015);
            }
            .avatarLabel {
                background: transparent;
                box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05), 15px 25px 10px rgba(0, 0, 0, 0.1),
                            15px 20px 20px rgba(0, 0, 0, 0.05), inset -10px -10px 15px rgba(237, 237, 237, 0.9);

                .icon {
                    color: var(--graphite06);

                }
                .icon:hover {
                    color: var(--graphite);
                }
            }
            .avatarLabel:hover {
                box-shadow: 
                    5px 5px 10px #0008,
                    10px 6px 15px #0008 inset,
                    -5px -5px 8px #f5f5ff inset,
                    10px 6px 15px #0004 inset;
            }
        }
    }
    .dark {
        #avatarUploader {
            .v-avatar {
                border: 2px solid var(--light-trans015);
            }
            .avatarLabel {
                background: transparent;
                box-shadow: 
                    5px 5px 10px #0008,
                    10px 6px 15px #0008 inset,
                    -5px -5px 8px #f5f5ff inset,
                    10px 6px 15px #0004 inset;

                .icon {
                    color: var(--light-trans-text);

                }
                .icon:hover {
                    color: var(--light);
                }
            }
            .avatarLabel:hover {
                box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05), 15px 25px 10px rgba(0, 0, 0, 0.1),
                            15px 20px 20px rgba(0, 0, 0, 0.05), inset -10px -10px 15px rgba(237, 237, 237, 0.9);
            }
        }
    }
    @keyframes animmm {
    0% {
        transform: translateY(0);
        // width: 65px;
        // height: 65px;
            padding: 5px;
    }

    100% {
        transform: translateY(5px);
        // width: 59px;
        // height: 69px;
            padding: 7px;
    }
}
</style>