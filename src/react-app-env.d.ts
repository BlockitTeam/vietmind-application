declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';
declare interface String {
  prettyMoney: () => string;
}
declare interface Array<T> {
  contains: (obj: T) => boolean;
}
declare interface Date {
  toDDMMYY: () => string;
}