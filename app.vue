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
</script>

<template>
  <main>
    <header>
      <AppPreference />
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
  grid-template-rows: auto auto minmax(0, 1fr);
  height: 100dvh;
}

header {
  display: flex;
  align-items: start;
}
</style>
