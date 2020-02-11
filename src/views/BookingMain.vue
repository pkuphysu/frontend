<template>
  <div role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button v-b-toggle.accordion-1 block href="#" variant="info">选择日期</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-table-simple id="date-picker" bordered>
            <b-tbody>
              <b-tr id="date-content">
                <b-td
                  v-for="i in (BOOK_DAY_FARTHEST - BOOK_DAY_NEAREST + 1)"
                  :key="i"
                  class="px-0 text-center"
                  :class="{'td-selected': selectedDateDelta === i + BOOK_DAY_NEAREST - 1}"
                  @click="selectedDateDelta = i + BOOK_DAY_NEAREST - 1"
                >{{formatDateAhead(i + BOOK_DAY_NEAREST - 1)}}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button v-b-toggle.accordion-2 block href="#" variant="info">选择房间</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body class="p-2">
          <b-table-simple class="text-center room" bordered fixed>
            <b-thead>
              <b-tr>
                <b-th v-for="room in B116ROOMS" :key="room" class="px-0">{{ room }}</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="j in BOOK_HOUR_END - BOOK_HOUR_START + 1" :key="j">
                <b-td v-for="room in B116ROOMS" :key="room" class="py-1">
                  <span>{{ j + BOOK_HOUR_START - 1 }}:00</span>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button v-b-toggle.accordion-3 block href="#" variant="info">Accordion 3</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>{{ text }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import CONSTS from '@/consts'

const today = new Date().setHours(0, 0, 0, 0)

export default {
  name: 'BookingMain',
  data() {
    return {
      text: 'llal',
      selectedDateDelta: 3,
      ...CONSTS
    }
  },
  methods: {
    formatDateAhead(delta) {
      let d = new Date(today + delta * 86400000)
      return `${d.getMonth() + 1}-${d.getDate()}`
    }
  }
}
</script>

<style>
.td-selected {
  background: darkslategray;
  color: aliceblue;
}
.room {
  border-collapse: separate;
  border-spacing: 6px 4px;
  border: 0px;
}
</style>
