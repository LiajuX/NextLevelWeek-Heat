import { FormEvent, useState } from 'react';
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
        />

        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
}
