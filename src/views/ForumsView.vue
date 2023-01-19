<script lang="ts">
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores/auth';

export default {
  computed: {
    ...mapState(useAuthStore, ['auth']),
  },
  mounted() {
    if (!this.auth) this.$router.replace('/auth/signin');
  },
};

</script>

<template>
  <main>
    <h1>Hello world from Forum page!</h1>
  </main>
</template>
