<template>
   
   <div id="MessagePage">
        <h2>Chat</h2>
        <div class="MessageSection">
         
            <ListUserMessage @user-selected="test"/>
            <Message />
            <ProfileUserMessage/>
            
        </div>

   </div>

   <!--<div id="MessagePage">
    <h1>Chat with {{ otherUser?.name || otherUser?.username || 'User' }}</h1>

    
    <div class="debug-bar">
      <small>
        <b>Status:</b>
        <span :class="['status-dot', wsStatusColor]"></span>
        {{ wsStatus }}
        | User ID: {{ userId }} | Friend ID: {{ friendId || 'none' }}
        | Messages: {{ messages.length }}
      </small>
      <div class="debug-buttons">
        <button @click="testWebSocket">Test WS</button>
        <button @click="forceReconnect">Reconnect WS</button>
         <button @click="testEventFlow">Test Flow</button>
      </div>
    </div>


    <SearchBar @user="handleMessage" />

   
    <div v-if="otherUser" class="user-info">
      <img v-if="otherUser.image_data" :src="otherUser.image_data" alt="Avatar" class="avatar" />
      <div class="user-details">
        <h3>{{ otherUser.name || otherUser.username }}</h3>
        <p v-if="otherUser.description" class="user-description">{{ otherUser.description }}</p>
      </div>
    </div>

 
    <div v-if="friendId" class="chat-container">
      <div class="messages" ref="messagesContainer">
        <div v-if="messages.length === 0" class="no-messages">
          No messages yet. Start a conversation!
        </div>

        <div
          v-else
          v-for="msg in messages"
          :key="msg.id"
          :class="['message', msg.expediteur_id === userId ? 'sent' : 'received']"
        >
          <div class="message-bubble">
            <div class="message-text">{{ msg.contenu }}</div>
            <div class="message-time">{{ formatTime(msg.date) }}</div>
          </div>
        </div>
      </div>

  
      <div class="input-container">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Type your message..."
          class="message-input"
          :disabled="!friendId"
        />
        <button
          @click="sendMessage"
          :disabled="!newMessage.trim() || !friendId"
          class="send-btn"
        >
          Send
        </button>
      </div>
    </div>

   
    <div v-else class="no-chat-selected">
      <p>Select a user to start chatting</p>
    </div>
  </div>
  -->
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'
import ListUserMessage from '@/components/MessagingComponents/ListUserMessageComponent.vue';
import Message from '@/components/MessagingComponents/MessageComponent.vue';
import ProfileUserMessage from '@/components/MessagingComponents/ProfileUserMessageComponent.vue';
import { useMessageStore } from '@/stores/Message';
import '../../JS/config/echo';




const {getConversationsFromUser} = useMessageStore()
let userFriend = ref(null);
watch(userFriend, (newValue, oldValue) => {
  console.log("userFriend changed:", newValue, "Test");
}, { deep: true });


const test = async (pUserFriend) => {
console.log("Selected user Grand:", pUserFriend);
const user = pUserFriend
// Use the parameter that was definitely passed to this function
userFriend.value = await getConversationsFromUser(user);

console.log("Conversations:", userFriend.value);
}  
</script>

<style src="../../styles/MessageStyle/MessageStyle.scss"></style>
