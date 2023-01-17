/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import type { AxiosResponse } from 'axios';
import config from '../../app.config';

type SignIn = {
  username: string
  password: string
};

export interface SignInData {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
}

export type SignInResponse = AxiosResponse<SignInData>;

export async function signIn(data: SignIn): Promise<SignInResponse> {
  return axios({
    method: 'post',
    url: `${config.apiUrl}auth/login`,
    headers: { 'Content-Type': 'application/json' },
    data,
  });
}
