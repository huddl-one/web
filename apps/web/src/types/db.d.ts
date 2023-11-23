interface ChatMessage {
    id: string;
    text: string;
    senderId: string;
    timestamp: number;
}

interface Chat {
    id: string;
    messages: ChatMessage[];
}

interface GroupChatMessage {
    id: string;
    senderId: string;
    groupId: string;
    text: string;
    timestamp: number;
}

interface GroupChat {
    id: string;
    userIds: string[];
    messages: ChatMessage[];
}

interface User {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
}

interface GroupMeta {
    id: string;
    name: string;
    description: string;
}