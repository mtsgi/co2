<script setup lang="ts" generic="T">
const props = defineProps<{
  output: T;
}>();
</script>

<template>
  <div class="output">
    <template v-if="props.output === null || props.output === undefined">
      {{ String(props.output) }}
    </template>

    <template v-else-if="typeof props.output === 'number'">
      {{ props.output.toLocaleString() }}
    </template>

    <template v-else-if="props.output === ''">
      (empty string)
    </template>

    <template v-else>
      {{ props.output }}
    </template>
  </div>
</template>
