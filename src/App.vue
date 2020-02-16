<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
    <div>
      <b-navbar toggleable="lg" type="dark" variant="primary" right>
        <b-navbar-brand href="#">PKU Physics</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/bookB116">主页</b-nav-item>
            <b-nav-item @click="logout">注销</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
    <div class="px-3 position-fixed fixed-bottom m-0">
      <DisAlert
        v-for="(message, i) in $store.state.alertMessages"
        :key="message.text + i"
        :message="message"
      />
    </div>
    <div class="text-center">
      &copy; 2019 北大物理. &nbsp;
      <a href="/html/feedback">问题反馈</a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import DisAlert from '@/components/DisAlert'

export default {
  name: 'App',
  components: {
    DisAlert
  },
  methods: {
    logout() {
      this.$router.push('/login')
      this.$store.commit('logout')
    }
  }
}
</script>

<style>
</style>
