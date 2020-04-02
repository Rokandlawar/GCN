import React, { useReducer, useEffect, useRef, useState } from 'react';
import useForm from './form'
import { handleActionsToEffects } from '../effects/effects'

export default function useNetwork(props) {
    const { conditions, fieldValues } = props
    const values = useRef(fieldValues);
    const [res, setRes] = useState(null)

    useEffect(() => {
        if (conditions['init']) {
            const res = handleActionsToEffects({
                conditions: conditions['init'],
                fieldValues: fieldValues
            })
            Promise.all(res).then(results => {
                setRes(results)
            })
        }
    }, [])

    const getChanges = (fieldValues) => {
        return Object.keys(fieldValues).filter(each => {
            return values.current[each] != fieldValues[each]
        })
    }

    const handleNetworkChanges = (fieldValues) => {
        const names = getChanges(fieldValues)
        names.forEach(each => {
            if (conditions.change[each]) {
                const res = handleActionsToEffects({
                    conditions: conditions.change[each],
                    fieldValues: { ...fieldValues, [each]: fieldValues[each] }
                })
                Promise.all(res).then(results => {
                    setRes(results)
                })
            }
        })
        values.current = fieldValues
    }

    return [res, handleNetworkChanges]
}