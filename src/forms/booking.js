import store from '@/store'

export default function () {
  // To enable multi people booking, remove pre-filled rawId,
  // and uncomment students field
  const rawId = store.state.user.rawId
  return {
    values: {
      sponsor: '',
      contact: '',
      stu_num: '',
      stu1: rawId,
      stu2: rawId,
      description: ''
    },
    fields: [
      {
        type: 'text',
        name: 'sponsor',
        label: '预约人姓名',
        placeholder: '姓名',
        validation: 'required',
        validationMessages: {
          required: '请填写姓名'
        }
      },
      {
        type: 'number',
        name: 'contact',
        label: '联系方式',
        placeholder: '预约人电话',
        validation: 'min:11,length|max:11,length',
        validationMessages: {
          min: '请填写 11 位手机号',
          max: '请填写 11 位手机号'
        }
      },
      {
        type: 'number',
        name: 'stu_num',
        label: '房间使用人数',
        placeholder: '人数',
        validation: 'min:3',
        validationMessages: {
          min: '至少 3 位同学预约'
        }
      },
      // {
      //   type: 'number',
      //   name: 'stu1',
      //   label: '参与学生1',
      //   placeholder: '学号',
      //   validation: 'min:10,length|max:10,length'
      // },
      // {
      //   type: 'number',
      //   name: 'stu2',
      //   label: '参与学生2',
      //   placeholder: '学号',
      //   validation: 'min:10,length|max:10,length'
      // },
      {
        type: 'textarea',
        name: 'description',
        label: '预约用途',
        placeholder: '用途',
        validation: 'required',
        validationMessages: {
          required: '请填写预约说明'
        }
      }
    ]
  }
}
