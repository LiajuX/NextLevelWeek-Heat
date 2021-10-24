import React, { useState } from 'react';
import { Alert, Keyboard, TextInput, View } from 'react-native';

import { api } from '../../services/api';

import { Button } from '../Button';

import { colors } from '../../theme';

import { styles } from './styles';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  async function handleMessageSubmit() {
    const messageFormatted = message.trim();

    if (messageFormatted.length > 0) {
      setIsSendingMessage(true);

      await api.post('messages', { message: messageFormatted });

      setMessage('');
      Keyboard.dismiss();
      setIsSendingMessage(false);
      Alert.alert('Mensagem enviada com sucesso!');

    } else {
      Alert.alert('Escreva a mensagem para enviar.');
    }
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Qual sua expectativa para o evento?"
        placeholderTextColor={colors.gray_primary}
        keyboardAppearance="dark"
        editable={!isSendingMessage}
        maxLength={140}
        multiline
      />

      <Button 
        title="Enviar mensagem"
        color={colors.white}
        backgroundColor={colors.pink}
        isLoading={isSendingMessage}
        onPress={handleMessageSubmit}
      />
    </View>
  );
}
