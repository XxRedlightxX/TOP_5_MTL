<template>
    <div id="eventOrganisatorView">
        
        <Profile 
         v-if="activity" 
        :himself="isCurrentUser" 
        :creator-user="activity.user"/>
    </div>
</template>

<script setup>
    import { onMounted,  ref } from "vue";
    import Profile from "../../components/ProfileComponents/ProfileComponent.vue"
    import { useAuthStore } from "@/stores/auth";
    import { useActivityStore } from "@/stores/activity";
    import { useRoute } from "vue-router";

    const authStore = useAuthStore();
    const { getActivitiesByOtherUserId } = useActivityStore();
    const activity = ref(null);
    const route = useRoute();
    const currentUserId = authStore.user.id;

    let isCurrentUser = ref(false);

    

    onMounted(async () => {
        activity.value = await getActivitiesByOtherUserId(route.params.id);

        if (activity.value && activity.value.user?.id === currentUserId) {
            isCurrentUser.value = true;
        }

        console.log("Activite", activity.value?.user);

    })
</script>

<style lang="scss">
    #eventOrganisatorView {
        padding: 8% 0% 3% 0%;
    }
</style>