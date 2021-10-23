import { useAuth } from './hooks/useAuth';

import { MessageList } from './components/MessageList';
import { SendMessageForm } from './components/SendMessageForm';
import { LoginBox } from './components/LoginBox';

import styles from './App.module.scss';

export function App() {
  const { user } = useAuth();

  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
      <MessageList />

      { !!user ? <SendMessageForm /> : <LoginBox /> }
    </main>
  );
}

