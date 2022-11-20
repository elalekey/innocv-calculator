<template>
  <button
    class="calculator-button"
    :class="[`calculator-button__${bgColor}`, `calculator-button--${size}`]"
    @click="$emit('click')"
  >
    <slot name="label">
      {{ label }}
    </slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string
  bgColor?: string
  size?: string
}

withDefaults(defineProps<Props>(), {
  bgColor: 'dark-blue',
  size: 'small'
})

const $emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<style lang="scss" scoped src="./CalculatorButton.scss"></style>
