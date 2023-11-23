export * from "./absoluteUrl";
export * from "./cn";
export * from "./slugify";
export * from "./truncate";

export function toPusherKey(key: string) {
    return key.replace(/:/g, '__')
  }