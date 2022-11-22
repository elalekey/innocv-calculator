import { mount, VueWrapper } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import NavbarComponent from '@/components/template/Navbar/NavbarComponent.vue'

let wrapper: VueWrapper<any>

describe('NavbarComponent.vue', () => {
  beforeEach(() => {
    wrapper = mount(NavbarComponent, {
      props: {},
      global: {}
    })
  })

  test('Mount component', () => {
    expect(NavbarComponent).toBeTruthy()
    expect(wrapper.exists()).toBeTruthy()
  })

  test('Theme change when checkbox is pressed', async () => {
    const spy = vi.spyOn(wrapper.vm, 'toggleDark')
    const checkbox = wrapper.find('[data-test-id="checkbox"]')
    await checkbox.trigger('click')

    expect(wrapper.vm.isDark).toBeTruthy()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
