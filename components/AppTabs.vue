<script setup lang="ts">
const tabs = useTabs();

const props = defineProps<{
  currentTab: number;
}>();

const emit = defineEmits<{
  (e: 'select', index: number): void;
}>();

const addTab = () => {
  tabs.value.push({
    label: `Console ${tabs.value.length + 1}`,
    history: [],
  });
  emit('select', tabs.value.length - 1);
};
</script>

<template>
  <div class="tabs overflow-x-auto">
    <UButton
      v-for="(tab, i) in tabs"
      :key="`tabs-${i}`"
      :variant="i === props.currentTab ? 'soft' : 'ghost'"
      class="tab"
      :class="{ '--active': i === props.currentTab }"
      @click="emit('select', i)"
    >
      {{ tab.label }}
    </UButton>

    <UButton
      class="add"
      icon="i-heroicons-plus"
      variant="link"
      @click="addTab"
    />
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  display: flex;
  grid-template-rows: auto;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  scrollbar-width: thin;

  .tab {
    flex-grow: 1;
    justify-content: center;
    border-radius: 0;
    border-bottom: 2px solid transparent;

    &.--active {
      border-bottom: 2px solid rgb(var(--color-primary-500));
    }
  }

  .add {
    border-radius: 0;
  }
}
</style>
