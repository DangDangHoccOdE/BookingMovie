import {Field, useField} from "formik";

export default function CustomTextArea({...props}) {
    const [field, meta] = useField(props);

    return(
        <Field as="textarea" {...field} {...props}/>
    )
}