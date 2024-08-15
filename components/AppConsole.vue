<script lang="ts" setup>
import type { Co2 } from '~/utils/types';

const props = defineProps<{
  tab: Co2.TabItem;
}>();

const emit = defineEmits<{
  (e: 'exec', input: string): void;
}>();

const input = ref<string>('');

const onEnter = (event: KeyboardEvent) => {
  if (!input.value) return;
  if (event.shiftKey) return;

  event.preventDefault();
  emit('exec', input.value);
  input.value = '';
};

const suggests = computed<string[]>(() => {
  const result = [];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore FIXME
  for (const key in window[input.value]) {
    result.push(key);
  }
  return result;
});

const selectSuggest = (suggest: string) => {
  input.value = input.value + '.' + suggest;
};
</script>

<template>
  <div class="console">
    <div class="logs overflow-y-auto">
      <div
        v-for="(log, i) in props.tab.history"
        :key="`log-${i}`"
        class="log"
      >
        <UBadge
          :ui="{ rounded: 'rounded-full' }"
          size="lg"
        >
          {{ log.input }}
        </UBadge>

        <div class="log__output">
          <UAvatar
            icon="i-heroicons-command-line"
            :chip-color="log.isError ? 'red' : undefined"
          />
          <!-- <UButton
            icon="i-heroicons-clipboard"
            color="gray"
            variant="ghost"
            square
          /> -->
          <OutputItem :output="log.output" />
        </div>
      </div>
    </div>

    <UButtonGroup
      class="form"
      size="xl"
    >
      <UTextarea
        v-model="input"
        :autoresize="true"
        :rows="1"
        :padded="true"
        variant="none"
        size="xl"
        placeholder="Input"
        class="form__input"
        @keydown.enter="onEnter"
      />
      <UButton
        icon="i-heroicons-arrow-right"
        color="primary"
        variant="ghost"
        @click="onEnter"
      />

      <UCard
        v-if="suggests.length > 0"
        class="suggests"
        :ui="{ body: { padding: 'p-0 sm:p-0' } }"
      >
        <UButton
          v-for="suggest in suggests"
          :key="`suggest-${suggest}`"
          variant="ghost"
          block
          class="suggest"
          @click="selectSuggest(suggest)"
        >
          {{ suggest }}
        </UButton>
      </UCard>
    </UButtonGroup>
  </div>
</template>

<style lang="scss" scoped>
.console {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr auto;

  .logs {
    padding: 1rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    scrollbar-width: thin;

    .log {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;

      &__output {
        align-self: stretch;
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;

        .output {
          flex-grow: 1;
          padding: 0.25rem 0;
        }
      }
    }
  }

  .form {
    border-radius: 0;
    position: relative;
    border-top: 2px solid rgb(var(--color-primary-500));

    &__input {
      flex-grow: 1;
      display: flex;
    }

    .suggests {
      position: absolute;
      left: 1rem;
      bottom: calc(100% + 1rem);
      max-width: calc(100dvw - 2rem);
      max-height: 50dvh;
      overflow-x: auto;
      scrollbar-width: thin;

      .suggest {
        justify-content: flex-start;
      }
    }
  }
}
</style>
