// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Co2 {
  export interface HistoryItem<T = unknown> {
    input: string;
    output: T;
    isError?: boolean;
  }

  export interface TabItem {
    label: string;
    history: HistoryItem[];
  }
}
