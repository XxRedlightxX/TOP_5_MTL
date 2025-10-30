<template>
     <div v-if="IsShowFavorites">
    <h1>{{  actualLang ? 'Favorites' : 'Vos Favoris' }}</h1>
    <div v-if="listFavoritesEvents && listFavoritesEvents.length > 0">
        <div class="listFollowers" v-for="value in listFavoritesEvents" :key="value.id">
                
                <div class="rangee">
                    <div class="test">
                        <img
                            alt="John"
                            :src="getAvatarUrl(value.image_data)"
                            
                        />
                    </div>
                    <div class="test">
                        <div class="user">
                            <h4>{{ value.titre }}</h4>
                            <h4>{{ value.lieu }}</h4>
                        </div>
                    </div>
                    <div class="test">
                        <v-icon icon="mdi-delete-circle" :class="['icon', {'glowLess' : !actualMode}]" :title="actualLang ? 'Remove' : 'Supprimer'"  @click="showDel()"/>
                    </div>

                </div>

            
            </div>
        </div>
        <div v-else>
        
        <p>{{ actualLang ? 'No Favorites yet' : 'Aucun Favoris' }}</p>
    </div>
     </div>
   
</template>

<script setup>
    import { ref, onMounted, onUnmounted, defineProps, defineEmits } from "vue";
    import WaterButton from "@/components/WaterButtonComponent.vue";
    import storageManager from "@/JS/LocalStaorageManager";
    import { getAvatarUrl } from "@/JS/GlobalFunctions";
    
    let actualMode = ref(storageManager.getMode());
    let actualLang = ref(storageManager.getLang());
    const props =defineProps({
        listFavoritesEvents: Array,
        IsShowFavorites: Boolean
    });
    
    console.log(props.IsShowFollowers +"Statut");

     const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };


    onMounted(() => {
        window.addEventListener('lang-changed', handleLangChange);
        
    });

    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('lang-changed', handleLangChange);
        
    });
    

</script>