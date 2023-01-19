/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { AES, enc } from 'crypto-js';
import config from '../../app.config';

type SignIn = {
  username: string
  password: string
};

export interface Auth {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
}

export type SignInResponse = AxiosResponse<Auth>;

export async function signIn(data: SignIn): Promise<SignInResponse> {
  return axios({
    method: 'post',
    url: `${config.apiUrl}auth/login`,
    headers: { 'Content-Type': 'application/json' },
    data,
  });
}

export function getDefaultAuthState() {
  const encryptedAuth = localStorage.getItem('a');
  if (!encryptedAuth) return null;
  const decryptedAuth = AES.decrypt(encryptedAuth, 'rahasia').toString(enc.Utf8);
  return JSON.parse(decryptedAuth) as Auth;
}

export function setDefaultAuthState(auth: Auth) {
  const encrypted = AES.encrypt(JSON.stringify(auth), 'rahasia');
  localStorage.setItem('a', encrypted.toString());
}
