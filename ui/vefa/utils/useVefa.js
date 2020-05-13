//  if application of class values doesn't work in static build
//  (applies itself on vuejs takeover/update), then:
// 1:   break $vefa[element].class out => :class="$vefa[element].class"
//      and v-bind="{ ...$vefa[element], class: false }"
//  or
// 2:   apply a named slot around the element in question
//      slot(name="<element>") ...
//  it looks as though class gets applied correctly when wrapped in a component
import { defineComponent, provide } from "@vue/composition-api"
import { useVefaStyles, computeVefa } from "./useVefaStyles"

export default {
    install (Vue, options = {}) {
        const $appStyles = options.appStyles || {}

        const vefaAbstract = defineComponent({
            // should apply inheritAttrs: false to each component individually
            // inheritAttrs: false,
            props: {
                appendVefaStyle: {
                    type: [String, Object],
                    default: null
                },
                applyVefaStyle: {
                    type: [String, Object],
                    default: null
                },
                mergeVefaStyle: {
                    type: [String, Object],
                    default: null
                },
                removeVefaStyle: {
                    type: [String, Object],
                    default: null
                }
            },
            setup (props, ctx) {
                provide("$appStyles", $appStyles)

                return {
                    ...useVefaStyles()

                    //  apply current gridsome contexts to a variable to bind to components or slots
                    //  might not be needed, instead apply useGridsome et al
                    // generatedAppProps: {
                    //     $viewContext: root.$context,
                    //     $viewStatic: root.$static,
                    //     $viewPage: root.$page
                    // }
                }
            },
            computed: {
                // while it would be nice to do this in setup(),
                // currently no way to overload the props/ctx
                $appliedVefa () {
                    return { $appliedVefa: this.$vefa }
                },
                $vefa ({
                    appendVefaStyle,
                    applyVefaStyle,
                    mergeVefaStyle,
                    removeVefaStyle
                }) {
                    const __vefa =(this.$options.__vefa && this.$options.__vefa.data)
                        ? this.$options.__vefa.data
                        : {}

                    return computeVefa({
                        __vefa,
                        appendVefaStyle,
                        applyVefaStyle,
                        mergeVefaStyle,
                        removeVefaStyle
                    })
                }
            }
        })

        Vue.mixin(vefaAbstract)

    }
}
