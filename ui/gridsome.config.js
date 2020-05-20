require("yamlify/register")
const path = require("path")
const sortCSSmq = require("sort-css-media-queries")
const BundleTracker = require("webpack-bundle-tracker")

const aliases = require("./src/data/aliases.yaml")
const robotsData = require("./src/data/robots.yaml")
const siteData = require("./content/seo.yaml")

const {
    batchConfig,
    chainWebpack
} = require("./src/utils/gridsome/defaultConfigSetup.js")

const isDev = process.env.NODE_ENV == "development"

const sources = [
    ["Homepage", "home.yaml"],
]

if (isDev) {
    // ["SitePages", "pages"],
    // , "/tag/view/:slug", "./src/apps/Categories/CategoryView.vue"], //, "/tag/view/:slug"
    const devRoutes = [
        ["CustomPages", "pages"],
        ["Categories", "categories"],
        ["ProfileForms", "for-development/profile"]
        // ["Analytics", "for-development/analytics", "/analytics/:slug", "./src/pages/Analytics.vue"],
        // ["Resources", "resources", "/resource/view/:title",] // "./src/apps/Resources/ResourceView.vue"]
    ]
    sources.push(...devRoutes)
}

const {
    contentSources,
    templates
} = batchConfig(sources)

const gridsomePlugins = [
    {
        use: "gridsome-plugin-webpack-size",
        options: { development: true }
    },
    ...contentSources,
]


module.exports = {
    siteName: siteData["application-name"],
    siteDescription: siteData.description,
    siteUrl: siteData.url,
    outputDir: process.env.OUTPUT_DIR || null,
    assetsDir: process.env.ASSETS_DIR || null,
    host: "0.0.0.0",
    port: 2222,
    pathPrefix: process.env.STATIC_DIR || "",
    cacheBusting: false,
    catchLinks: false,
    // icon: "./src/res/favicon.png",
    // siteData.favicon || null,
    plugins: gridsomePlugins,
    templates,
    chainWebpack: chainWebpack({ aliases, devMode: true }),
    configureWebpack: {
        module: {
            rules: [
                {
                    resourceQuery: /blockType=vefa/,
                    loader: require.resolve("./vefa/utils/blockLoader.js")
                }
            ]
        },
        plugins: [
            new BundleTracker({
                filename: "generated-source-map.json",
                indent: "    "
            })
        ]
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [require("css-mqpacker")({ sort: sortCSSmq })]
            },
            stylus: {
                import: [
                    path.resolve(__dirname, "./themes/covid19/_config.styl"),
                    path.resolve(__dirname, "./vefa/lib.styl")
                ]
            }
        }
    },


    transformers: {
        //Add markdown support to all file-system sources
        remark: {
            externalLinksTarget: "_blank",
            externalLinksRel: ["nofollow", "noopener", "noreferrer"],
            plugins: [
                "remark-attr"
            ]
        }
    }
}
