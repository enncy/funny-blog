import { AntdIconProps } from "@ant-design/icons-vue/lib/components/AntdIcon";
import { FunctionalComponent } from "vue";

export interface MenuData {
    title: string,
    path: string,
    icon?:  FunctionalComponent<AntdIconProps> | string
}