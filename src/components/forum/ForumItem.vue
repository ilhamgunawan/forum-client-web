<script lang="ts">
import type { PropType } from 'vue';
import type { Forum } from '@/lib/forum';

export default {
  props: {
    forum: {
      type: Object as PropType<Forum>,
      required: true,
    },
  },
};
</script>
<template>
  <router-link
    v-bind:to="`/forums/${forum.id}`"
  >
    <div class="card w-full bg-base-100 shadow-xl">
      <div class="card-body flex flex-row">
        <div class="avatar w-10 h-10 flex-none">
          <div class="rounded-full">
            <router-link
              v-bind:to="`/users/${forum.userId}`"
            >
              <img src="https://placeimg.com/192/192/people" alt="Avatar" />
            </router-link>
          </div>
        </div>
        <div class="shrink">
          <h2 class="card-title">{{ forum.title }}</h2>
          <router-link
            to="/users/1"
            class="text-primary transition-all hover:underline"
          >
            Stephen McMahon
          </router-link>
          <p>{{ forum.body }}</p>
        </div>
      </div>
      <div class="flex flex-col items-end lg:flex-row lg:justify-between gap-1 pb-8 px-8">
        <div>
          <div class="badge badge-accent mr-1">book</div>
          <div class="badge badge-accent mr-1">education</div>
          <div class="badge badge-accent">self-help</div>
        </div>
        <div>
          <font-awesome-icon icon="fa-regular fa-comment" class="mr-1" />
          <span>{{ forum.reactions }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>
