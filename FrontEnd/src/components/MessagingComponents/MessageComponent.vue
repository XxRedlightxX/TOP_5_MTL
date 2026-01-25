<template>
    <div id="Message">
        <!-- Messages List -->
        <div class="messagelist" >
            <div v-if="messages.length === 0" class="no-messages">
            <div class="no-messages-text">{{  actualLang ? "Aucun message pour l'instant" : 'No messages yet' }}</div>
            <div class="no-messages-subtext">{{  actualLang ? "Commence ta conversation en envoyant un message" : 'Start a conversation by sending a message!' }}</div>
        </div>
    
            <div 
                v-for="message in messages" 
                :key="message.id" 
                :class="message.isMine ? 'myUserMessage' : 'otherUserMessage'"
            >
                <!-- Other User Avatar -->
                <div v-if="!message.isMine" class="avatar-other">
                    <img :src="getAvatarUrl(message.avatar)" :alt="message.senderName" />
                </div>
                
                <!-- Message Content -->
                <div :class="message.isMine ? 'avatar-info-me' : 'avatar-info'">
                    <div :class="message.isMine ? 'message-me' : 'message'">
                        <p>{{ message.contenu }}</p>
                    </div>
                    <span class="timestamp">{{ formatTimestamp(message.timestamp) }}</span>
                </div>
                
                <!-- My Avatar -->
                <div v-if="message.isMine" class="avatar-me">
                    <img :src="getAvatarUrl(message.avatar)" :alt="message.senderName" />
                </div>
            </div>
        </div>

        <!-- Message Input -->
        <div class="message-input-container">
            <v-text-field
                v-model="newMessage"
                :label="inputPlaceholder"
                variant="outlined"
                hide-details
                class="message-input"
                @keyup.enter="sendMessage"
                ref="messageInput"
            >
                <template v-slot:append>
                    <v-btn
                        icon
                        @click="sendMessage"
                        :disabled="!newMessage.trim()"
                        class="send-button"
                    >
                        <v-icon icon="mdi-send" :class="['icon', {'justGlow' : !actualMode}]"/>
                    </v-btn>
                </template>
            </v-text-field>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, onUnmounted, computed } from 'vue';
import { useMessageStore } from '@/stores/Message';
import { useAuthStore } from '@/stores/auth';
import storageManager from "@/JS/LocalStaorageManager";
import { getAvatarUrl } from '@/JS/GlobalFunctions';

// Stores
const messageStore = useMessageStore();
const authStore = useAuthStore();
const { getConversationsFromUser, addMessageFromUser } = useMessageStore();

// Refs
const messages = ref([]);
const newMessage = ref('');
const messageInput = ref(null);
let actualMode = ref(storageManager.getMode());
let actualLang = ref(storageManager.getLang());

// Props
const props = defineProps({
    userMessage: Object,
    actualLang: Boolean,
    actualMode: Boolean
});

// Computed
const currentUserId = authStore.user?.id;
const inputPlaceholder = computed(() => 
    props.actualLang ? 'Type a message...' : 'Tapez un message...'
);

// Constants
const AVATARS = {
    MINE: "/src/assets/p2.jpg",
    OTHER: "/src/assets/p1.jpg"
};

// Echo Management
const setupEchoListener = () => {
    if (!window.Echo || !messageStore.userFriend) return;

    const channel = window.Echo.private(`chat.${currentUserId}`);
    
    channel.listen('.MessageSent', handleIncomingMessage);
};

// Permet l utilisateur de quitter le chat
const removeEchoListener = () => {
    if (!window.Echo || !currentUserId) return;
    window.Echo.leave(`chat.${currentUserId}`);
};

const handleIncomingMessage = (event) => {
    console.log('🔔 New message event:', event);
    
    const messageData = event.conversation || event.message || event;
    if (!messageData) {
        console.warn('No message data found in event');
        return;
    }
    
    const processedMessages = processMessages([messageData], currentUserId);
    const newMessage = processedMessages[0];
    
    if (isValidMessage(newMessage)) {
        addMessageIfNotExists(newMessage);
    }
};

// Formate le message 
const processMessages = (messagesData, currentUserId) => {
    if (!Array.isArray(messagesData)) return [];

    return messagesData
        .filter(message => message && typeof message === 'object')
        .map(message => ({
            id: message.id ?? Date.now(),
            contenu: message.contenu ?? '',
            expediteur_id: message.expediteur_id,
            destinataire_id: message.destinataire_id,
            timestamp: message.date,
            isMine: message.expediteur_id === currentUserId,
            avatar: message.image_data,
            senderName: message.senderName || (message.expediteur_id === currentUserId ? "Me" : "Other User")
        }));
};

const isValidMessage = (message) => {
    return message && message.id && message.contenu;
};

const addMessageIfNotExists = (newMessage) => {
    const messageExists = messages.value.some(msg => msg.id === newMessage.id);
    if (!messageExists) {
        messages.value.push(newMessage);
        scrollToBottom();
       
    }
};

// Message Operations
const fetchMessages = async (userFriendId) => {
    if (!userFriendId) {
        messages.value = [];
        return;
    }

    try {
        removeEchoListener();
        
        const conversations = await getConversationsFromUser(userFriendId);
        messages.value = processMessages(conversations, currentUserId);
        
        setupEchoListener();
        scrollToBottom();
    } catch (error) {
        console.error("Error fetching messages:", error);
        messages.value = [];
    }
};

const sendMessage = async () => {
    const messageContent = newMessage.value.trim();
    if (!messageContent) return;

    try {
        const messageData = { contenu: messageContent };
        const sentMessage = await addMessageFromUser(messageStore.userFriend, messageData);

        if (sentMessage) {
            const processedMessage = processMessages([sentMessage], currentUserId)[0];
            addMessageIfNotExists(processedMessage);
        } else {
            // Fallback: Add local message
            const localMessage = createLocalMessage(messageContent);
            addMessageIfNotExists(localMessage);
        }

        resetMessageInput();
    } catch (error) {
        console.error("Error sending message:", error);
        // Fallback on error
        const localMessage = createLocalMessage(messageContent);
        addMessageIfNotExists(localMessage);
        resetMessageInput();
    }
};

const createLocalMessage = (content) => ({
    id: Date.now(),
    contenu: content,
    timestamp: new Date().toISOString(),
    expediteur_id: currentUserId,
    isMine: true,
    avatar: AVATARS.MINE,
    senderName: "Me"
});

const resetMessageInput = () => {
    newMessage.value = '';
    scrollToBottom();
    nextTick(() => messageInput.value?.focus());
};

// UI Helpers
const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    try {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
        return String(timestamp);
    }
};

const scrollToBottom = () => {
    nextTick(() => {
        const messageList = document.querySelector('.messagelist');
        if (messageList) {
            messageList.scrollTop = messageList.scrollHeight;
        }
    });
};

  const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
};


// Lifecycle
onMounted(() => {
    fetchMessages(messageStore.userFriend);
    window.addEventListener('lang-changed', handleLangChange);
});

watch(
    () => messageStore.userFriend,
    (newUser) => {
        fetchMessages(newUser);
    }
);

onUnmounted(() => {
    removeEchoListener();
    window.removeEventListener('lang-changed', handleLangChange);
});
</script>

<style src="../../styles/MessageStyle/MessageSections/MessageStyle.scss"></style>