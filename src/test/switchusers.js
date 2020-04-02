import React, { Fragment, useEffect } from "react"
import useForm from '../components/form'
import useNetwork from '../components/network'
import useContainer from '../components/container'
import switchusersconfig from './switchusersconfig'
import switchusersgridconfig from './switchusersgridconfig'
import CustomMultiSelect from './CustomMultiSelect'
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import TextField from '@material-ui/core/TextField'
import textbox from "../components/textbox"
import { hookTypes } from "../helpers/fieldtypes"

const SwitchUsers = () => {

    const [layout, fieldValues] = hookTypes.useNetwork({
        ...switchusersconfig
    })

    return (
        <Fragment>
            {layout}
        </Fragment>
    )
}

export default SwitchUsers
