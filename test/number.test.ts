import { OPERATORS } from './../src/page/Calculator/elements'
import { describe, expect, test } from 'vitest'
import { applyOperation } from '@/helpers/numbers'

describe('Number helper', () => {
  test('Test applyOperation default case', () => {
    const result = applyOperation('', 0, 0)
    expect(result).toEqual(0)
  })

  test('Test applyOperation "plus" case', () => {
    const result = applyOperation(OPERATORS.PLUS, 2, 2)
    expect(result).toEqual(4)
  })

  test('Test applyOperation "minus" case', () => {
    const result = applyOperation(OPERATORS.MINUS, 2, 2)
    expect(result).toEqual(0)
  })

  test('Test applyOperation "multiplication" case', () => {
    const result = applyOperation(OPERATORS.MULTIPLICATION, 2, 2)
    expect(result).toEqual(4)
  })

  test('Test applyOperation "multiplication" case', () => {
    const result = applyOperation(OPERATORS.DIVISION, 2, 2)
    expect(result).toEqual(1)
  })

  test('Test applyOperation "percentage" case', () => {
    const result = applyOperation(OPERATORS.PERCENTAGE, 2, 2)
    expect(result).toEqual(0.02)
  })

  test('Test applyOperation "signchange" case', () => {
    const result = applyOperation(OPERATORS.SIGNCHANGE, 2, 2)
    expect(result).toEqual(-2)
  })
})
