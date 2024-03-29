<script lang="ts">
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { signIn } from '@/lib/auth';
import { makeErrorFromAxiosResponse, DEFAULT_ERR_MESSAGE } from '@/lib/error';

export default {
  name: 'SignInView',
  metaInfo: {
    title: 'Sign In - Forum',
  },
  data() {
    return {
      userName: '',
      password: '',
      errorMessage: '',
      isLoading: false,
    };
  },
  computed: {
    ...mapState(useAuthStore, ['auth']),
  },
  mounted() {
    if (this.auth) this.$router.replace('/forums');
  },
  methods: {
    ...mapActions(useAuthStore, ['setAuth']),
    handleFormSubmit() {
      if (this.isLoading) { return; }

      this.isLoading = true;
      this.errorMessage = '';

      signIn({
        username: this.userName,
        password: this.password,
      })
        .then((res) => {
          // console.log('Success: ', res);

          if (!res.data || !res.data.token) {
            this.errorMessage = DEFAULT_ERR_MESSAGE;
          }

          if (res.data && res.data.token) {
            this.setAuth(res.data);
            this.errorMessage = '';
            this.$router.replace('/forums');
          }

          this.isLoading = false;
        })
        .catch((err) => {
          // console.log('Error: ', err);

          const error = makeErrorFromAxiosResponse(err);
          this.errorMessage = error.message;
          this.isLoading = false;
        });
    },
  },
};
</script>

<template>
  <main class="h-screen flex items-center justify-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Sign In</h2>
        <div v-if="errorMessage !== ''" class="w-full max-w-xs">
          <div class="alert alert-error shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{{errorMessage}}</span>
            </div>
          </div>
        </div>
        <form
          v-on:submit.prevent="handleFormSubmit"
          class="flex flex-col gap-4"
        >
          <div class="form-control w-full max-w-xs">
            <label for="username" class="pb-1 label-text">Username</label>
            <input v-model="userName" required id="username" type="text" placeholder="Type username here" class="input input-bordered w-full max-w-xs" />
          </div>
          <div class="form-control w-full max-w-xs">
            <label for="password" class="pb-1 label-text">Password</label>
            <input v-model="password" required id="password" type="password" placeholder="Type password here" class="input input-bordered w-full max-w-xs" />
          </div>
          <div class="form-control w-full max-w-xs">
            <button
              type="submit"
              class="btn btn-primary"
              v-bind:class="{ loading: isLoading }"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
