require('yamlify/register')

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
