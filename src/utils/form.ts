import { computed, reactive, watch } from "vue";

export function createForm<T>(obj: T): T {
    let o:any = reactive(obj as any);

    watch(o, () => {
        Reflect.ownKeys(o).forEach((k) => {
            let value = Reflect.get(o, k);
            if (value && typeof value === "string") {
                Reflect.set(o, k, value.toString().replace(/[^\w]/g, ""));
            }
        });
    });
    return o as T;
}
