<template>
  <b-card-body v-if="bookingInfo" class="p-2">
    <b-table-simple class="text-center" bordered fixed>
      <b-thead>
        <b-tr>
          <b-th v-for="room in B116ROOMS" :key="room" class="px-0">
            {{ room }}
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
            @touchstart.capture="pointerStart"
            @touchmove.capture="pointerMove"
            @touchend.capture="pointerEnd"
            @mousedown.capture="pointerStart"
            @mousemove.capture="pointerMove"
            @mouseup.capture="pointerEnd"
          >
            <!-- Use capture to include event in span -->
            <span>{{ j + BOOK_HOUR_START - 1 }}点段</span>
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
    targetTD(e) {
      if (e.target.tagName === 'SPAN') return e.target.parentElement
      if (e.target.tagName === 'TD') return e.target
    },
    pointerStart(e) {
      if (this.selecting) return
      this.selecting = true
      let td = this.targetTD(e)
      this.selectingRoom = td.cellIndex
      this.selectStart = this.selectEnd = td.parentElement.rowIndex
    },
    /**
     * The logic needs to be improved.
     * Currently, the handler evaluates BOOK_MAX_SELECT and booked whenever
     * the pointer moves onto SPAN or TD. But if user drag too fast...
     * @param {MouseEvent|TouchEvent} e - The event
     * @returns {}
     */
    pointerMove(e) {
      if (!this.selecting) return
      let point = e.touches ? e.touches[0] : e
      let tds = document
        .elementsFromPoint(point.clientX, point.clientY)
        .filter(ele => ele.tagName === 'TD')
      // Maybe out side the table
      if (!tds) {
        this.selecting = false
        return
      }
      let td = tds[0]
      if (
        td.className.includes('td-booked') ||
        // Not seleting on the same day
        td.cellIndex !== this.selectingRoom
      ) {
        this.selecting = false
        return
      }
      // Not exceeding the limit
      if (
        Math.abs(this.selectStart - this.selectEnd) <
        this.BOOK_MAX_SELECT - 1
      )
        this.selectEnd = td.parentElement.rowIndex
    },
    pointerEnd() {
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
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* border-spacing: 6px 4px; */
  border: 0px;
}
.room {
  touch-action: none;
}
</style>
