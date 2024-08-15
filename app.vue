<script lang="ts" setup>
const tabs = useTabs();
const currentTab = ref(0);

const evalExpr = (expr: string) => {
  try {
    const func = new Function(`"use strict"; return (${expr})`);
    const result = func();
    return result as unknown;
  }
  catch (error) {
    return new Error(String(error));
  }
};

const onSelect = (index: number) => {
  currentTab.value = index;
};

const onExec = (input: string) => {
  const output = evalExpr(input);
  const isError = output instanceof Error;
  tabs.value[currentTab.value].history.push({ input, output, isError });
};

onMounted(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: '.' });
  }
});
</script>

<template>
  <main>
    <header>
      <AppPreference />
      <div class="drag" />
    </header>

    <AppTabs
      :current-tab="currentTab"
      @select="onSelect"
    />

    <AppConsole
      :tab="tabs[currentTab]"
      @exec="onExec"
    />
  </main>
</template>

<style lang="scss" scoped>
main {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  padding-top: 50px;
  height: 100dvh;
}

header {
  background: rgb(var(--color-gray-100));
  display: flex;
  align-items: center;
  position: fixed;
  left: env(titlebar-area-x, 0);
  top: env(titlebar-area-y, 0);
  height: 50px;
  width: 100%;
  padding-right: calc(100% - env(titlebar-area-width, 100%));

  .drag {
    align-self: stretch;
    flex-grow: 1;
    -webkit-app-region: drag;
  }
}
</style>
