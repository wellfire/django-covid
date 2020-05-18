//  This may not be needed anymore with Vue Composition API.

import Vue from "vue"

const styleObjReducer = ( styleTree, styleMap ) => {
    return styleTree.reduce(
        (styleMap, key) => styleMap[key] || styleMap,
        styleMap
    )
}

export const inheritStyle = {
    type: String,
    default: null,
    injectedFrom: "inheritedStyles"
}

const StylesManager = {
    props: {
        inheritStyle,
        styleMap: {
            type: Object,
            default: null,
        },
        $vefa: {
            type: Object,
            default: null
        }
    },
    computed: {
        useStyle () {
            if (!this.inheritStyle) return this.$vefa

            let styleTree = this.inheritStyle.split(".")

            styleTree = styleObjReducer(styleTree, this.styleMap)

            return (styleTree == this.styleMap)
                ? this.$vefa
                : styleTree
        },
        generatedProps () {
            return {
                useStyle: this.useStyle
            }
        },
    },
    created () {

    },
    render () {
        return this.$scopedSlots.default
            ? this.$scopedSlots(this.generatedProps)
            : {}
    }
}

export const mountStyles = (propData) => {
    let {
        inheritStyle,
        inheritedStyles: styleMap,
        $vefa
    } = propData

    const abstract = Vue.extend(StylesManager)
    const instance = new abstract({
        propsData: {
            inheritStyle,
            styleMap,
            $vefa
        }
    })
    return instance.useStyle
}

export default StylesManager
