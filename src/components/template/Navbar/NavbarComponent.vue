<template>
  <header class="navbar">
    <img
      src="@/assets/logo-innocv.png"
      class="navbar__logo"
      alt="innocv-logo"
      loading="lazy"
    />
    <label class="navbar__toggle">
      <div
        class="navbar__toggle--container"
        :class="[isDark ? 'enabled' : 'disabled']"
      >
        <div className="navbar__toggle--container--icons">
          <SunIcon />
          <MoonIcon />
        </div>
        <input
          data-test-id="checkbox"
          type="checkbox"
          :checked="isDark"
          @click="toggleDark()"
        />
      </div>
    </label>
  </header>
</template>

<script setup lang="ts">
import MoonIcon from '@/assets/moon.svg?component'
import SunIcon from '@/assets/sun.svg?component'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  selector: 'body', //element to add attribute to
  attribute: 'theme', // attribute name
  valueDark: 'dark', // attribute value for dark mode
  valueLight: 'light' // attribute value for light mode
})

const toggleDark = useToggle(isDark)
</script>

<style lang="scss" scoped src="./NavbarComponent.scss"></style>
