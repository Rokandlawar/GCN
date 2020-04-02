import React, { useReducer, useEffect, useRef, useState } from 'react';
import { layoutTypes } from '../layout/types'
import { handleActionsToEffects } from '../effects/effects'
import { groupByType } from '../helpers/components'
import Dropdown from './dropdown'
import TextField from './textbox'
import Checkbox from './checkbox'
import Button from './button'
import RadioGroup from './radiogroup'


const fieldTypes = {
    dropdown: Dropdown,
    textfield: TextField,
    checkbox: Checkbox,
    button: Button,
    radiogroup: RadioGroup
}

function handleFieldChange(state, action) {
    const { type, ...otherProps } = action
    if (type === 'value') {
        const { name, value } = otherProps
        return { ...state, fieldValues: { ...state.fieldValues, [name]: value } }
    }
    if (type === 'prop') {
        const { name, value } = otherProps
        return { ...state, fieldProps: { ...state.fieldProps, [name]: { ...state.fieldProps[name], ...value } } }
    }
    if (type === 'updates') {
        let newstate = { ...state }
        const { updates } = otherProps
        const { prop, value, layout } = updates
        if (prop) {
            prop.forEach(each => {
                const { key, result } = each
                newstate = { ...newstate, fieldProps: { ...newstate.fieldProps, [key]: { ...newstate.fieldProps[key], ...result } } }
            })
        }
        if (value) {
            value.forEach(each => {
                const { key, result } = each
                newstate = { ...newstate, fieldValues: { ...newstate.fieldValues, [key]: result.value } }
            })

        }
        if (layout) {
        }
        return newstate
    }
}


export default function useForm(props) {
    const { components, layout, values, effects, actions, conditions } = props

    const [fields, dispatchFieldsChange] = useReducer(
        handleFieldChange,
        { fieldValues: values, fieldProps: components, fieldsLayout: layout }
    )

    const handleEffectUpdates = (res) => {
        Promise.all(res).then(results => {
            dispatchFieldsChange({
                type: 'updates',
                updates: groupByType(results)
            })
        })
    }


    const handleFieldValue = (e) => {
        const { name, value, checked } = e.target
        if (conditions.change[name]) {
            handleEffectUpdates(
                handleActionsToEffects({
                    conditions: conditions.change[name],
                    fieldValues: { ...fieldValues, [name]: value }
                })
            )
        }

        const val = handleValue(name, value, checked)
        dispatchFieldsChange({
            type: 'value',
            name: name,
            value: val
        })

    }

    const handleValue = (name, value, checked) => {
        const { type } = components[name]
        switch (type) {
            case 'checkbox':
                return checked
            default:
                return value
        }
    }

    const setFieldValuesOrProps = (results) => {
        dispatchFieldsChange({
            type: 'updates',
            updates: groupByType(results)
        })
    }

    const componentsCreation = (fieldNames, values) => {
        return fieldNames.reduce((accum, each) => {
            const { type, ...otherProps } = fieldProps[each]
            const EachComp = fieldTypes[type]
            accum[each] = <EachComp value={values[each]} {...otherProps} handleFieldValue={handleFieldValue} />
            return accum
        }, {})
    }

    const { fieldValues, fieldProps, fieldsLayout } = fields
    return {
        layout: <form>
            {
                layoutTypes.default({
                    layout: fieldsLayout,
                    fields: componentsCreation(Object.keys(fieldProps), fieldValues)
                })
            }
        </form>,
        fieldValues: fieldValues,
        setFieldValuesOrProps: setFieldValuesOrProps
    }
}
