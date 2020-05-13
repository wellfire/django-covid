const isObject = (item) => (item && typeof item === 'object' && !Array.isArray(item))

const areBothConstructsArrays = (currentConstruct, originalContruct) =>
    (Array.isArray(currentConstruct) && Array.isArray(originalContruct))


const areBothConstructsObjects = (currentConstruct, originalContruct) =>
    (isObject(currentConstruct) && isObject(originalContruct))


const applyDeclaration  = ({ appliedValue, constructedStyleMap, key }) =>
    constructedStyleMap[key] = appliedValue


function appendDeclaration ({
    appliedValue,
    constructedStyleMap,
    constructedValue,
    key,
}) {
    try {
        const appendVal = appliedValue.split(" ")
        const retainVal = constructedValue ? constructedValue.split(" ") : []

        applyDeclaration({
            appliedValue: retainVal.concat(...appendVal).join(" "),
            constructedStyleMap,
            key,
        })
    }
    catch (error) {
        applyDeclaration({
            appliedValue,
            constructedStyleMap,
            key,
        })
    }
    return
}


function removeDeclaration ({
    appliedValue,
    constructedStyleMap,
    constructedValue,
    key,
}) {
    try {
        let retainProps = constructedValue ? constructedValue.split(" ") : []

        if (retainProps.length) {
            const removeProps = appliedValue.split(" ")
            const newAppliedValue = retainProps
                .filter(
                    item => removeProps.indexOf(item) === -1
                )
                .
                join(" ")

            applyDeclaration({
                appliedValue: newAppliedValue,
                constructedStyleMap,
                key,
            })
        }
        //  we don't actually have an error necessarily, we just want to run the catch statement
        else throw retainProps
        // {
        //     applyDeclaration({
        //         appliedValue,
        //         constructedStyleMap,
        //         key,
        //     })
        // }

    }
    catch (error) {
        applyDeclaration({
            appliedValue,
            constructedStyleMap,
            key,
        })
    }
    return
}


function setVefaStyle ({
    mainFn,
    recursiveFn
}) {
    return (constructedStyleMap, styleElement) => {
        Object.keys(styleElement).forEach(
            (key) => {
                const constructedValue = constructedStyleMap[key]
                const appliedValue = styleElement[key]

                if (areBothConstructsArrays(constructedValue, appliedValue)) {
                    applyDeclaration({
                        appliedValue: constructedValue.concat(...appliedValue),
                        constructedStyleMap,
                        key,
                    })
                }

                else if (areBothConstructsObjects(constructedValue, appliedValue)) {
                    applyDeclaration({
                        appliedValue: recursiveFn(constructedValue, appliedValue),
                        constructedStyleMap,
                        key,
                    })
                }

                else {
                    mainFn({
                        appliedValue,
                        constructedStyleMap,
                        constructedValue,
                        key,
                    })
                }
            }
        )

        return constructedStyleMap
    }
}


function vefaAppend (...vefaStyleObjects) {
    return vefaStyleObjects.reduce(
        setVefaStyle({
            mainFn: appendDeclaration,
            recursiveFn: vefaAppend
        }),
        {}
    )
}


function vefaMerge (...vefaStyleObjects) {
    return vefaStyleObjects.reduce(
        setVefaStyle({
            mainFn: applyDeclaration,
            recursiveFn: vefaMerge
        }),
        {}
    )
}


function vefaRemove (...vefaStyleObjects) {
    return vefaStyleObjects.reduce(
        setVefaStyle({
            mainFn: removeDeclaration,
            recursiveFn: vefaRemove
        }),
        {}
    )
}

export function computeVefa ({
    __vefa = {},
    appendVefaStyle,
    applyVefaStyle,
    mergeVefaStyle,
    removeVefaStyle
}) {
    //  only components have this available
    if (!__vefa) return {}

    let vefaConstruct = __vefa

    if (isObject(applyVefaStyle)) {
        vefaConstruct = applyVefaStyle
    }
    else if (__vefa && __vefa[applyVefaStyle]) {
        vefaConstruct = __vefa[applyVefaStyle]
    }

    if (isObject(appendVefaStyle)) {
        vefaConstruct = vefaAppend(vefaConstruct, appendVefaStyle)
    }
    else if (__vefa && __vefa[appendVefaStyle]) {
        vefaConstruct = vefaAppend(vefaConstruct, __vefa[appendVefaStyle])
    }

    if (isObject(mergeVefaStyle)) {
        vefaConstruct = vefaMerge(vefaConstruct, mergeVefaStyle)
    }
    else if (__vefa && __vefa[mergeVefaStyle]) {
        vefaConstruct =  vefaMerge(vefaConstruct, __vefa[mergeVefaStyle])
    }

    if (isObject(removeVefaStyle)) {
        vefaConstruct = vefaRemove(vefaConstruct, removeVefaStyle)
    }
    else if (__vefa && __vefa[removeVefaStyle]) {
        vefaConstruct = vefaRemove(vefaConstruct, __vefa[removeVefaStyle])
    }

    if (__vefa && !Object.keys(vefaConstruct).length) {
        vefaConstruct = __vefa
    }

    return vefaConstruct
}

import { inject } from "@vue/composition-api"

export function useVefaStyles () {
    return {
        $appStyles: inject("$appStyles", {}),
        vefaAppend,
        vefaMerge,
        vefaRemove,
    }
}

export default useVefaStyles
