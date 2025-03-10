import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BurgerMenu from '../BurgerMenu.vue'

describe('BurgerMenu', () => {
  it('renders properly', () => {
    const wrapper = mount(BurgerMenu)
    expect(wrapper.text()).toContain('Open main menu')
  })
})
