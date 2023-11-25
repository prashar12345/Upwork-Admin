import React from "react";
import Html from "./html";

const SelectDropdown = ({intialValue,options,isSingle,result,displayValue='name',id,placeholder="Select Status",disabled=false,name,required=false}) => {
    const handleChange=(e)=>{
        result({event:"value",value:e})
    }

    return <>
        <Html
        id={id}
        name={name}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        isSingle={isSingle}
        displayValue={displayValue}
        options={options}
        selectedValues={intialValue}
        handleChange={handleChange}
        />
    </>
}

export default SelectDropdown