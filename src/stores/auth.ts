/* eslint-disable import/prefer-default-export */
import { defineStore } from 'pinia';
import { getDefaultAuthState, setDefaultAuthState } from '@/lib/auth';
import type { Auth } from '@/lib/auth';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    auth: getDefaultAuthState(),
  }),
  getters: {
    getAuth: (state) => state.auth,
    getToken: (state) => state.auth?.token,
  },
  actions: {
    setAuth(auth: Auth) {
      this.auth = auth;
      setDefaultAuthState(auth);
    },
  },
});
