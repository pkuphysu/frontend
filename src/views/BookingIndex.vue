<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12">
        <p>预约须知：</p>
        <ol>
          <li>
            使用教室须提前3-7天预约，预约时须再邀请2名同学并通知他们确认，才能预约成功。
            未能提前3-7天完成确认的，视为放弃预约。
          </li>
          <li>如要取消预约或修改预约，请提前3天以上取消原有预约。</li>
        </ol>
      </b-col>
      <b-col cols="12">
        <b-button v-if="user.bookCount < 2" href="#" variant="primary" block>新建预约</b-button>
        <b-button v-else variant="primary" block disabled>预约已达上限</b-button>
      </b-col>
    </b-row>
    <b-col v-for="bookRecord in bookRecords" :key="bookRecord.id" cols="12" class="py-2">
      <b-list-group>
        <b-list-group-item>
          <b-badge pill variant="danger" class="float-left">canceled</b-badge>
          <h4 class="d-inline-block ml-1 mb-0">Hello</h4>
          <b-button
            v-b-toggle="`collapse-${bookRecord.id}`"
            variant="outline-primary"
            class="float-right p-0"
          >取消</b-button>
        </b-list-group-item>
        <b-collapse :id="`collapse-${bookRecord.id}`">
          <b-input-group>
            <b-form-input type="number" placeholder="验证码将发至您的北大邮箱" />
            <b-input-group-append>
              <b-button variant="outline-light">Button</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-collapse>
        <b-list-group-item class="booking-detail">
          <p>预约时间：</p>
          <p>发起人：</p>
          <p>发起时间：{{formatTimeRange(bookRecord.startTime, bookRecord.endTime)}}</p>
          <p>参与人数：{{bookRecord.studentNumber}}</p>
          <p>用途：{{bookRecord.description}}</p>
        </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-container>
</template>

<script>
import {CANCEL_DDL} from '@/consts'

export default {
  name: 'BookingIndex',
  data() {
    return {
      user: {
        bookCount: 1
      },
      CANCEL_DDL,
      bookRecords: [
        {
          id: 0,
          canceled: false,
          bookTime: 1581405074480,
          startTime: 1581406074480,
          endTime: 1581407074480,
          description: '撸猫',
          studentNumber: 3,
          confirmStatus: [
            {
              rawStudentID: 'GHJFbjkbhGHS#$687g',
              studentID: '1800033032',
              confirmed: true
            }
          ]
        }
      ]
    }
  },
  methods: {
    formatTimeRange(startTime, endTime) {
      let s = new Date(startTime)
      let e = new Date(endTime)
      return (
        `${s.getFullYear()}-${s.getMonth() + 1}-${s.getDate()} ` +
        `${s.getHours()}:${s.getMinutes()} 至 ${e.getHours()}:${e.getMinutes()}`
      )
    },
    parseBadge(bookRecord) {
      if (bookRecord.confirmed) {
        let now = new Date().getTime()
        let text
        if (now > bookRecord.endTime) text = '已完成'
        else if (now < bookRecord.startTime) text = '成功预约'
        else text = '正在进行'
        return {
          variant: 'success',
          text
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
