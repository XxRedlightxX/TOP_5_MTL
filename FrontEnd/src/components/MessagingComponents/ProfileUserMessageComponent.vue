<template>
    <div id="ProfileUserMessage">
        <div class="profile" v-if="userFriendProfile">
            <div class="avatar-info">
                <div class="avatar-img">
                    <img :src=getAvatarUrl(userFriendProfile.image_data) alt="Profile Avatar">
                </div>
                <div class="name">{{ userFriendProfile.name }}</div>
                <div class="username">{{ userFriendProfile.username }}</div>
            </div>
            <div class="other-info">
                <div class="column-info">
                    <div class="label">Email</div>
                    <div class="value">{{ userFriendProfile.email }}</div>
                </div>
                <div class="column-info">
                    <div class="label">Phone</div>
                    <div class="value">{{ userFriendProfile.num_tel }}</div>
                </div>
                <div class="column-info">
                    <div class="label">Location</div>
                    <div class="value">Montreal, Canada</div>
                </div>
                <div class="column-info">
                    <div class="label">Member since</div>
                    <div class="value">January 2024</div>
                </div>
            </div>
        </div>
         <div v-else class="no-profile">
            No profile data available
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, onUnmounted, computed } from 'vue';
import { useMessageStore } from '@/stores/Message';
import { useAuthStore } from '@/stores/auth';
import { getAvatarUrl } from '@/JS/GlobalFunctions';

// Stores
const messageStore = useMessageStore();
const userFriendProfile = ref(null);

watch(
  () => messageStore.userFriend,
  (newProfile) => {
    userFriendProfile.value = newProfile;
  },
  { immediate: true }
);


</script>


<style src="../../styles/MessageStyle/MessageSections/ProfileUserMessage.scss"></style>