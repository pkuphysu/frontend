<template>
  <b-card-body>
    <b-form ref="form" @submit.prevent.stop>
      <b-row v-for="field in formFields" :key="field.id" align-v="center" class="my-1" no-gutters>
        <b-col cols="md-2">
          <label :for="field.id" class="display-5 my-1 px-0">{{ field.label }}</label>
        </b-col>
        <b-col cols="md-10">
          <b-form-textarea
            v-if="field.type == 'textarea'"
            :id="field.id"
            v-model="formAnswers[field.id]"
            :placeholder="field.placeholder"
            required
          />
          <b-form-input
            v-else
            :id="field.id"
            v-model="formAnswers[field.id]"
            :type="field.type"
            :placeholder="field.placeholder"
            :state="
              field.length == undefined || formAnswers[field.id] == undefined
                ? null
                : field.length == formAnswers[field.id].length
            "
            required
          />
        </b-col>
      </b-row>

      <b-button ref="submit" type="submit" hidden />
    </b-form>
  </b-card-body>
</template>

<script>
export default {
  name: 'BookingForm',
  data() {
    return {
      countDown: null,
      allFormReady: false,
      formValid: false,
      formAnswers: {
        sponsor: 'qwe',
        contact: '12345678909',
        stu_num: '1',
        stu1: '1800011308',
        stu2: '1800011308',
        description: '1'
      },
      formFields: [
        {
          label: '预约人姓名',
          placeholder: '姓名',
          type: 'text',
          id: 'sponsor'
        },
        {
          label: '联系方式',
          placeholder: '预约人电话',
          type: 'number',
          id: 'contact',
          length: 11
        },
        {
          label: '房间使用人数',
          placeholder: '人数',
          type: 'number',
          id: 'stu_num'
        },
        {
          label: '参与学生1',
          placeholder: '学号',
          type: 'number',
          id: 'stu1',
          length: 10
        },
        {
          label: '参与学生2',
          placeholder: '学号',
          type: 'number',
          id: 'stu2',
          length: 10
        },
        {
          label: '预约用途',
          placeholder: '用途',
          type: 'textarea',
          id: 'description'
        }
      ]
    }
  },
  methods: {
    submit() {
      for (let input of this.$refs.form.elements) {
        if (input.tagName === 'BUTTON') continue
        if (!input.value) {
          this.alert('请填写 ' + input.labels[0].innerText)
          this.$refs.submit.click()
          return false
        }
        if (input.className.includes('invalid')) {
          this.alert('请正确填写 ' + input.labels[0].innerText)
          return false
        }
      }
      return true
    },
    alert(text) {
     this.$store.commit({
            type: 'alert',
            text: text,
            variant: 'danger'
          }) 
    }
  }
}
</script>

<style></style>
