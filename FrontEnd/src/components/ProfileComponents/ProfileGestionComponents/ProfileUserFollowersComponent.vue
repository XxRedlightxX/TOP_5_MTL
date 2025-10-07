<template >
       <div v-if="IsShowFollowers">
        <h1>Followers</h1>
         <div v-if="listEvent && listEvent.length > 0">
            <div class="listFollowers" v-for="value in listEvent" :key="value.id">
                
                <div class="rangee">
                    <div class="test">
                        <img
                            alt="John"
                            :src="getAvatarUrl(value.image_data)"
                            :key="authStore?.user.image_data"
                        />
                    </div>
                    <div class="test">
                        <div class="user">
                            <h4>{{ value.username }}</h4>
                            <h4>{{ value.name }}</h4>
                        </div>
                    </div>
                    <div class="test">
                        <v-icon icon="mdi-delete-circle" :class="['icon', {'glowLess' : !actualMode}]" :title="actualLang ? 'Remove' : 'Supprimer'"  @click="showDel()"/>
                    </div>

                </div>

            
            </div>
        </div>
        <div v-else>
        
        <p>{{ actualLang ? 'No followers yet' : 'Aucun abonneurs pour le moment' }}</p>
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
        listEvent: Array,
        IsShowFollowers: Boolean
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


<style src="../../../styles/ProfilesStyles/ProfileUserFollowerComponentss.scss"></style>
