<template>
     <div v-if="IsShowFollowings">
     <h1>Followings</h1>
     <div v-if="listEvent && listEvent.length > 0">
     <div class="listFollowers" v-for="event in listEvent" :key="event.id">
            
            <div class="rangee">
                <div class="test">
                    <img
                        alt="John"
                        :src="getAvatarUrl(event.image_data)"
                        :key="authStore?.user.image_data"
                    />
                </div>
                 <div class="test">
                    <div class="user">
                        <h4>{{ event.username }}</h4>
                        <h4>{{ event.name }}</h4>
                    </div>
                </div>
                <div class="test">
                    <v-icon icon="mdi-delete-circle" :class="['icon', {'glowLess' : !actualMode}]" :title="actualLang ? 'Remove' : 'Supprimer'"  @click="deleteFollowing(event)"/>
                </div>

            </div>

        
        </div>
        </div>
         <div v-else>
        <p>{{ actualLang ? 'No followings yet' : 'Aucun abonnement pour le moment' }}</p>
    </div>
     </div>
   
</template>

<script setup>
    import { ref, onMounted, onUnmounted, defineProps, defineEmits } from "vue";
    import WaterButton from "@/components/WaterButtonComponent.vue";
    import storageManager from "@/JS/LocalStaorageManager";
    import { getAvatarUrl } from "@/JS/GlobalFunctions";
    import { useFriendStore } from "@/stores/Friend";

    let actualMode = ref(storageManager.getMode());
    let actualLang = ref(storageManager.getLang());

    const {deleteUserFollowing, getListUserFollowers} = useFriendStore();

    const emit = defineEmits(['deleteFollowing']);

    const props =defineProps({
        listEvent: Array,
        IsShowFollowings: Boolean
    });

    const deleteFollowing = async (pEvent) => {
        const result = await deleteUserFollowing(pEvent.id);
        console.log(result, "YOOO");
        
        if (result && result.message === "Success") { // Adjust based on your API response
            // Emit the deleted user ID so parent can update the list
            emit("deleteFollowing", { 
                type: 'deleted', 
                userId: pEvent.id 
            });
        } else {
            // If deletion failed, refetch
            emit("deleteFollowing", { 
                type: 'refetch' 
            });
        }
    }
    
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