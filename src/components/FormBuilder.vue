<template>
  <FormulateForm v-if="form" ref="formulate" v-model="form.values">
    <FormulateInput
      v-for="field in form.fields"
      :key="field.name"
      v-bind="field"
    />
  </FormulateForm>
</template>

<script>
import * as forms from '@/forms'

export default {
  name: 'FormBuilder',
  props: {
    schema: {
      type: String,
      required: true
    }
  },
  data() {
    let form = null
    try {
      form = forms[this.schema]()
    } catch {
      this.$store.commit({
        type: 'alert',
        text: '网页故障，未找到相应表单'
      })
    }
    return {
      form
    }
  },
  methods: {
    async values() {
      if (await this.$refs.formulate.hasValidationErrors()) {
        this.$store.commit({
          type: 'alert',
          text: '请正确填写信息',
          variant: 'danger'
        })
        return false
      } else {
        return this.form.values
      }
    }
  }
}
</script>

<style></style>
