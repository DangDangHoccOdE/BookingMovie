import {Field, useField} from "formik";

export default function CustomTextInput({...props}) {
    const [field, meta] = useField(props);

    return(
        <Field {...field} {...props}></Field>
    )
}