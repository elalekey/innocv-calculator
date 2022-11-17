import { mount, VueWrapper } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import CalculatorButton from '@/src/components/atoms/calculator-button/CalculatorButton.vue'

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

  test('Should have a "orange" background color', () => {
    wrapper = mount(CalculatorButton, {
      props: {
        label: '+',
        bgColor: 'orange'
      },
      global: {}
    })

    const bgColor = wrapper.classes('calculator-button__orange')
    expect(bgColor).toBeTruthy()
  })

  test('Should emit a "click" event when button is clicked', async () => {
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
