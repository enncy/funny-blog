// @ts-check

const fs = require("fs");
const path = require("path");
const express = require("express");
const { createServer: createViteServer } = require("vite");

// 处理路径
const resolve = (p) => path.resolve(__dirname, p);

// 判断是否为生产模式
const isProd = process.env.NODE_ENV === "production";

const defaultMetaInfos = {
    title: "趣博客",
    description: "趣博客 —— 有趣的博客网站，分享计算机及其他领域的技术文章，可发布各种领域的个人博客文章，与各大网友分享技术，共同建造和谐的开源社区",
    keywords: "趣博客,博客,文章,开源网站",
};

/**
 * 创建生产模式下的服务器
 */
async function createProdServer() {
    /**
     * @type {any}
     */
    const app = express();
    // 开启 gzip 压缩
    app.use(require("compression")());
    // 处理静态资源
    app.use(
        require("serve-static")(resolve("dist/client"), {
            index: false,
        })
    );

    // 处理所有请求
    app.use("*", async (req, res) => {
        try {
            // 发送生成后的 html 页面
            await renderHtml({
                res,
                // 使用打包好的模板
                template: fs.readFileSync(resolve("dist/client/index.html"), "utf-8"),
                // 使用打包好的 server 入口
                render: require("./dist/server/entry-server.js").render,
                // 当前的 url
                url: req.originalUrl,
                // 预加载 json
                manifest: require("./dist/client/ssr-manifest.json"),
            });
        } catch (e) {
            console.log(e.stack);
            res.status(500).end(e.stack);
        }
    });

    return app;
}

/**
 * 创建开发模式下的服务器
 */
async function createDevServer() {
    /**
     * @type {any}
     */
    const app = express();

    // @ts-ignore
    // 从 vite 创建一个ssr中间件服务器
    const vite = await createViteServer({
        server: { middlewareMode: "ssr" },
    });
    // 使用 vite 中间件
    app.use(vite.middlewares);

    // 处理所有请求
    app.use("*", async (req, res) => {
        try {
            const url = req.originalUrl;
            // 处理渲染模板
            let templateFile = fs.readFileSync(resolve("index.html"), "utf-8");
            let template = await vite.transformIndexHtml(url, templateFile);
            // 发送生成后的 html 页面
            await renderHtml({
                res,
                // 使用打包好的模板
                template: template,
                // 使用打包好的 server 入口
                render: (await vite.ssrLoadModule("/src/entry-server.js")).render,
                // 当前的 url
                url,
                // 预加载 json
                manifest: {},
            });
        } catch (e) {
            vite && vite.ssrFixStacktrace(e);
            console.log(e.stack);
            res.status(500).end(e.stack);
        }
    });

    return app;
}

/**
 *
 * template 模板 index.html
 * render 渲染器 (server entry)
 * url 路径
 * manifest 预加载
 * res 请求
 */
async function renderHtml({ template, render, url, manifest, res }) {
    // 生成 html 和 预加载链接
    const { html, preloadLinks, router } = await render(url, manifest);

    // 在这里可以获取到   router.currentRoute 当前的路由，如果在 render(renderToString) 之前，则不行

    // 路由里的 seo meta 内容，可以在 .vue 文件里使用 useRoute() 直接修改当前路由 meta 信息
    let meta = router.currentRoute.value.meta;
    // 默认 seo meta 内容
    let { title, description, keywords } = Object.assign(defaultMetaInfos, meta);
 
    template = template
        // 渲染预加载链接
        .replace(`<!--preload-links-->`, preloadLinks)
        // 渲染 meta 信息
        .replace(`<!--ssr-title-->`, title)
        .replace(`<!--ssr-description-->`, `<meta name="description" content="${description}">`)
        .replace(`<!--ssr-keywords-->`, `<meta name="keywords" content="${keywords}">`)
        // 渲染 html
        .replace(`<!--ssr-outlet-->`, html);

    // 响应请求
    res.status(200).set({ "Content-Type": "text/html" }).end(template);
}

// 运行服务
const server = isProd ? createProdServer : createDevServer;
console.log("开发环境 ", isProd ? "生产" : "开发");
server().then((app) =>
    app.listen(3000, () => {
        console.log("http://localhost:3000");
    })
);
