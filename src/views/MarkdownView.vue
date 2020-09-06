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
  data () {
    return {
      content: null
    }
  },
  async created () {
    const response = await fetch(`/${this.src}.md`)
    const content = await response.text()
    if (content.startsWith('<!DOCTYPE html>')) {
      this.content = '## 这里没有文档'
    } else this.content = content
  }
}
</script>

<style></style>
