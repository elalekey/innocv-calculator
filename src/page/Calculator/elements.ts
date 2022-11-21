import { TYPES } from '@/types/calculator'

export enum OPERATORS {
  PLUS = '+',
  MINUS = '-',
  DIVISION = '/',
  MULTIPLICATION = '*',
  EQUAL = '=',
  PERCENTAGE = '%',
  SIGNCHANGE = '+/-'
}

export interface Element {
  label: string
  type: string
  operator?: string
}

export const ELEMENTS: Element[] = [
  {
    label: 'C',
    type: TYPES.CLEAR
  },
  {
    label: '+/-',
    type: TYPES.OPERATOR,
    operator: OPERATORS.SIGNCHANGE
  },
  {
    label: '%',
    type: TYPES.OPERATOR,
    operator: OPERATORS.PERCENTAGE
  },
  {
    label: '÷',
    type: TYPES.OPERATOR,
    operator: OPERATORS.DIVISION
  },
  {
    label: '7',
    type: TYPES.NUMBER
  },
  {
    label: '8',
    type: TYPES.NUMBER
  },
  {
    label: '9',
    type: TYPES.NUMBER
  },
  {
    label: '×',
    type: TYPES.OPERATOR,
    operator: OPERATORS.MULTIPLICATION
  },
  {
    label: '4',
    type: TYPES.NUMBER
  },
  {
    label: '5',
    type: TYPES.NUMBER
  },
  {
    label: '6',
    type: TYPES.NUMBER
  },
  {
    label: '-',
    type: TYPES.OPERATOR,
    operator: OPERATORS.MINUS
  },
  {
    label: '1',
    type: TYPES.NUMBER
  },
  {
    label: '2',
    type: TYPES.NUMBER
  },
  {
    label: '3',
    type: TYPES.NUMBER
  },
  {
    label: '+',
    type: TYPES.OPERATOR,
    operator: OPERATORS.PLUS
  },
  {
    label: '0',
    type: TYPES.NUMBER
  },
  {
    label: '.',
    type: TYPES.DECIMAL
  },
  {
    label: '=',
    type: TYPES.EQUAL
  }
]
