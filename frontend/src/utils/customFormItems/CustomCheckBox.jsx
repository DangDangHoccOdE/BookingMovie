import {Field, useField} from "formik";
import React from "react";

export default function CustomCheckBox({...props}) {
    const [field, meta] = useField(props);
   // ...field: Truyền toàn bộ thuộc tính (name, value, onChange, onBlur) vào input.
   // ...props: Giữ nguyên các props khác mà component nhận được.
    
    return(
        <Field {...field} {...props} />
    )
}