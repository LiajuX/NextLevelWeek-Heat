import { FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';

import { useAuth } from '../../hooks/useAuth';

import { api } from '../../services/api';

import sealImg from '../../assets/seal.svg';

import styles from './styles.module.scss';

export function SendMessageForm() {
  const { user, signOut } = useAuth();

  const [message, setMessage] = useState('');

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    await api.post('messages', { message });

    setMessage('');

    showToast();
  }

  function showToast() {
      toast('Mensagem enviada com sucesso!',
      {
        duration: 3000,
        style: {
          padding: '16px 28px',
          borderRadius: 0,
          color: '#FFFFFF',
          background: '#1B873F',
        },
      }
    );
  } 

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size={32} />
      </button>

      <img 
        src={sealImg}
        className={styles.sealImage}
        alt="Build the Future - Rocketseat" 
      />
      
      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>

        <strong className={styles.userName}>{ user?.name }</strong>

        <span className={styles.userGithub}>
          <VscGithubInverted />
          { user?.login }
        </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>

        <textarea
          id="message"
          name="message"
          value={message}
          placeholder="Qual sua expectativa para o evento"
          onChange={event => setMessage(event.target.value)}
          maxLength={140}
        />

        <button type="submit">Enviar mensagem</button>
      </form>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
}
