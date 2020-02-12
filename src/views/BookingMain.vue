<template>
  <div role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button v-b-toggle.accordion-1 block href="#" variant="info"
          >选择日期</b-button
        >
      </b-card-header>
      <b-collapse
        id="accordion-1"
        visible
        accordion="my-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <b-table-simple id="date-picker" bordered>
            <b-tbody>
              <b-tr id="date-content">
                <b-td
                  v-for="i in BOOK_DAY_FARTHEST - BOOK_DAY_NEAREST + 1"
                  :key="i"
                  class="px-0 text-center"
                  :class="{
                    'td-selected': selectedDayIndex === i - 1
                  }"
                  @click="selectedDayIndex = i - 1"
                  >{{ formatDateAhead(i + BOOK_DAY_NEAREST - 1) }}</b-td
                >
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button v-b-toggle.accordion-2 block href="#" variant="info"
          >选择房间</b-button
        >
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <table-select
          :selected-day-index="selectedDayIndex"
          @selected="timeSelected"
        />
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button v-b-toggle.accordion-3 block href="#" variant="info"
          >预约信息填写</b-button
        >
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-form @submit.stop.prevent>
            <b-row
              v-for="field in formFields"
              :key="field.id"
              align-v="center"
              class="my-1"
              no-gutters
            >
              <b-col cols="md-2">
                <label :for="field.id" class="display-5 my-1 px-0">
                  {{ field.label }}
                </label>
              </b-col>
              <b-col cols="md-10">
                <b-form-textarea
                  v-if="field.type == 'textarea'"
                  :id="field.id"
                  v-model="formAnswers[field.id]"
                  :placeholder="field.placeholder"
                  required
                />
                <!-- <b-form-input
                  v-else-if="field.type == 'number'"
                  :id="field.id"
                  v-model.number="formAnswers[field.id]"
                  type="number"
                  :placeholder="field.placeholder"
                  required
                />-->
                <b-form-input
                  v-else
                  :id="field.id"
                  v-model="formAnswers[field.id]"
                  :type="field.type"
                  :placeholder="field.placeholder"
                  :state="
                    field.length == undefined ||
                    formAnswers[field.id] == undefined
                      ? null
                      : field.length == formAnswers[field.id].length
                  "
                  required
                />
              </b-col>
            </b-row>
            <b-button type="submit" variant="primary" block>Submit</b-button>
          </b-form>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import CONSTS from '@/consts'
import TableSelect from '@/components/TableSelect'

const today = new Date().setHours(0, 0, 0, 0)

export default {
  name: 'BookingMain',
  components: {
    TableSelect
  },
  data() {
    return {
      text: 'llal',
      selectedDayIndex: 0,
      ...CONSTS,
      formFields: [
        {
          label: '预约人姓名',
          placeholder: '姓名',
          type: 'text',
          id: 'name'
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
          id: 'studentNumber'
        },
        {
          label: '参与学生1',
          placeholder: '学号',
          type: 'number',
          id: 'student1',
          length: 10
        },
        {
          label: '参与学生2',
          placeholder: '学号',
          type: 'number',
          id: 'student2',
          length: 10
        },
        {
          label: '预约用途',
          placeholder: '用途',
          type: 'textarea',
          id: 'description'
        }
      ],
      formAnswers: {}
    }
  },
  methods: {
    formatDateAhead(delta) {
      let d = new Date(today + delta * 86400000)
      return `${d.getMonth() + 1}-${d.getDate()}`
    },
    timeSelected(data) {
      console.log(data)
    }
  }
}
</script>

<style></style>
