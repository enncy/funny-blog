// @ts-check

import { renderToString } from "@vue/server-renderer";
import { createApp } from "./main";

export async function render(url, manifest) {
    const { app, router } = createApp();

    // 在渲染前设置 url
    router.push(url);

    await router.isReady();

    // ssr 上下文对象，可以在 .vue 文件中通过 useSSRContext() 去获取
    const ctx = {};
    // 渲染 html
    let appHtml = await renderToString(app, ctx);

    // 预加载
    const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
    return { appHtml, preloadLinks, router };
}

function renderPreloadLinks(modules, manifest) {
    let links = "";
    const seen = new Set();
    modules.forEach((id) => {
        const files = manifest[id];
        if (files) {
            files.forEach((file) => {
                if (!seen.has(file)) {
                    seen.add(file);
                    links += renderPreloadLink(file);
                }
            });
        }
    });
    return links;
}

function renderPreloadLink(file) {
    if (file.endsWith(".js")) {
        return `<link rel="modulepreload" crossorigin href="${file}">`;
    } else if (file.endsWith(".css")) {
        return `<link rel="stylesheet" href="${file}">`;
    } else if (file.endsWith(".woff")) {
        return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
    } else if (file.endsWith(".woff2")) {
        return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
    } else if (file.endsWith(".gif")) {
        return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
    } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
        return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
    } else if (file.endsWith(".png")) {
        return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
    } else {
        // TODO
        return "";
    }
}
