const AdminConfig = 'http://development.delasoft.com:8443/UPA-adminconfig'
const Admin = 'http://development.delasoft.com:8443/UPA-admin'
const switchusersconfig = {
    "type": "form",
    "key": "switchusers",
    "name": "switchuserssettings",
    layout: {
        group: [
            {
                order: 0,
                type: 'div',
                className: 'row',
                components: [
                    {
                        name: 'county',
                        type: 'div',
                        className: 'col-4',
                        sub: {
                            type: 'div',
                            className: 'col-4',
                        }
                    },
                    {
                        name: 'user',
                        type: 'div',
                        className: 'col-4',
                        sub: {
                            type: 'div',
                            className: 'col-4'
                        }
                    },
                    {
                        type: 'div',
                        className: 'col-4',
                        group: [
                            {
                                order: 0,
                                type: 'div',
                                className: 'row',
                                components: [
                                    {
                                        name: 'role',
                                        type: 'div',
                                        className: 'col-4',
                                        sub: {
                                            type: 'div',
                                            className: 'col-4',
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]

            },
            {
                order: 1,
                type: 'div',
                className: 'row',
                components: [
                    {
                        name: 'currentlyassigned',
                        type: 'div',
                        className: 'col-4',
                        sub: {
                            type: 'div',
                            className: 'col-4'
                        }
                    },
                    {
                        name: 'futureworkflow',
                        type: 'div',
                        className: 'col-4',
                        sub: {
                            type: 'div',
                            className: 'col-4'
                        }
                    }
                ]
            },
            {
                order: 2,
                type: 'div',
                className: 'row',
                components: [
                    {
                        name: 'switchuserbtn',
                        type: 'div',
                        className: 'col-4',
                        sub: {
                            type: 'div',
                            className: 'col-4'
                        }
                    }
                ]
            }
        ],
    },
    values: {
        county: '',
        user: '',
        role: '',
        futureworkflow: false,
        currentlyassigned: false
    },
    sharedProps: {
        'county': 'countys',
        'user': 'users',
        'role': 'roles',
        'futureworkflow': 'futureworkflows',
        'currentlyassigned': 'currentlyassigneds'
    },
    "components": {
        county: {
            "type": "dropdown",
            "key": "county",
            "label": "Select County",
            "name": "county",
            extraProps: {
                transformProps: {
                    label: 'Name',
                    value: 'Id'
                }
            }

        },
        user: {
            "type": "dropdown",
            "key": "user",
            "label": "Select User",
            "name": "user",
            extraProps: {
                transformProps: {
                    label: 'name',
                    value: 'id'
                }
            }
        },
        role: {
            "type": "dropdown",
            "key": "role",
            "label": "Select role",
            name: "role",
            extraProps: {
                transformProps: {
                    label: 'name',
                    value: 'id'
                }
            }
        },
        switchuserbtn: {
            "type": "button",
            "key": "switchuserbtn",
            "label": "Switch User",
            name: "switchuserbtn",
            variant: "contained",
            color: "primary",
            disabled: true
        },
        currentlyassigned: {
            "type": "checkbox",
            "key": "currentlyassigned",
            "label": "Currently Assigned",
            name: "currentlyassigned",
            extraProps: {
                initialvalue: 'N',
                transformProps: {
                    'true': "Y",
                    'false': "N",
                    "Y": true,
                    "N": false
                }
            }

        },
        futureworkflow: {
            "type": "checkbox",
            "key": "futureworkflow",
            "label": "Future Workflow",
            name: "futureworkflow",
            extraProps: {
                initialvalue: 'N',
                transformProps: {
                    'true': "Y",
                    'false': "N",
                    "Y": true,
                    "N": false
                }
            }

        }
    },
    conditions: {
        change: {
            'currentlyassigned': {
                check: [
                    {
                        condition: 'AND',
                        rules: [
                            {
                                name: 'county',
                                type: 'value'
                            },
                            {
                                name: 'user',
                                type: 'value'
                            },
                            {
                                name: 'role',
                                type: 'value'
                            },
                            {
                                condition: 'OR',
                                rules: [
                                    {
                                        name: 'currentlyassigned',
                                        type: 'check',
                                        value: true
                                    },
                                    {
                                        name: 'futureworkflow',
                                        type: 'check'
                                    }
                                ]
                            }
        
                        ]
                    }
                ],
                run: []
            },
            'futureworkflow': {
                check: [
                    {
                        condition: 'AND',
                        rules: [
                            {
                                name: 'county',
                                type: 'value'
                            },
                            {
                                name: 'user',
                                type: 'value'
                            },
                            {
                                name: 'role',
                                type: 'value'
                            },
                            {
                                condition: 'OR',
                                rules: [
                                    {
                                        name: 'currentlyassigned',
                                        type: 'check',
                                        value: true
                                    },
                                    {
                                        name: 'futureworkflow',
                                        type: 'check'
                                    }
                                ]
                            }
        
                        ]
                    }
                ],
                run: []
            }
        }
    }
}

export default switchusersconfig

