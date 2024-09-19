import React from "react";

function CustomInput({title, placeholder, value, onChange, error=false, isPassword=false, required=false, reactForm}) {
  return (
    <div className="wrapper flex flex-col gap-1 w-80">
      <div className="flex items-center justify-between">
      <label htmlFor="username" className="font-semibold">
        {title}
      </label>

      {error && <p className="text-red-500">*Required Field</p>}
      
      </div>
      <input
        {...reactForm}
        type={isPassword == true ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        onChange={ (e) => {onChange(e.currentTarget.value)} }
        required={required}
        className={`border ${error ? "border-red-500" : "border-black"} p-2 rounded-lg`}
      />
    </div>
  );
}

export default CustomInput;
