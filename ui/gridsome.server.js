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
            options.id = options.slug || options.fileInfo.path

            optCode[typeName]
                ? optCode[typeName]()
                : optCode.Default()
        }
    )

    createPages(({ createPage }) => {
        createPage({
            path: "/tag/view/:category",
            component: "./src/apps/Categories/CategoryView.vue"
        })

        createPage({
            path: "/:id",
            component: "./src/pages/Content.vue"
        })

        createPage({
            path: "/resource/:resource",
            component: "./src/pages/Content.vue"
        })
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
