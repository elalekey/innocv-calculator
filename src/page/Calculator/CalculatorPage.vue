<template>
  <div class="calculator-page">
    <div
      class="calculator-page__history"
      :class="{ 'calculator-page--text-sm': history.length > 7 }"
    >
      {{ history === '' ? '0' : getFormattedNumber(history) }}
    </div>
    <div
      class="calculator-page__result"
      :class="{
        'calculator-page--text-xs': formatResult.length > 10,
        'calculator-page--text-xxs': formatResult.length > 18
      }"
    >
      = {{ formatResult }}
    </div>
    <calculator-button
      v-for="(item, index) in ELEMENTS"
      :key="`${item.label}-${index}`"
      :label="item.label"
      :action="item.type"
      :size="item.label === '0' ? 'medium' : 'small'"
      :disabled="returnDisabledButton(item.label)"
      @click="handleClick(item)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import { ELEMENTS, Element, OPERATORS } from './elements'
import { TYPES } from '@/types/calculator'
import { getFormattedNumber, applyOperation } from '@/helpers/numbers'
import CalculatorButton from '@/components/atoms/calculator-button/CalculatorButton.vue'

// Variables
const history: Ref<string> = ref('')
const lastOperator: Ref<string> = ref('')
const result: Ref<number> = ref(0)
const lastNumber: Ref<number> = ref(-1)
const firstNumber: Ref<number> = ref(0)
const secondNumber: Ref<number> = ref(0)
const hasDecimal: Ref<boolean> = ref(false)

// Computeds
const formatResult = computed(() => {
  const roundResult = Math.round(result.value * 100) / 100
  return getFormattedNumber(roundResult)
})

// Return a disabled state if decimal button was the last button pressed.
const returnDisabledButton = (label: string) => {
  return label === '.' && hasDecimal.value
}

// Methods

// Return a float number with decimal or not.
const returnNumbers = (value: number, newValue: string) => {
  if (hasDecimal.value) {
    let newResult = `${value}.${newValue}`
    if (newValue !== '0') {
      hasDecimal.value = false
    }
    if (lastNumber.value === 0) {
      newResult = `${value}.0${newValue}`
    }
    return parseFloat(newResult)
  }
  return parseFloat(`${value}${newValue}`)
}

// Save a number depending if an operator was pressed or not (if not, data will saved in firstNumber variable)
// @params label {string} -> 0-9
const handleNumber = (label: string) => {
  updateHistory(label)
  if (!lastOperator.value) {
    firstNumber.value = returnNumbers(firstNumber.value, label)
    result.value = firstNumber.value
  } else {
    secondNumber.value = returnNumbers(secondNumber.value, label)
    result.value = applyOperation(lastOperator.value, firstNumber.value, secondNumber.value)
  }
  if (hasDecimal.value) {
    lastNumber.value = parseInt(label)
  }
}

// Switch case to call a function depending on the button pressed (write a number, logs, do an operations, etc.)
const handleClick = (element: Element) => {
  const { type, label, operator } = element
  switch (type) {
    case TYPES.DECIMAL:
      const newLabel = history.value === '' ? `0${label}` : label
      updateHistory(newLabel)
      return (hasDecimal.value = true)
    case TYPES.NUMBER:
      return handleNumber(label)
    case TYPES.OPERATOR:
      return !!operator && handleOperator(operator, label)
    case TYPES.CLEAR:
      return clearOperations()
    case TYPES.EQUAL:
      result.value = applyOperation(lastOperator.value, firstNumber.value, secondNumber.value)
      history.value = result.value.toString()
      resetOperations()
      return
    default:
      return
  }
}

const handleOperator = (operator: string, label: string) => {
  const lastValue = history.value[history.value.length - 1]
  lastNumber.value = -1
  if (lastValue !== label && history.value !== '') {
    // If the last button pressed is different at the current operator will run the process
    updateHistory(label)
    if (operator !== OPERATORS.PERCENTAGE && operator !== OPERATORS.SIGNCHANGE) {
      // If the current operator is different of percentage or signchange will rull the process
      // Otherwise, will get the result of the operation and print in the history
      if (lastOperator.value && firstNumber.value && secondNumber.value) {
        result.value = applyOperation(lastOperator.value, firstNumber.value, secondNumber.value)
        resetOperations()
      }
      if (!!lastOperator.value && lastOperator.value !== operator) {
        // When user press a different operator the history will change to the current result
        history.value = `${result.value}${label}`
      }
      lastOperator.value = operator
    } else {
      result.value = applyOperation(operator, firstNumber.value, secondNumber.value)
      history.value = result.value.toString()
      resetOperations()
    }
  }
}

// When an operator is pressed, result will be calculated and assigned to the first number.
const resetOperations = () => {
  firstNumber.value = result.value
  secondNumber.value = 0
}

// When CLEAR button type is pressed, the calculator will be reseted
const clearOperations = () => {
  firstNumber.value = 0
  secondNumber.value = 0
  lastOperator.value = ''
  result.value = 0
  lastNumber.value = -1
  hasDecimal.value = false
  history.value = ''
}

// Logs
const updateHistory = (newValue: number | string) => {
  history.value = `${history.value}${newValue}`
}
</script>

<style scoped lang="scss" src="./CalculatorPage.scss"></style>
