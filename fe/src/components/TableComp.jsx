import React from 'react'

const TableComp = ({ tableHeading, tableContent, prevPageHandler, nextPageHandler }) => {
  const activePrevbutton = prevPageHandler ? 'bg-white font-semibold text-slate-700 cursor-pointer' : 'bg-slate-50 text-slate-400 cursor-not-allowed'
  const activeNextbutton = nextPageHandler ? 'bg-white font-semibold text-slate-700 cursor-pointer' : 'bg-slate-50 text-slate-400 cursor-not-allowed'

  return (
    <>
      <div className="bg-white p-2 rounded-lg shadow-sm mt-2">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-bold uppercase text-slate-600 bg-slate-100">
              <tr>
                {tableHeading?.length
                  ? tableHeading.map((head, index) => (
                      <th key={index} className="p-2 font-semibold text-left tracking-widest">
                        {head}
                      </th>
                    ))
                  : null}
                <th className="p-2 font-semibold text-left tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 text-slate-700">
              {tableContent ? (
                tableContent
              ) : (
                <tr>
                  <td colSpan={6} className="p-2 text-center text-xs text-slate-500 tracking-widest">
                    No Data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end">
        <div className="flex items-center">
          <button onClick={prevPageHandler} className={`p-2 rounded-lg shadow-sm text-sm tracking-widest ${activePrevbutton}`}>
            Prev
          </button>
          <button onClick={nextPageHandler} className={`p-2 rounded-lg shadow-sm ml-2 border text-sm tracking-widest ${activeNextbutton}`}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default TableComp
