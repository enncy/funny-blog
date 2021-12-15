import { computed, reactive, watch } from "vue";

export function createForm<T>(obj: T, excludes?: string[]): T {
    let o: any = reactive(obj as any);
    let keys = Reflect.ownKeys(o)
        .filter((k) => !(excludes || []).includes(k.toString()))
        .map((k) => k.toString());
    watch(o, () => {
        keys.forEach((k) => {
            let value = o[k];
            if (value && typeof value === "string") {
                o[k] = value.toString().replace(/[^\w]/g, "");
            }
        });
    });
    return o as T;
}
