import { redis } from "../redis";

export async function customHmset<T>(cacheKey: string, data: T) {
    for (let key in data) {
        await redis.HSET(cacheKey, key, data[key as keyof T] as string);
    }
}