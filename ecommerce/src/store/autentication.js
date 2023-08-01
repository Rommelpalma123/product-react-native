import { create } from 'zustand';
import { adminLogin } from '../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateStorage } from 'zustand/middleware';

export const useAutentication = create(set => ({
  token: null,
  usuario: null,
  isLogin: false,
  error: null,
  login: async (email, password) => {
    try {
      console.log(email, password);
      const { token, userAdmin } = await adminLogin({ email, password });
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.getItem('token');
      set({ token, usuario: userAdmin, isLogin: true, error: null });
    } catch (error) {
      console.log('error to login', error);
      set({ error: 'Credenciales incorrectas' });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
    set({ token: null, user: null, isLogin: false });
  },
}));
