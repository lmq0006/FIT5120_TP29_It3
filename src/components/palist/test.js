import Comp from './index.vue'

import { mount } from 'vue-test-utils'
import { expect } from 'chai'

describe('Palist', () => {
  it('basic', () => {
    const wrapper = mount(Comp)
    expect(wrapper.name()).to.equal('palist')
  })
})
