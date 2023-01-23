<script lang="ts">
import type { Forum } from '@/lib/forum';
import ForumItem from './ForumItem.vue';

export default {
  components: { ForumItem },
  props: {
    forums: {
      type: Array<Forum>,
      required: true,
    },
  },
  watch: {
    forums(newValue: Forum[]) {
      console.log('forums: ', newValue);
    },
  },
};
</script>

<template>
  <div class="w-full flex flex-col gap-4 p-4">
    <ForumItem
      v-for="forum in $props.forums"
      v-bind:key="forum.id"
      v-bind:forum="forum"
    />
  </div>
</template>
