<script lang="ts">
import type { AxiosError } from 'axios';
import type { ForumResponse } from '@/lib/forum';
import type { ErrorResponse } from '@/lib/error';
import type { Pagination } from '@/lib/pagination';
import ForumList from '@/components/forum/ForumList.vue';
import { mapState, mapActions } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { getForums } from '@/lib/forum';
import { makeErrorFromAxiosResponse } from '@/lib/error';
import { getPagination } from '@/lib/pagination';

interface Data {
  forumsResponse: ForumResponse | undefined
  pagination: Pagination | undefined
  page: number
  isLoading: boolean
}

export default {
  data(): Data {
    return {
      forumsResponse: undefined,
      pagination: undefined,
      page: parseInt(this.$route.query.page as string ?? '1', 10),
      isLoading: true,
    };
  },
  metaInfo: {
    title: 'Timeline - Forum',
  },
  computed: {
    ...mapState(useAuthStore, ['auth']),
  },
  components: { ForumList },
  methods: {
    ...mapActions(useAuthStore, ['clearAuth']),
  },
  mounted() {
    if (this.auth) {
      getForums({ page: this.page, token: this.auth.token })
        .then((res) => {
          // console.log('Success: ', res);
          this.forumsResponse = res.data;
          this.pagination = getPagination({
            countCurrentPage: res.data.posts.length,
            countTotal: res.data.total,
            currentPage: this.page,
            limit: res.data.limit,
          });
          this.isLoading = false;
        })
        .catch((reason: AxiosError<ErrorResponse>) => {
          // console.log('Error: ', reason);

          const error = makeErrorFromAxiosResponse(reason);
          console.log('error: ', error);

          if (error.status === 'UNAUTHORIZED') {
            this.clearAuth();
            this.$router.replace('/auth/signin');
          }

          this.isLoading = false;
        });
    } else {
      this.$router.replace('/auth/signin');
    }
  },
};

</script>

<template>
  <main class="max-w-2xl m-auto">
    <p v-if="isLoading" class="text-center">Now loading...</p>
    <ForumList
      v-if="forumsResponse"
      v-bind:forums="forumsResponse.posts"
    />
  </main>
</template>
