<template>
  <b-container>
    <h2>请登录</h2>
    <b-input-group>
      <b-form-input id="stu_id" type="number" placeholder="学号" autofocus />
      <b-input-group-append>
        <b-button variant="primary" :disabled="!!countDown" @click="getCode">
          {{
          countDown === null
          ? '获取验证码'
          : countDown === 0
          ? '再次获取'
          : `稍等(${countDown})`
          }}
        </b-button>
      </b-input-group-append>
    </b-input-group>
    <b-form class="pt-3" @submit.prevent.stop>
      <b-form-input id="vercode" type="number" placeholder="验证码" required />
      <b-checkbox id="checkbox" name="remember">记住账号</b-checkbox>
      <b-button lg variant="primary" block type="submit">登录</b-button>
    </b-form>
  </b-container>
</template>

<script>
import {sleep} from '@/utils'

export default {
  name: 'Login',
  data() {
    return {
      countDown: null
    }
  },
  methods: {
    async getCode() {
      await sleep(100)
      this.countDown = 5
      while((--this.countDown)) await sleep(1000)
    }
  }
}
</script>

<style>
</style>
