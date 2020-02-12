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
        <b-button v-if="user.bookCount < 2" to="/bookB116/book" variant="primary" block>新建预约</b-button>
        <b-button v-else variant="primary" block disabled>预约已达上限</b-button>
      </b-col>
    </b-row>
    <b-col v-for="bookRecord in bookRecords" :key="bookRecord.id" cols="12" class="py-2">
      <BookRecord :record="bookRecord" :user-id="user.id" />
    </b-col>
  </b-container>
</template>

<script>
import BookRecord from '@/components/BookRecord'

export default {
  name: 'BookingIndex',
  components: {
    BookRecord
  },
  data() {
    return {
      user: {
        id: 'GHJFbjkbhGHS#$687g',
        bookCount: 1
      },
      bookRecords: []
    }
  },
  async created() {
    let response = await fetch('/api/booking/my_status')
    response = await response.json()
    this.bookRecords = response.bookRecords
  }
}
</script>

<style>
</style>
