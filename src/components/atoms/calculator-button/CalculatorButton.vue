<template>
  <button
    class="calculator-button"
    :class="[`calculator-button__${returnBgButton()}`, `calculator-button--${size}`]"
    @click="$emit('click')"
  >
    <slot name="label">
      {{ label }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import { TYPES, COLORS } from '@/types/calculator'
interface Props {
  label: string
  action?: string
  size?: string
}

const props = withDefaults(defineProps<Props>(), {
  action: TYPES.NUMBER,
  size: 'small'
})

const $emit = defineEmits<{
  (e: 'click'): void
}>()

const returnBgButton = () => {
  switch (props.action) {
    case TYPES.NUMBER:
    case TYPES.DECIMAL:
      return COLORS.DARK_BLUE
    case TYPES.CLEAR:
      return COLORS.GREY
    default:
      return COLORS.GREEN
  }
}
</script>

<style lang="scss" scoped src="./CalculatorButton.scss"></style>
