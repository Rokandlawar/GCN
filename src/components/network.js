import React, { useReducer, useEffect, useRef, useState } from 'react';
import useForm from './form'
import { handleActionsToEffects } from '../effects/effects'
import { createRequest, requestApi } from '../helpers/rest'

export default function useNetwork(props) {

    const { network, ...otherProps } = props
    const { actions, effects } = otherProps
    const { layout, fieldValues, setFieldValuesOrProps } = useForm({
        ...otherProps
    })

    const values = useRef(fieldValues);

    useEffect(() => {
        if (network['init']) {
            handleEffectUpdates(
                handleActionsToEffects({
                    conditions: network['init'],
                    fieldValues: fieldValues
                })
            )
        }
    }, [])

    const getChanges = (fieldValues) => {
        return Object.keys(fieldValues).filter(each => {
            return values.current[each] != fieldValues[each]
        })
    }

    useEffect(() => {
        const names = getChanges(fieldValues)
        names.forEach(each => {
            if (network.change[each]) {
                handleEffectUpdates(
                    handleActionsToEffects({
                        mapCurrentActionsToEffects: network.change[each],
                        fieldValues: { ...fieldValues, [each]: fieldValues[each] },
                        actions: actions,
                        effects: effects
                    })
                )
            }
        })
        values.current = fieldValues
    }, [fieldValues])

    const handleEffectUpdates = (res) => {
        Promise.all(res).then(results => {
            setFieldValuesOrProps(results)
        })
    }

    return [layout, fieldValues, setFieldValuesOrProps]
}