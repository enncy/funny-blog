
import { Plugin } from 'vite';

const options: {
    name: string,
    resolve: string,
    url: string
}[] = [
        {
            name: 'vue',
            resolve: 'Vue',
            url: 'https://cdn.jsdelivr.net/npm/vue@3.2.11/dist/vue.esm-browser.prod.js'
        }
    ]


export default function ExternalImport(): Plugin {
    return {
        name: "vue",
        resolveId(id) {
            console.log("resolveId", id);
            return null
        },
        load(id) {
            // console.log("load",id);
            return null
        },
        transform(src, id) {
            // console.log("transform",id);
            console.log(id);
            console.log(src);
            
            for (const option of options) {
                const imports = src.match(/import[\s\S]*?from[\s\S]*?(;|\n)/g)
                console.log(imports);
                
            }


            // if(/^import[\s\S]*?from[\s\S]*?"vue"/.test(src)){
            //   console.log("transform",id);

            //   src = src.replace(/^import([\s\S]*?)from[\s\S]*?"vue"$/g,"import a from \"vue\"")

            // }

            return {
                code: src,
                map: null
            }
        }
    }
}