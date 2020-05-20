require('yamlify/register')
const devRouting = require("./environments/devRouting.yaml")
const prodRouting = require("./environments/productionRouting.yaml")
const isProd = process.env.NODE_ENV == "production"

module.exports = function ({ onCreateNode, loadSource, createPages }) {
    onCreateNode(
        (options) => {
            const typeName = options.internal.typeName

            //  change "public" id to match fileInfo.path for ease of use if needed
            options.id = options.fileInfo.path
            options.path = `/${ options.slug || options.id }`

        }
    )

    createPages(
        async ({ createPage, graphql }) => {

        async function createFromSchema ([name, pageRoute]) {
            try {
                let context = {}

                if (pageRoute.graphql && pageRoute.graphql.file) {
                    const { id } = pageRoute.graphql

                    const query = fs.readFileSync(
                        path.resolve(pageRoute.graphql.file),
                        "utf-8"
                    )

                    const { data } = await graphql(
                        query,
                        id ? { id } : {}
                    )

                    context = data.context

                }

                createPage({
                    route: {
                        name,
                    },
                    path: pageRoute.path,
                    component: pageRoute.component,
                    context
                })
            }
            catch (e) {
                console.error(e)
            }

            return
        }

        if (isProd) {
            Object.entries(prodRouting).forEach(createFromSchema)
        }
        else {
            Object.entries(devRouting).forEach(createFromSchema)
        }
    })
}
