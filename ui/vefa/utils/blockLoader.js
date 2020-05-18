//  if application of class values doesn't work in static build
//  (applies itself on vuejs takeover/update), then:
// 1:   break $vefa[element].class out => :class="$vefa[element].class"
//      and v-bind="{ ...$vefa[element], class: false }"
//  or
// 2:   apply a named slot around the element in question
//      slot(name="<element>") ...
//  it looks as though class gets applied correctly when wrapped in a component

// options.__vefa = __vefa
// console.log(Component)

const yaml = require("js-yaml")

module.exports = function (source, map) {
    source = yaml.safeLoad(source)
    source = JSON.stringify(source)

    const res = `
        import Vue from "vue"

        const data = ${ source }

        export default ({ options }) => {
            if (options.__vefa) {
                options.__vefa.data = data
                return
            }

            options.__vefa = Vue.observable({ data })
        }
    `

    this.callback(
        null,
        res,
        map
    )
}
