import { mount, VueWrapper } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { TYPES } from '@/types/calculator'
import CalculatorButton from '@/components/atoms/calculator-button/CalculatorButton.vue'

let wrapper: VueWrapper
let props = {
  label: '+'
}

describe('CalculatorButton.vue', () => {
  beforeEach(() => {
    wrapper = mount(CalculatorButton, {
      props,
      global: {}
    })
  })

  test('Mount component', () => {
    expect(CalculatorButton).toBeTruthy()
    expect(wrapper.exists()).toBeTruthy()
  })

  test('Should have a "plus" as label', () => {
    const label = wrapper.text()
    expect(label).toEqual('+')
  })

  test('Should have a "green" background color', () => {
    wrapper = mount(CalculatorButton, {
      props: {
        label: '+',
        action: TYPES.OPERATOR
      },
      global: {}
    })

    const bgColor = wrapper.classes('calculator-button__green')
    expect(bgColor).toBeTruthy()
  })

  test('Should emit a "click" event when button is clicked', async () => {
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
