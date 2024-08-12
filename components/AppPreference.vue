<script lang="ts" setup>
const colorMode = useColorMode();
const appConfig = useAppConfig();

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-end' }">
    <UButton
      size="xl"
      icon="i-heroicons-adjustments-horizontal"
      variant="ghost"
    />

    <template #panel>
      <div class="preference">
        <UButton
          size="xl"
          :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
          variant="ghost"
          @click="isDark = !isDark"
        />
        <USelect
          v-model="appConfig.ui.primary"
          size="xl"
          :options="appConfig.ui.colors"
          variant="none"
        />
      </div>
    </template>
  </UPopover>
</template>

<style scoped>
.preference {
  display: flex;
  align-items: stretch;
}
</style>
