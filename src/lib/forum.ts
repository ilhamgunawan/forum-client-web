/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import type { AxiosResponse } from 'axios';
import config from '../../app.config';

export interface Forum {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: number
}

export type ForumResponse = {
  posts: Forum[]
  total: number
  skip: number
  limit: number
};

export type GetForumsResponse = AxiosResponse<ForumResponse>;

type GetForumRequest = {
  token: string
  page: number
};

export async function getForums(req: GetForumRequest): Promise<GetForumsResponse> {
  const limit = 20;
  const skip = (req.page - 1) * limit;
  const url = new URL(`${config.apiUrl}auth/posts`);
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('skip', skip.toString());
  return axios({
    method: 'get',
    url: url.toString(),
    headers: {
      Authorization: `Bearer ${req.token}`,
      'Content-Type': 'application/json',
    },
  });
}
