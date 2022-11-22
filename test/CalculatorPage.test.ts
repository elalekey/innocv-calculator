import { mount, VueWrapper } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import CalculatorPage from '@/page/Calculator/CalculatorPage.vue'

let wrapper: VueWrapper<any>

describe('CalculatorPage.vue', () => {
  beforeEach(() => {
    wrapper = mount(CalculatorPage, {
      props: {},
      global: {}
    })
  })

  test('Mount component', () => {
    expect(CalculatorPage).toBeTruthy()
    expect(wrapper.exists()).toBeTruthy()
  })

  test('History changes when a button number is pressed', async () => {
    const spyClick = vi.spyOn(wrapper.vm, 'handleClick')

    const buttonNumber = wrapper.find('[data-test-id="button-7"]')
    await buttonNumber.trigger('click')

    expect(spyClick).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.firstNumber).toEqual(7)
    expect(wrapper.vm.history).toEqual('7')
  })

  test('Decimals are on screen when button is pressed', async () => {
    const spyClick = vi.spyOn(wrapper.vm, 'handleClick')

    const buttonNumber = wrapper.find('[data-test-id="button-7"]')
    await buttonNumber.trigger('click')

    const buttonDot = wrapper.find('[data-test-id="button-."]')
    await buttonDot.trigger('click')
    expect(buttonDot.attributes().disabled).toEqual('')

    await buttonNumber.trigger('click')
    await buttonNumber.trigger('click')

    expect(spyClick).toHaveBeenCalledTimes(4)
    expect(wrapper.vm.firstNumber).toEqual(7.77)
    expect(wrapper.vm.history).toEqual('7.77')
  })

  test('Decimal are on screen when button is the first button pressed', async () => {
    const spyClick = vi.spyOn(wrapper.vm, 'handleClick')

    const buttonDot = wrapper.find('[data-test-id="button-."]')
    await buttonDot.trigger('click')

    expect(spyClick).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.firstNumber).toEqual(0)
    expect(wrapper.vm.history).toEqual('0.')
  })

  test('The result is displayed on the screen when making combinations of numbers and "plus" operator.', async () => {
    const spyClick = vi.spyOn(wrapper.vm, 'handleClick')

    const buttonNumber = wrapper.find('[data-test-id="button-7"]')
    await buttonNumber.trigger('click')

    const buttonPlus = wrapper.find('[data-test-id="button-+"]')
    await buttonPlus.trigger('click')

    await buttonNumber.trigger('click')

    expect(spyClick).toHaveBeenCalledTimes(3)
    expect(wrapper.vm.firstNumber).toEqual(7)
    expect(wrapper.vm.secondNumber).toEqual(7)
    expect(wrapper.vm.lastOperator).toEqual('+')
    expect(wrapper.vm.result).toEqual(14)
    expect(wrapper.vm.history).toEqual('7+7')
  })

  test('The result is displayed on the screen when making combinations of numbers and "minus" operator.', async () => {
    const spyClick = vi.spyOn(wrapper.vm, 'handleClick')

    const buttonNumber = wrapper.find('[data-test-id="button-7"]')
    await buttonNumber.trigger('click')

    const buttonMinus = wrapper.find('[data-test-id="button--"]')
    await buttonMinus.trigger('click')

    await buttonNumber.trigger('click')

    expect(spyClick).toHaveBeenCalledTimes(3)
    expect(wrapper.vm.firstNumber).toEqual(7)
    expect(wrapper.vm.secondNumber).toEqual(7)
    expect(wrapper.vm.lastOperator).toEqual('-')
    expect(wrapper.vm.result).toEqual(0)
    expect(wrapper.vm.history).toEqual('7-7')
  })

  test('The result is displayed on the screen when making combinations of numbers and "multiplication" operator.', async () => {
    const spyClick = vi.spyOn(wrapper.vm, 'handleClick')

    const buttonNumber = wrapper.find('[data-test-id="button-7"]')
    await buttonNumber.trigger('click')

    const buttonMultiplication = wrapper.find('[data-test-id="button-×"]')
    await buttonMultiplication.trigger('click')

    await buttonNumber.trigger('click')

    expect(spyClick).toHaveBeenCalledTimes(3)
    expect(wrapper.vm.firstNumber).toEqual(7)
    expect(wrapper.vm.secondNumber).toEqual(7)
    expect(wrapper.vm.lastOperator).toEqual('*')
    expect(wrapper.vm.result).toEqual(49)
    expect(wrapper.vm.history).toEqual('7×7')
  })

  test('The result is displayed on the screen when making combinations of numbers and "division" operator.', async () => {
    const spyClick = vi.spyOn(wrapper.vm, 'handleClick')

    const buttonNumber = wrapper.find('[data-test-id="button-7"]')
    await buttonNumber.trigger('click')

    const buttonMultiplication = wrapper.find('[data-test-id="button-÷"]')
    await buttonMultiplication.trigger('click')

    await buttonNumber.trigger('click')

    expect(spyClick).toHaveBeenCalledTimes(3)
    expect(wrapper.vm.firstNumber).toEqual(7)
    expect(wrapper.vm.secondNumber).toEqual(7)
    expect(wrapper.vm.lastOperator).toEqual('/')
    expect(wrapper.vm.result).toEqual(1)
    expect(wrapper.vm.history).toEqual('7÷7')
  })

  test('The result is displayed on the screen when making combinations of numbers and "percentage" operator.', async () => {
    const spyClick = vi.spyOn(wrapper.vm, 'handleClick')

    const buttonNumber = wrapper.find('[data-test-id="button-7"]')
    await buttonNumber.trigger('click')

    const buttonPercentage = wrapper.find('[data-test-id="button-%"]')
    await buttonPercentage.trigger('click')

    expect(spyClick).toHaveBeenCalledTimes(2)
    expect(wrapper.vm.firstNumber).toEqual(0.07)
    expect(wrapper.vm.result).toEqual(0.07)
    expect(wrapper.vm.history).toEqual('0.07')
  })

  test('The result is displayed on the screen when making combinations of numbers and "signchange" operator.', async () => {
    const spyClick = vi.spyOn(wrapper.vm, 'handleClick')

    const buttonNumber = wrapper.find('[data-test-id="button-7"]')
    await buttonNumber.trigger('click')

    const buttonSignChange = wrapper.find('[data-test-id="button-+/-"]')
    await buttonSignChange.trigger('click')

    expect(spyClick).toHaveBeenCalledTimes(2)
    expect(wrapper.vm.firstNumber).toEqual(-7)
    expect(wrapper.vm.result).toEqual(-7)
    expect(wrapper.vm.history).toEqual('-7')
  })

  test('The result is displayed correctly on the screen when user add numbers with decimals', async () => {
    const spyClick = vi.spyOn(wrapper.vm, 'handleClick')

    const buttonNumber = wrapper.find('[data-test-id="button-7"]')
    await buttonNumber.trigger('click')

    const buttonNumberZero = wrapper.find('[data-test-id="button-0"]')
    const buttonDot = wrapper.find('[data-test-id="button-."]')

    await buttonDot.trigger('click') // ,
    await buttonNumberZero.trigger('click') // 0
    await buttonNumber.trigger('click') // 7

    const buttonPlus = wrapper.find('[data-test-id="button-+"]')
    await buttonPlus.trigger('click')

    await buttonNumber.trigger('click') // 7
    await buttonDot.trigger('click') // ,
    await buttonNumberZero.trigger('click') // 0
    await buttonNumber.trigger('click') // 7

    expect(spyClick).toHaveBeenCalledTimes(9)
    expect(wrapper.vm.firstNumber).toEqual(7.07)
    expect(wrapper.vm.secondNumber).toEqual(7.07)
    expect(wrapper.vm.lastOperator).toEqual('+')
    expect(wrapper.vm.history).toEqual('7.07+7.07')
    expect(wrapper.vm.result).toEqual(14.14)
  })

  test('The result is reset when the clear button is pressed', async () => {
    const spyClick = vi.spyOn(wrapper.vm, 'handleClick')

    const buttonNumber = wrapper.find('[data-test-id="button-7"]')
    await buttonNumber.trigger('click')

    const buttonPlus = wrapper.find('[data-test-id="button-+"]')
    await buttonPlus.trigger('click')

    await buttonNumber.trigger('click')

    expect(spyClick).toHaveBeenCalledTimes(3)
    expect(wrapper.vm.firstNumber).toEqual(7)
    expect(wrapper.vm.secondNumber).toEqual(7)
    expect(wrapper.vm.lastOperator).toEqual('+')
    expect(wrapper.vm.history).toEqual('7+7')
    expect(wrapper.vm.result).toEqual(14)

    const buttonClear = wrapper.find('[data-test-id="button-C"]')
    await buttonClear.trigger('click')

    expect(wrapper.vm.firstNumber).toEqual(0)
    expect(wrapper.vm.secondNumber).toEqual(0)
    expect(wrapper.vm.result).toEqual(0)
  })

  test('The result is calculated when the equal button is pressed', async () => {
    const spyClick = vi.spyOn(wrapper.vm, 'handleClick')

    const buttonNumber = wrapper.find('[data-test-id="button-7"]')
    await buttonNumber.trigger('click')

    const buttonPlus = wrapper.find('[data-test-id="button-+"]')
    await buttonPlus.trigger('click')

    await buttonNumber.trigger('click')

    expect(spyClick).toHaveBeenCalledTimes(3)
    expect(wrapper.vm.firstNumber).toEqual(7)
    expect(wrapper.vm.secondNumber).toEqual(7)
    expect(wrapper.vm.lastOperator).toEqual('+')
    expect(wrapper.vm.history).toEqual('7+7')
    expect(wrapper.vm.result).toEqual(14)

    const buttonEqual = wrapper.find('[data-test-id="button-="]')
    await buttonEqual.trigger('click')

    expect(wrapper.vm.firstNumber).toEqual(14)
    expect(wrapper.vm.secondNumber).toEqual(0)
    expect(wrapper.vm.result).toEqual(14)
  })

  test('The result is calculated when the press a different operator and last operation was solved', async () => {
    const spyClick = vi.spyOn(wrapper.vm, 'handleClick')

    const buttonNumber = wrapper.find('[data-test-id="button-7"]')
    await buttonNumber.trigger('click')

    const buttonPlus = wrapper.find('[data-test-id="button-+"]')
    await buttonPlus.trigger('click')

    await buttonNumber.trigger('click')

    expect(spyClick).toHaveBeenCalledTimes(3)
    expect(wrapper.vm.firstNumber).toEqual(7)
    expect(wrapper.vm.secondNumber).toEqual(7)
    expect(wrapper.vm.lastOperator).toEqual('+')
    expect(wrapper.vm.history).toEqual('7+7')
    expect(wrapper.vm.result).toEqual(14)

    const buttonEqual = wrapper.find('[data-test-id="button--"]')
    await buttonEqual.trigger('click')
    await buttonNumber.trigger('click')

    expect(wrapper.vm.firstNumber).toEqual(14)
    expect(wrapper.vm.secondNumber).toEqual(7)
    expect(wrapper.vm.history).toEqual('14-7')
    expect(wrapper.vm.result).toEqual(7)
  })
})
