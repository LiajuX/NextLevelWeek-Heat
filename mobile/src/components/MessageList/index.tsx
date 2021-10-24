import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { io } from 'socket.io-client';

import { api } from '../../services/api';

import { Message, MessageProps } from '../Message';

import { styles } from './styles';

let messagesQueue: MessageProps[] = [];  

const socket = io(String(api.defaults.baseURL));
socket.on('new_message', (newMessage) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [latestMessages, setLatestMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      const messagesResponse = await api.get<MessageProps[]>('messages/last3');

      setLatestMessages(messagesResponse.data);
    }
    
    fetchMessages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setLatestMessages(prevState => [
          messagesQueue[0],
          prevState[0],
          prevState[1]
        ]);

        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [messagesQueue]);

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
      showsVerticalScrollIndicator={false}
    >
      {latestMessages.map((message) => 
        <Message key={`${message.id}+${message.created_at}`} data={message} />
      )}
    </ScrollView>
  );
}
