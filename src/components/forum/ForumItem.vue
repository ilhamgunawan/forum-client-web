<script lang="ts">
import type { PropType } from 'vue';
import type { AxiosError } from 'axios';
import type { Forum } from '@/lib/forum';
import type { User } from '@/lib/user';
import type { ErrorResponse } from '@/lib/error';
import { makeErrorFromAxiosResponse } from '@/lib/error';
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { getUserById } from '@/lib/user';

interface Data {
  user: User | undefined
}

export default {
  props: {
    forum: {
      type: Object as PropType<Forum>,
      required: true,
    },
  },
  data(): Data {
    return {
      user: undefined,
    };
  },
  computed: {
    ...mapState(useAuthStore, ['auth']),
  },
  mounted() {
    if (this.auth) {
      getUserById({ id: this.forum.userId, token: this.auth.token })
        .then((res) => {
          // console.log('Success: ', res);
          this.user = res.data;
        })
        .catch((reason: AxiosError<ErrorResponse>) => {
          // console.log('Error: ', reason);
          const error = makeErrorFromAxiosResponse(reason);
          console.log('error: ', error);
        });
    }
  },
};
</script>
<template>
  <router-link
    v-bind:to="`/forums/${forum.id}`"
  >
    <div class="card w-full bg-base-100 shadow-md border border-zinc-700 transition-all hover:bg-zinc-800 hover:shadow-xl">
      <div class="card-body flex flex-row p-3">
        <div class="avatar w-10 h-10 flex-none">
          <div class="rounded-full">
            <router-link
              v-bind:to="`/users/${forum.userId}`"
            >
              <img
                v-if="user"
                v-bind:src="`${user.image}`"
                v-bind:alt="`${user.firstName}`"
              />
            </router-link>
          </div>
        </div>
        <div class="shrink">
          <div class="flex items-center justify-between gap-1">
            <h2 class="card-title text-sm line-clamp-1">{{ forum.title }}</h2>
            <div class="flex items-center">
              <font-awesome-icon icon="fa-regular fa-comment" class="mr-1 fa-xs text-gray-400" />
              <span class="text-xs text-gray-400">{{ forum.reactions }}</span>
            </div>
          </div>
          <router-link
            v-if="user"
            v-bind:to="`/users/${user.id}`"
            class="text-primary text-xs transition-all hover:underline"
          >
            {{ user.firstName }} {{ user.lastName }}
          </router-link>
          <p class="text-xs text-gray-500 line-clamp-2">{{ forum.body }}</p>
        </div>
      </div>
      <div class="flex flex-row justify-end gap-1 pb-3 px-3">
        <div>
          <div
            v-for="tag in forum.tags"
            v-bind:key="tag"
            class="badge badge-primary text-xs mr-1">
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
