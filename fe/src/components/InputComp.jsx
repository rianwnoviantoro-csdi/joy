import React from 'react'

const InputComp = ({ handler, customClass, name, label, type = 'text', value }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <label htmlFor={name} className="font-semibold">
          {label}
        </label>
        <div className="col-span-2">
          <input
            onChange={handler}
            id={name}
            name={name}
            type={type}
            className={`${customClass} px-4 py-2 w-full bg-slate-50 rounded-md focus:outline-none`}
            placeholder={label}
            value={value}
            autoComplete="off"
          />
        </div>
      </div>
    </>
  )
}

export default InputComp
