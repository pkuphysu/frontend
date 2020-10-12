<script>
import marked from 'marked'
import DOMPurify from 'dompurify'

export default {
  name: 'MarkdownView',
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
    const response = await fetch(`${process.env.BASE_URL}${this.src}.md`)
    const content = await response.text()
    if (content.startsWith('<!DOCTYPE html>')) {
      this.content = '## 这里没有文档'
    } else this.content = content
  },
  render (createElement) {
    return createElement(
      'div', {
        class: ['markdown-view', 'mx-3'],
        domProps: {
          innerHTML: this.content
            ? DOMPurify.sanitize(marked(this.content))
            : ''
        }
      }
    )
  }
}
</script>

<style>
.markdown-view img{
  max-width: 100%;
}
</style>
