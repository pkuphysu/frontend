<template>
  <b-list-group>
    <b-list-group-item>
      <b-badge pill :variant="badge.variant" class="float-left">{{badge.text}}</b-badge>
      <h4 class="d-inline-block ml-1 mb-0">Hello</h4>
      <b-button
        v-if="userId == sponsorId && !record.canceled"
        v-b-toggle="`collapse-${record.id}`"
        variant="outline-primary"
        class="float-right p-0"
      >取消</b-button>
    </b-list-group-item>
    <b-collapse :id="`collapse-${record.id}`">
      <b-input-group>
        <b-form-input type="number" placeholder="验证码将发至您的北大邮箱" />
        <b-input-group-append>
          <b-button variant="outline-light">Button</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-collapse>
    <b-list-group-item class="booking-detail">
      <p>预约时间：{{formatTimeRange(record.startTime, record.endTime)}}</p>
      <p>发起人：{{record.sponsor}} ({{sponsorId}})</p>
      <p>发起时间：{{formatTime(record.bookTime)}}</p>
      <p>参与人数：{{record.studentNumber}}</p>
      <p>用途：{{record.description}}</p>
    </b-list-group-item>
    <b-list-group-item v-for="student in record.confirmStatus.slice(1)" :key="student.studentId">
      参与人：{{ student.rawStudentId }}
      <b-button
        v-if="student.confirmed"
        variant="outline-success"
        class="float-right p-0"
        disabled
      >已确认</b-button>
      <span v-else-if="!dead && !record.canceled">
        <b-button
          v-if="student.studentId == userId"
          variant="outlined-primary"
          class="float-right p-0"
        >确认</b-button>
        <b-button v-else variant="outline-warning" class="float-right p-0" disabled>等待确认</b-button>
      </span>
      <b-button v-else variant="outline-danger" class="float-right p-0" disabled>未确认</b-button>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { BOOK_DAY_NEAREST } from '@/consts'

const now = new Date().getTime()
const today = new Date().setHours(0, 0, 0, 0)
const cancelDDL = today + BOOK_DAY_NEAREST * 86400000

export default {
  props: {
    record: {
      type: Object,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      sponsorId: this.record.confirmStatus[0].studentId,
      dead: this.record.startTime < cancelDDL
    }
  },
  created() {
    // Need this.dead, can not put in data()
    this.badge = this.parseBadge(this.record)
  },
  methods: {
    formatTime(time) {
      let t = new Date(time)
      return (
        `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()} ` +
        `${t.getHours()}:${t.getMinutes()}`
      )
    },
    formatTimeRange(startTime, endTime) {
      let s = this.formatTime(startTime)
      let e = new Date(endTime)
      return `${s} 至 ${e.getHours()}:${e.getMinutes()}`
    },
    parseBadge(record) {
      if (record.canceled) {
        return {
          variant: 'danger',
          text: '已取消'
        }
      } else if (record.confirmed) {
        let text
        if (now > record.endTime) text = '已完成'
        else if (now < record.startTime) text = '成功预约'
        else text = '正在进行'
        return {
          variant: 'success',
          text
        }
      } else if (this.dead) {
        return {
          variant: 'danger',
          text: '预约失败'
        }
      } else {
        return {
          variant: 'info',
          text: '等待确认'
        }
      }
    }
  }
}
</script>

<style>
.booking-detail {
  font-size: 0.9em;
}
.booking-detail p {
  margin: 0;
}
</style>
