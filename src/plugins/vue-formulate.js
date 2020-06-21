import Vue from 'vue'

import VueFormulate from '@braid/vue-formulate'

Vue.use(VueFormulate, {
  classes: {
    input: 'form-control',
    inputIsValid: 'is-valid',
    wrapperHasErrors: 'is-invalid',
    inputHasErrors: 'is-invalid',
    errors: ['invalid-feedback', 'mb-0', 'list-unstyled'],
    outer: 'my-2'
  }
})
