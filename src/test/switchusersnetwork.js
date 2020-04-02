const AdminConfig = 'http://development.delasoft.com:8443/UPA-adminconfig'
const Admin = 'http://development.delasoft.com:8443/UPA-admin'

const network = {
    conditions:{
        init: {
            run: [
                {
                    type: 'load',
                    name: 'county',
                    "read": [
                        {
                            url: `${Admin}/api/Sites/All/Active`,
                            type: 'get',
                            saveAs: {
                                key: 'items'
                            }
                        }
                    ]
                }
            ]
        },
        change: {
            'county': {
                run: [
                    {
                        type: 'load',
                        name: 'user',
                        "read": [
                            {
                                url: `${Admin}/api/UPAUsers/UsersBySiteId/{siteid}`,
                                type: 'get',
                                matchProps: [{
                                    name: 'county',
                                    key: 'siteid'
                                }],
                                saveAs: {
                                    key: 'items'
                                }
                            }
                        ]
                    },
                    {
                        type: 'clear',
                        name: 'user'
                    },
                    {
                        type: 'clear',
                        name: 'role'
                    },
                    {
                        type: 'clearItems',
                        name: 'role',
                        items: []
                    },
                    {
                        type: 'disable',
                        name: 'switchuserbtn',
                        disable: {
                            disabled: true
                        }
                    }
                ]
            },
            'user': {
                run: [
                    {
                        type: 'load',
                        name: 'role',
                        "read": [
                            {
                                url: `${Admin}/api/UPARoles/UserRoles/{userId}`,
                                type: 'get',
                                matchProps: [{
                                    name: 'user',
                                    key: 'userId'
                                }],
                                saveAs: {
                                    key: 'items'
                                }
                            }
                        ]
                    },
                    {
                        type: 'clear',
                        name: 'role'
                    },
                    {
                        type: 'disable',
                        name: 'switchuserbtn',
                        disable: {
                            disabled: true
                        }
                    }
                ]
            },
            'role': {
                run: [
                    {
                        type: 'enable',
                        name: 'switchuserbtn',
                        enable: {
                            disabled: false
                        }
                    }
                ]
            }
        }
    }
    
}

export default network