export interface Timer {
  complete: boolean;
  mins: string;
  secs: string;
  cents: string;
  steps: number;
  recordDuration;
}

export interface Sound {
  key: string;
  asset: string;
}
