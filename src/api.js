import axios from 'axios'
import store from './store'
import { TRANSLATION } from './consts'

const flashMsgs = resp => {
  if (!resp) {
    store.commit({
      type: 'alert',
      text: TRANSLATION['Network Error'],
      variant: 'danger'
    })
    return
  }
  let msgs = resp.data.message
  let code = resp.status
  if (!msgs) {
    if (code != 200)
      store.commit({
        type: 'alert',
        text: TRANSLATION['Fatal Error'],
        variant: 'warning'
      })
    return
  }
  if (!Array.isArray(msgs)) msgs = [msgs]
  for (let msg of msgs) {
    store.commit({
      type: 'alert',
      text:
        msg in TRANSLATION
          ? TRANSLATION[msg]
          : code != 200
          ? code + ' ' + msg
          : msg,
      variant: code == 200 ? 'info' : 'danger'
    })
  }
}

const requestApi = async (method, url, login, data) => {
  url = process.env.VUE_APP_API_ROOT + url
  let u = store.state.user
  if (login === true) {
    if (url.includes('?')) url += '&'
    else url += '?'
    url += `id=${escape(u.id)}&timestamp=${u.timestamp}&token=${u.token}`
  }
  let resp
  try {
    resp = await axios({ method, url, data, withCredentials: true })
    console.log(resp)
  } catch (err) {
    console.log(err.response)
    flashMsgs(err.response)
    return false
  }
  flashMsgs(resp)
  return resp
}

export default {
  loginVercode: async stu_id =>
    await requestApi('post', '/api/vercode', false, { stu_id }),
  twiceVercode: async () => {
    let rawId = store.state.user.rawId
    return await requestApi('post', '/api/twice_vercode?rawId=' + rawId, true)
  },
  login: async vercode =>
    await requestApi('post', '/login', false, { vercode }),
  bookingStatus: async () => {
    let resp = await requestApi('get', '/api/booking/my', true)
    if (!resp) return false
    for (let record of resp.data.bookRecords) {
      record.startTime *= 1000
      record.endTime *= 1000
      record.bookTime *= 1000
    }
    return resp
  },
  bookingAll: async () => await requestApi('get', '/api/booking/all', true),
  book: async data => {
    let rawId = store.state.user.rawId
    return await requestApi('post', '/api/book?rawId=' + rawId, true, data)
  },
  cancel: async (book_id, vercode) =>
    await requestApi('post', '/api/booking/cancel', true, { book_id, vercode }),
  confirm: async book_id =>
    await requestApi('post', '/api/booking/confirm', true, { book_id })
}
