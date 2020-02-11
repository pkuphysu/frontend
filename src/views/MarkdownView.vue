<template>
  <vue-markdown v-if="content" :source="content" class="m-2" />
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'MarkdownView',
  components: {
    VueMarkdown
  },
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      content: null
    }
  },
  async created() {
    let response = await fetch(`/${this.src}.md`)
    this.content = await response.text()
  }
}
</script>

<style>
</style>
