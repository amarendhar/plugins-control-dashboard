export type Maybe<T> = T | null;

export enum STATUS {
  IDLE = "idle",
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

export enum ENV {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}
