<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="primary" right>
        <b-navbar-brand href="#">
          PKU Physics
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/bookB116">
              主页
            </b-nav-item>
            <b-nav-item-dropdown text="注销">
              <b-dropdown-item @click="logout">
                本机注销
              </b-dropdown-item>
              <b-dropdown-item @click="fullLogout">
                全部注销
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <b-container style="min-height: 70vh">
      <router-view />
    </b-container>
    <div class="px-3 position-fixed fixed-bottom m-0">
      <DisAlert
        v-for="(message, i) in $store.state.alertMessages"
        :key="message.text + i"
        :message="message"
      />
    </div>
    <footer class="text-center py-3">
      &copy; 2019 北大物理.  &nbsp;
      <router-link to="/html/feedback">
        问题反馈
      </router-link>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import DisAlert from '@/components/DisAlert'
import api from '@/api'

export default {
  name: 'App',
  components: {
    DisAlert
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push('/login')
    },
    async fullLogout () {
      await api.fullLogout()
      this.logout()
    }
  }
}
</script>

<style></style>
