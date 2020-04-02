import React, { Fragment, useEffect, useRef } from "react"
import useForm from '../components/form'
import useNetwork from '../components/network'
import useContainer from '../components/container'
import switchusersconfig from './switchusersconfig'
import switchusersnetwork from './switchusersnetwork'
import switchusersgridconfig from './switchusersgridconfig'
import CustomMultiSelect from './CustomMultiSelect'
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import TextField from '@material-ui/core/TextField'
import textbox from "../components/textbox"

const SwitchUsers = () => {

    const [layout, fieldValues, setFieldValuesOrProps] = useForm({
        ...switchusersconfig
    })

    const [res, handleNetworkChanges] = useNetwork({ ...switchusersnetwork, fieldValues: fieldValues })

    useEffect(() => {
        handleNetworkChanges(fieldValues)
   }, [fieldValues])
   
    useEffect(() => {
        res && setFieldValuesOrProps(res)
    }, [res])

    return (
        <Fragment>
            {layout}
        </Fragment>
    )
}

export default SwitchUsers
