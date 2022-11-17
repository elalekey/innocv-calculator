<template>
  <button
    class="calculator-button"
    :class="[`calculator-button__${bgColor}`]"
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
}

withDefaults(defineProps<Props>(), {
  bgColor: 'dark-blue'
})

const $emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<style lang="scss" scoped src="./CalculatorButton.scss"></style>
