<template>
  <b-alert
    :show="countDown"
    :variant="message.variant || 'warning'"
    dismissible
    @dismissed="countDown = 0"
    @dismiss-count-down="countDownChanged"
  >
    {{ message.text }}
  </b-alert>
</template>

<script>
export default {
  name: 'DisAlert',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      countDown: 10
    }
  },
  methods: {
    countDownChanged (count) {
      this.countDown = count
    }
  }
}
</script>

<style></style>
