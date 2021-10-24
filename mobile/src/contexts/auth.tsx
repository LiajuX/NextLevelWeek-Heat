import React, { createContext, ReactNode, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';

import { api } from '../services/api';

const CLIENT_ID = 'add4d36032009b37c0ee';
const SCOPE = 'read:user';

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
}

type AuthResponse = {
  token: string;
  user: User;
}

type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  }
  type?: string;
}

export const AuthContext = createContext({} as AuthContextData);  

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(true);

  const userStorageKey = '@nlwheat:user';
  const tokenStorageKey = '@nlwheat:token';

  useEffect(() => {
    async function loadUserDataFromStorage() {
      const userStorage = await AsyncStorage.getItem(userStorageKey); 
      const tokenStorage = await AsyncStorage.getItem(tokenStorageKey);

      if (userStorage && tokenStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;
  
        setUser(JSON.parse(userStorage));
      }

      setIsSigningIn(false);
    }
    
    loadUserDataFromStorage();
  }, []);

  async function signIn() {
    try {
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;

      const authSessionResponse = await AuthSession
      .startAsync({ authUrl }) as AuthorizationResponse;  

      const authSessionSucceeded = authSessionResponse.type === 'success';
      const authSessionWasNotDenied = authSessionResponse.params.error !== 'access_denied'

      const code = authSessionResponse.params.code;

      if (authSessionSucceeded && authSessionWasNotDenied) {
        const authResponse = await api.post('authenticate', { code });
      
        const { user, token } = authResponse.data as AuthResponse;
      
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await AsyncStorage.setItem(userStorageKey, JSON.stringify(user));
        await AsyncStorage.setItem(tokenStorageKey, token);

        setUser(user);
      }

    } catch (error) {
      console.log(error);

    } finally {
      setIsSigningIn(false);
    }
  }

  async function signOut() {
    setUser(null);

    await AsyncStorage.removeItem(userStorageKey); 
    await AsyncStorage.removeItem(tokenStorageKey);
  }

  return (
    <AuthContext.Provider value={{
      user,
      isSigningIn,
      signIn,
      signOut,
    }}>
      { children }
    </AuthContext.Provider>
  );
}
