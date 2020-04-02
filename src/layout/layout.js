import React, { Fragment, useState, useEffect } from 'react'
import { DIV } from '../helpers/native'

const types = {
    div: DIV
}

export const createLayout = ({ layout, fields }) => {
    const { group } = layout
    return group.map((each, index) => {
        const { order, type, components, ...otherProps } = each
        return <div {...otherProps} key={order || index}>
            {components.map((each, index) => {
                const { name, sub, group, ...otherLayoutProps } = each
                console.log('comp', fields[name])
                if (fields) {
                    if (sub) {
                        const { type, key, ...otherProps } = sub
                        return <div {...otherProps} key={key || index}>
                            {fields[name]}
                        </div>
                    }
                    else {
                        if (group) {
                            const { type, key, ...otherProps } = each
                            return <div {...otherProps} key={key || index}>
                                <div className='border border-primary'>
                                    {createLayout({ layout: each, fields: fields })}
                                </div>
                            </div>

                        }
                        else return fields[name]
                    }
                }
                else return null

            })}
        </div>
    })

}