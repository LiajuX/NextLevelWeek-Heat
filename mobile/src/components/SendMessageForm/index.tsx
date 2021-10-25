import React, { useState } from 'react';
import { Alert, Keyboard, TextInput, View } from 'react-native';

import { api } from '../../services/api';

import { Button } from '../Button';
import { Toast } from '../Toast';

import { colors } from '../../theme';

import { styles } from './styles';

type ToastProps = {
  title: string;
  type: 'success' | 'warning';
}

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [toastInfos, setToastInfos] = useState<ToastProps>({} as ToastProps);

  async function handleMessageSubmit() {
    const messageFormatted = message.trim();

    if (messageFormatted.length > 0) {
      setIsSendingMessage(true);

      await api.post('messages', { message: messageFormatted });

      setMessage('');
      Keyboard.dismiss();
      setIsSendingMessage(false);

      setToastInfos({
        title: 'Mensagem enviada com sucesso!',
        type: 'success'
      });

    } else {
      Alert.alert('Escreva a mensagem para enviar');
    }
  }

  return (
    <>
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

      <Toast 
        isVisible={isSendingMessage}
        title={toastInfos.title}
        type={toastInfos.type}
      />
    </>
  );
}
