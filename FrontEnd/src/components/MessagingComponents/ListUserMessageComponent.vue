<template>
   
    <div id="ListUserMessage">
          <SearchBar @user="handleUser"/>
        
        <div class="UserList">
            <div class="UserCard" v-if="userListRecentMessage.length > 0" 
                v-for="user in userListRecentMessage" :key="user.id"
                  @mousedown.prevent="selectUser(user)">
                <div class="user-content">
                    <div class="user-avatar-image">
                        <img :src=getAvatarUrl(user.image_data) :alt="user.username" />
                    </div>
                    <div class="user-info">
                        <strong>{{ user.username }}</strong>
                        <p>{{ user.name }}</p>
                    </div>
                </div>
                <div class="time">
                    {{ user.time }}
                </div>
            </div>
            <div v-else>
                No Messages yet
            </div>
        </div>
    </div>
</template>
<script setup>
    import SearchBar from '../SearchBarComponent.vue';
    import { onMounted, ref, onUnmounted } from 'vue'; 
    import LocalStorageManager from "@/JS/LocalStaorageManager";
    import { useMessageStore } from '@/stores/Message';
    import { getAvatarUrl } from '@/JS/GlobalFunctions';

    const emit = defineEmits(['user-selected']);
    const messageStore = useMessageStore();
    
    let userListRecentMessage = ref([])
    onMounted(() => {
        userListRecentMessage.value = LocalStorageManager.getUserList();
    });

    const selectUser = (pUser) => {
        messageStore.setUserFriend(pUser);
    }


   
    const handleUser = (pUserFriend) => {
        
        emit("user-selected", pUserFriend);
        const IsExistsUser = userListRecentMessage.value.some(
            (u) => u.id === pUserFriend.id
        );
        
        if (!IsExistsUser) {
            
            userListRecentMessage.value = [
                ...userListRecentMessage.value,
                pUserFriend
            ];
            
            console.log(userListRecentMessage.value);
            LocalStorageManager.setUserList(userListRecentMessage.value);
        }

    };


</script>


<style src="../../styles/MessageStyle/MessageSections/ListUserMessageStyles.scss"></style>