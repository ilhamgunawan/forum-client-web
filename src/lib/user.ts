/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import type { AxiosResponse } from 'axios';
import config from '../../app.config';

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  birthDate: string
  image: string
}

export type GetUserByIdResponse = AxiosResponse<User>;

export type GetUserByIdRequest = {
  id: number
  token: string
};

export async function getUserById(req: GetUserByIdRequest): Promise<GetUserByIdResponse> {
  const url = new URL(`${config.apiUrl}auth/users/${req.id}`);
  return axios({
    method: 'get',
    url: url.toString(),
    headers: {
      Authorization: `Bearer ${req.token}`,
      'Content-Type': 'application/json',
    },
  });
}
