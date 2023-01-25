<template>
  <div class="btn-group">
    <router-link
      class="btn"
      v-bind:to="`/forums?page=${pagination.previousPage}`"
      v-bind:disabled="pagination.previousPage === -1"
    >
      «
    </router-link>
    <button type="button" class="btn">{{ pagination.currentPage }}</button>
    <router-link
      class="btn"
      v-bind:to="`/forums?page=${pagination.nextPage}`"
      v-bind:disabled="pagination.nextPage === -1"
    >
      »
    </router-link>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { Pagination } from '@/lib/pagination';

export default {
  props: {
    pagination: {
      type: Object as PropType<Pagination>,
      required: true,
    },
  },
};
</script>
