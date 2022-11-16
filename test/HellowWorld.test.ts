import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import HelloWorld from '@/src/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  test('Mount component', () => {
    expect(HelloWorld).toBeTruthy()

    const wrapper = mount(HelloWorld, {
      props: {
        msg: 'Hello Innocv'
      },
      global: {}
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
