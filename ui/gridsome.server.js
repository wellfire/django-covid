require('yamlify/register')

module.exports = function ({ onCreateNode, loadSource, createPages }) {
    onCreateNode(
        (options) => {
            const typeName = options.internal.typeName

            const optCode = {
                  Default () {
                    // options.id = options.fileInfo.path
                }
            }

            //  change "public" id to match fileInfo.path for ease of use if needed
            options.id = options.fileInfo.path
            options.path = `/${ options.slug || options.id }`

            optCode[typeName]
                ? optCode[typeName]()
                : optCode.Default()
        }
    )

    createPages(
        async ({ createPage, graphql }) => {
        const isProd = process.env.NODE_ENV == "production"

        createPage({
            route: {
                name: "category",
            },
            path: "/category",
            component: "./src/apps/Categories/CategoryView.vue"
        })

        createPage({
            route: {
                name: "category-detail",
            },
            path: "/tag/view/:category",
            component: "./src/apps/Categories/CategoryView.vue"
        })

        createPage({
            route: {
                name: "content",
            },
            path: "/content",
            component: "./src/apps/Content/ContentView.vue"
        })

        createPage({
            route: {
                name: "content-detail",
            },
            path: "/:slug",
            component: "./src/apps/Content/ContentView.vue"
        })

        if (isProd) {
            // createPage({
            //     route: {
            //         name: "Login",
            //     },
            //     path: "/profile/login/",
            //     component: "./src/apps/Profile/FormView.vue"
            // })

            // createPage({
            //     route: {
            //         name: "Logout",
            //     },
            //     path: "/profile/logout/",
            //     component: "./src/apps/Profile/FormView.vue"
            // })

            createPage({
                route: {
                    name: "profile-detail",
                },
                path: "/profile/:slug",
                component: "./src/apps/Profile/FormView.vue"
            })

            createPage({
                route: {
                    name: "profile-subdetail",
                },
                path: "/profile/:slug/:subslug",
                component: "./src/apps/Profile/FormView.vue"
            })

            // createPage({
            //     route: {
            //         name: "profile-detail",
            //     },
            //     path: "/profile/:slug",
            //     component: "./src/apps/Profile/FormView.vue"
            // })

            createPage({
                route: {
                    name: "form-detail",
                },
                path: "/form",
                component: "./src/apps/Profile/FormView.vue"
            })
        }
        else {
            let {
                data: {
                    context
                }
            } = await graphql(`
                query {
                    context: profileForms (id: "content/for-development/profile/login.md") {
                        hed
                        content
                    }
                },
            `)
            createPage({
                route: {
                    name: "profile-detail",
                },
                path: "/profile/login",
                component: "./src/apps/Profile/FormView.vue",
                context
            })

            let {
                data: {
                    context: context2
                }
            } = await graphql(`
                query {
                    context: profileForms (id: "content/for-development/profile/register.md") {
                        hed
                        content
                    }
                },
            `)

            createPage({
                route: {
                    name: "profile-detail",
                },
                path: "/profile/register",
                component: "./src/apps/Profile/FormView.vue",
                context: context2
            })

        }

        // createPage({
        //     path: "/analytics/:slug",
        //     component: "./src/pages/Analytics.vue"
        // })

        // createPage({
        //     path: "/resource/:resource",
        //     component: "./src/pages/Content.vue"
        // })
    })
}

// module.exports = function ({ loadSource, createPages }) {
//     createPages(
//         async (pageApi) => {
//             const { create } = require(
//                 path.resolve("src/utils/gridsome/buildPages")
//             )({
//                 pageApi,
//                 templateSchema: require("./src/data/templates.yaml"),
//                 defaultTemplate: "Public/Error404View",
//                 routeSchema: require("./src/data/baseRoutes.yaml")
//             })

//             const pageTypes = [
//                 "Public",
//             ]

//             create(
//                 pageTypes.map( type => `./src/apps/${ type }/create` )
//             )

//             return
//         }
//     )
// }
