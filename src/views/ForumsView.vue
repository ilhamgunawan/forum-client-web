<script lang="ts">
import type { AxiosError } from 'axios';
import type { ForumResponse } from '@/lib/forum';
import type { ErrorResponse } from '@/lib/error';
import ForumList from '@/components/forum/ForumList.vue';
import { mapState, mapActions } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { getForums } from '@/lib/forum';
import { makeErrorFromAxiosResponse } from '@/lib/error';

interface Data {
  forumsResponse: ForumResponse | undefined
  isLoading: boolean
}

export default {
  data(): Data {
    return {
      forumsResponse: undefined,
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
      getForums({ page: 1, token: this.auth.token })
        .then((res) => {
          // console.log('Success: ', res);
          this.forumsResponse = res.data;
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
  <main>
    <p v-if="isLoading" class="text-center">Now loading...</p>
    <ForumList
      v-if="forumsResponse"
      v-bind:forums="forumsResponse.posts"
    />
  </main>
</template>
