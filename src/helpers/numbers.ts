import { OPERATORS } from '@/page/Calculator/elements'

export const getFormattedNumber = (value: string | number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const applyOperation = (operator: string, firstValue: number, secondValue: number) => {
  switch (operator) {
    case OPERATORS.PLUS:
      return firstValue + secondValue
    case OPERATORS.MINUS:
      return firstValue - secondValue
    case OPERATORS.MULTIPLICATION:
      return firstValue * secondValue
    case OPERATORS.DIVISION:
      return firstValue / secondValue
    case OPERATORS.PERCENTAGE:
      return firstValue / 100
    case OPERATORS.SIGNCHANGE:
      return firstValue * -1
    default:
      return 0
  }
}
