<template>
  <b-alert
    :show="countDown"
    variant="warning"
    dismissible
    @dismissed="countDown = 0"
    @dismiss-count-down="countDownChanged"
    >{{ message }}</b-alert
  >
</template>

<script>
export default {
  name: 'DisAlert',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      countDown: 10
    }
  },
  methods: {
    countDownChanged(count) {
      this.countDown = count
    }
  }
}
</script>

<style></style>
