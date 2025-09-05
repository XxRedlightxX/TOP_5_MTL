<template>
     <p v-if="authStore.user">{{ authStore.user.name }}</p>
    <div id="avatarUploader"  v-if="authStore.user">
        <v-avatar size="180" >
            <img
                alt="John"
                :src="getAvatarUrl(authStore?.user.image_data)"
                :key="authStore?.user.image_data"
            />
        </v-avatar>
        <input type="file" name="file" id="avatarFile"  @change="uploadAvatar"  />
        <label for="avatarFile" class="avatarLabel" :title="actualLang ? 'Change Avatar' : 'Changer l\'avatar'">
            <v-icon  icon="mdi-camera-party-mode" :class="['icon', {'justGlowless' : !actualMode}]"/>
        </label>
    </div>

    <div>
    
    
  </div>
</template>

<script setup>
import defaultImg from '../../../assets/p1.jpg';
import storageManager from "../../../JS/LocalStaorageManager"
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';


const authStore = useAuthStore();
const { addImageProfile } = useUserStore();
const selectedFile = ref(null)
const errorMessage = ref(null);
const  validationErrors  = ref(null);


const getAvatarUrl = (imagePath) => {
    if (!imagePath) return img;
    return `${import.meta.env.VITE_API_BASE_URL}${imagePath}`;
};


const uploadAvatar = async (event) => {
  errorMessage.value = null;
  validationErrors.value = {};
  
  const file = event.target.files[0];
  if (!file) {
    errorMessage.value = 'Please select a file first';
    return;
  }

  const formData = new FormData();
  //Lie le chemin du fichier avec l attribut image_data input de l API
  formData.append('image_data', file);
  
  try {
    const avatarUrl = await addImageProfile(formData);
    if (avatarUrl) {
      // Refresh la [age]
      await authStore.getUser();
      // Ca reset le Input pour 
      event.target.value = '';
    }
  } catch (error) {
    errorMessage.value = error.message;
    console.error("Upload failed:", error);
  }
}

/*  const formData = new FormData();
  
  formData.append('image_data', selectedFile.value);


  try {
    const res = await fetch('http://127.0.0.1:8000/api/user/profile-picture',  {
      method: "POST",
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        
      },
      body: formData
    });

    const data = await res.json();
    console.log("Full response:", data);

    if (!res.ok) {
      if (data.errors) {
        validationErrors.value = data.errors;
        console.error("Validation errors:", data.errors);
      }
      throw new Error(data.message || 'Upload failed');
    }

    if (data.avatar_url) {
      authStore.user.image_data = data.avatar_url;
   
      await authStore.getUser();
    }
  } catch (err) {
    console.error("Upload error:", err);
    errorMessage.value = err.message;
  }
}*/
///

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

/*// Event handler for file input change
const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        img.value = URL.createObjectURL(file);  // Create a URL for the selected file
        console.log('New file selected:', img.value);
    }
};*/

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