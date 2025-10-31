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
import SearchBar from '@/components/SearchBarComponent.vue'
import '../../JS/config/echo';


const messageStore = useMessageStore();
const testId = ref(null);

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



/*const authStore = useAuthStore()
const messages = ref([])
const otherUser = ref(null)
const newMessage = ref('')
const userId = authStore.user.id
const friendId = ref(null)
const wsStatus = ref('Disconnected')
const messagesContainer = ref(null)

// 🟢 Computed connection color
const wsStatusColor = computed(() => {
  switch (wsStatus.value) {
    case 'Connected':
      return 'connected'
    case 'Disconnected':
      return 'disconnected'
    case 'Error':
      return 'error'
    default:
      return 'connecting'
  }
})

// 🔍 Handle user selection
const handleMessage = async (value) => {
  friendId.value = value
  if (value) await fetchConversation()
}

// 📨 Fetch conversation
async function fetchConversation() {
  if (!friendId.value) return
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://127.0.0.1:8000/api/messages/${friendId.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      const data = await response.json()

      // ✅ data is an ARRAY (from your example)
      messages.value = Array.isArray(data) ? data : []

      // 🧠 Infer otherUser from first message
      if (messages.value.length > 0) {
        const firstMsg = messages.value[0]
        otherUser.value = 
          firstMsg.expediteur_id === userId
            ? firstMsg.destinataire
            : firstMsg.expediteur
      } else {
        otherUser.value = null
      }

      await nextTick(scrollToBottom)
    } else {
      console.error('❌ Failed to fetch conversation')
      messages.value = []
      otherUser.value = null
    }
  } catch (err) {
    console.error('❌ Error fetching conversation:', err)
  }
}

// 🧩 Send message
async function sendMessage() {
  const content = newMessage.value.trim()
  const currentFriendId = friendId.value
  if (!content || !currentFriendId) return

  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://127.0.0.1:8000/api/messages/${currentFriendId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ contenu: content })
    })

    if (response.ok) {
      const newMsg = await response.json()

      // ✅ Laravel POST returns:
      // {
      //   "expediteur_id": 29,
      //   "destinataire_id": 5,
      //   "contenu": "fff",
      //   "date": "...",
      //   "id": 116
      // }

      // Push message directly (optimistic UI)
      messages.value.push({
        ...newMsg,
        expediteur: { id: userId }, // minimal expediteur info
        destinataire: otherUser.value, // reuse from context
      })

      newMessage.value = ''
      await nextTick(scrollToBottom)
    } else {
      console.error('❌ Failed to send message', await response.text())
    }
  } catch (err) {
    console.error('❌ Network error:', err)
  }
}

// 🧠 Unified WebSocket setup (Pusher + Socket.io)
const setupWebSocket = () => {
  console.log('🔧 Setting up WebSocket...')
  if (!window.Echo) {
    wsStatus.value = 'Echo not available'
    return
  }

  const connector = window.Echo.connector
  console.log('✅ Echo detected — type:', connector.pusher ? 'Pusher' : connector.socket ? 'Socket.io' : 'Unknown')

  try {
    // --- Pusher ---
    if (connector.pusher) {
      const pusher = connector.pusher
      pusher.connection.bind('connected', () => {
        wsStatus.value = 'Connected'
      })
      pusher.connection.bind('disconnected', () => {
        wsStatus.value = 'Disconnected'
      })
      pusher.connection.bind('error', (err) => {
        console.error('❌ Pusher error:', err)
        wsStatus.value = 'Error'
      })
      wsStatus.value = pusher.connection.state
    }

    // --- Socket.io ---
    else if (connector.socket) {
      const socket = connector.socket
      socket.on('connect', () => (wsStatus.value = 'Connected'))
      socket.on('disconnect', () => (wsStatus.value = 'Disconnected'))
      socket.on('error', (err) => {
        console.error('❌ Socket.io error:', err)
        wsStatus.value = 'Error'
      })
      wsStatus.value = socket.connected ? 'Connected' : 'Connecting...'
    }

    setupMessageListener()
  } catch (error) {
    wsStatus.value = 'Setup Error'
    console.error('❌ Error setting up WebSocket listeners:', error)
  }
}

// 🧭 Listen for messages
const setupMessageListener = () => {
  try {
    window.Echo.private(`chat.${userId}`)
      .listenToAll((event, data) => console.log('📢 [EVENT]', event, data))
      .listen('.MessageSent', (e) => handleIncomingMessage(e))
  } catch (error) {
    console.error('❌ Failed to set up listener:', error)
  }
}

// 💌 Handle incoming messages
const handleIncomingMessage = (e) => {
   console.log('🎯 Raw WebSocket event received:', e);
  
  const currentFriendId = friendId.value;
  if (!currentFriendId) {
    console.log('❌ No friendId selected, ignoring message');
    return;
  }

  // ✅ EXTRACT DATA FROM NESTED CONVERSATION OBJECT
  const messageData = e.conversation || e;
  
  // Use the exact field names from your Laravel event
  const messageSenderId = parseInt(messageData.expediteur_id);
  const messageRecipientId = parseInt(messageData.destinataire_id);
  const messageContent = messageData.contenu;

  console.log('🔍 Message details:', {
    messageSenderId,
    messageRecipientId,
    userId,
    currentFriendId,
    content: messageContent,
    rawData: messageData  // Log the actual structure
  });

  // Check if we have valid IDs
  if (isNaN(messageSenderId) || isNaN(messageRecipientId)) {
    console.log('❌ Invalid sender or recipient ID', { messageSenderId, messageRecipientId });
    return;
  }

  const isRelevant =
    (messageSenderId === userId && messageRecipientId === currentFriendId) ||
    (messageSenderId === currentFriendId && messageRecipientId === userId);

  console.log('🔍 Is relevant to current conversation?', isRelevant);

  if (!isRelevant) {
    console.log('❌ Message not relevant to current conversation');
    return;
  }

  const newMsg = {
    id: messageData.id || Date.now(),
    expediteur_id: messageSenderId,
    destinataire_id: messageRecipientId,
    contenu: messageContent,
    date: messageData.date || new Date().toISOString(),
  };

  console.log('✅ Adding new message:', newMsg);
  // Check for duplicates
  const messageExists = messages.value.some(msg => msg.id === newMsg.id);
  if (!messageExists) {
    messages.value.push(newMsg);
    nextTick(scrollToBottom);
  } else {
    console.log('⚠️ Message already exists, skipping duplicate');
  }
}

const testEventFlow = async () => {
  console.log('🧪 Testing complete event flow...');
  
  // 1. Test WebSocket connection
  testWebSocket();
  
  // 2. Send a test message via API
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://127.0.0.1:8000/api/messagerie/conversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        destinataire_id: 8, // Use a test user ID
        contenu: 'WebSocket test message'
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Message sent via API:', result);
    } else {
      console.error('❌ Failed to send test message');
    }
  } catch (error) {
    console.error('❌ Test message failed:', error);
  }
}

window.testEventFlow = testEventFlow;

// 🧾 Test WebSocket
const testWebSocket = () => {
  console.log('🧪 Testing WebSocket connection...')
  const connector = window.Echo?.connector
  if (!connector) return console.log('❌ Echo connector not found')

  if (connector.pusher) {
    console.log('🔌 Using Pusher | State:', connector.pusher.connection.state)
  } else if (connector.socket) {
    console.log('🔌 Using Socket.io | Connected:', connector.socket.connected)
  }
  console.log('Channel:', `chat.${userId}`)
}

// 🔄 Force reconnect
const forceReconnect = () => {
  console.log('🔄 Reconnecting WebSocket...')
  window.Echo.leave(`chat.${userId}`)
  setTimeout(() => setupWebSocket(), 500)
}

// 🧭 Scroll to bottom
const scrollToBottom = () => {
  if (messagesContainer.value) messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
}

onMounted(() => {
  setTimeout(() => setupWebSocket(), 1000)
  if (friendId.value) fetchConversation()
})

onUnmounted(() => {
  if (window.Echo) window.Echo.leave(`chat.${userId}`)
})

function formatTime(dateString) {
  if (!dateString) return ''
  try {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

const debugChannelSubscription = () => {
  console.log('🔍 Debugging channel subscription...');
  
  if (!window.Echo) {
    console.log('❌ Echo not available');
    return;
  }

  const pusher = window.Echo.connector.pusher;
  console.log('Pusher connection state:', pusher.connection.state);
  
  // Check all channels
  const channels = pusher.allChannels();
  console.log('All channels:', channels.map(ch => ch.name));
  
  const ourChannel = pusher.channel(`private-chat.${userId}`);
  console.log('Our channel:', ourChannel);
  
  if (ourChannel) {
    console.log('Channel subscription state:', ourChannel.subscriptionPending);
    console.log('Channel subscribed:', ourChannel.subscribed);
    
    // Listen for subscription events
    ourChannel.bind('pusher:subscription_succeeded', () => {
      console.log('✅ Channel subscription SUCCEEDED');
      wsStatus.value = 'Connected';
    });
    
    ourChannel.bind('pusher:subscription_error', (error) => {
      console.log('❌ Channel subscription FAILED:', error);
      wsStatus.value = 'Error';
    });
  } else {
    console.log('❌ Channel not found in Pusher');
  }
}

// Make it available globally
window.debugSub = debugChannelSubscription;

debugSub()

// 2. Test the complete flow
testEventFlow()

// 3. Check if we're receiving events manually
window.Echo.private(`chat.${userId}`).listenToAll((event, data) => {
    console.log('🎯 MANUAL EVENT CAPTURE:', event, data);
});

*/
</script>

<style src="../../styles/MessageStyle/MessageStyle.scss"></style>
/*#MessagePage {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.debug-bar {
  background: #f0f0f0;
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.debug-buttons button {
  margin-left: 6px;
  padding: 5px 10px;
  font-size: 12px;
}
.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}
.status-dot.connected {
  background: #28a745;
}
.status-dot.disconnected {
  background: #dc3545;
}
.status-dot.error {
  background: #ff9800;
}
.status-dot.connecting {
  background: #ffc107;
}
.user-info {
  display: flex;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
}
.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}
.messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f9f9f9;
}
.no-messages {
  text-align: center;
  color: #666;
  padding: 40px;
  font-style: italic;
}
.message {
  margin-bottom: 15px;
  display: flex;
}
.message.sent {
  justify-content: flex-end;
}
.message.received {
  justify-content: flex-start;
}
.message-bubble {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  position: relative;
}
.message.sent .message-bubble {
  background: #007bff;
  color: white;
  border-bottom-right-radius: 4px;
}
.message.received .message-bubble {
  background: white;
  color: black;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 4px;
}
.message-time {
  font-size: 0.7em;
  opacity: 0.7;
  margin-top: 5px;
  text-align: right;
}
.input-container {
  display: flex;
  padding: 15px;
  background: white;
  border-top: 1px solid #ddd;
  gap: 10px;
}
.message-input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}
.send-btn {
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.send-btn:hover:not(:disabled) {
  background: #0056b3;
}
.send-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.no-chat-selected {
  text-align: center;
  padding: 40px;
  color: #666;
  font-style: italic;
  background: white;
  border-radius: 8px;
  margin-top: 20px;
}*/
