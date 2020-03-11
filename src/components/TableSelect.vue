<template>
  <b-card-body v-if="bookingInfo" class="p-2">
    <b-table-simple class="text-center" bordered fixed>
      <b-thead>
        <b-tr>
          <b-th v-for="room in B116ROOMS" :key="room" class="px-0">
            {{
            room
            }}
          </b-th>
        </b-tr>
      </b-thead>
    </b-table-simple>
    <b-table-simple class="text-center room" bordered fixed>
      <b-tbody v-if="bookingInfo">
        <b-tr v-for="j in BOOK_HOUR_END - BOOK_HOUR_START + 1" :key="j">
          <b-td
            v-for="(room, roomIndex) in B116ROOMS"
            :key="room"
            class="py-1"
            :class="{
              'td-booked': bookingInfo[selectedDayIndex][roomIndex].includes(
                j + BOOK_HOUR_START - 1
              ),
              'td-selected':
                selectingRoom === roomIndex &&
                (selectStart - j + 1) * (selectEnd - j + 1) <= 0
            }"
          >
            <span
              @touchstart="touchstart"
              @touchmove="touchmove"
              @touchend="touchend"
            >{{ j + BOOK_HOUR_START - 1 }}点段</span>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </b-card-body>
</template>

<script>
import CONSTS from '@/consts'
import api from '@/api'

export default {
  name: 'TableSelect',
  props: {
    selectedDayIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      bookingInfo: null,
      selecting: false,
      selectingRoom: null,
      selectStart: null,
      selectEnd: null,
      ...CONSTS
    }
  },
  watch: {
    selectedDayIndex() {
      this.selectingRoom = this.selectStart = this.selectEnd = null
    }
  },
  async created() {
    let response = (await api.bookingAll()).data
    const dayCount = this.BOOK_DAY_FARTHEST - this.BOOK_DAY_NEAREST + 1
    const hourCount = this.BOOK_HOUR_END - this.BOOK_HOUR_START + 1
    let bookingInfo = new Array(dayCount)
    for (let i = 0; i < dayCount; i++) {
      bookingInfo[i] = new Array(hourCount)
      for (let j = 0; j < hourCount; j++) bookingInfo[i][j] = []
    }
    for (let record of response) {
      for (let i = record.start; i <= record.end; i++)
        bookingInfo[record.day - this.BOOK_DAY_NEAREST][record.roomId].push(i)
    }
    this.bookingInfo = bookingInfo
  },
  methods: {
    touchstart(e) {
      if (this.selecting) return
      this.selecting = true
      let td = e.target.parentElement
      this.selectingRoom = td.cellIndex
      this.selectStart = this.selectEnd = td.parentElement.rowIndex
    },
    touchmove(e) {
      if (!this.selecting) return
      let point = e.touches[0]
      let span = document.elementFromPoint(point.clientX, point.clientY)
      if (span.tagName === 'TD' && span.className.includes('td-booked'))
        this.selecting = false
      if (
        span.tagName === 'SPAN' &&
        span.parentElement.cellIndex === this.selectingRoom &&
        Math.abs(this.selectStart - this.selectEnd) < this.BOOK_MAX_SELECT - 1
      )
        this.selectEnd = span.parentElement.parentElement.rowIndex
    },
    touchend() {
      if (this.selecting) {
        this.selecting = false
        this.$emit('selected', {
          room: this.selectingRoom,
          time: [
            this.selectStart + this.BOOK_HOUR_START,
            this.selectEnd + this.BOOK_HOUR_START
          ].sort((a, b) => a - b)
        })
      }
    }
  }
}
</script>

<style>
.td-selected,
.td-booked {
  background-color: darkslategray;
  color: aliceblue;
}
.td-booked span {
  display: none;
}
.td-booked::after {
  content: '已预约';
}
.room {
  border-collapse: separate;
  /* border-spacing: 6px 4px; */
  border: 0px;
}
.room {
  touch-action: none;
}
</style>
