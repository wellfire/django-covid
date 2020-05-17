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

            optCode[typeName]
                ? optCode[typeName]()
                : optCode.Default()
        }
    )
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
