import React from 'react'

const SelectComp = ({ name, label, multiple = false, options }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <label htmlFor={name} className="font-semibold">
          {label}
        </label>
        <div className="col-span-2">
          <select name={name} id={name} className="px-4 py-2 w-full bg-slate-50 rounded-md focus:outline-none" multiple={multiple}>
            {options}
          </select>
        </div>
      </div>
    </>
  )
}

export default SelectComp
