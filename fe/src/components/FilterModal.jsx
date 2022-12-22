import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const FilterModal = ({ toggled, toggle, submitHandler, sortBy, sortValue, orderValue, limitValue }) => {
  const cancelButtonRef = useRef(null)

  return (
    <>
      <Transition.Root show={toggled} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={toggle}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form className="w-full" onSubmit={submitHandler}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="">
                        <div className="mt-2">
                          <Dialog.Title as="h3" className="text-center text-lg font-medium leading-6 text-gray-900">
                            Filter
                          </Dialog.Title>
                          <div className="mt-4">
                            <div className="grid grid-cols-8 gap-6 items-center">
                              <div className="col-span-4">
                                <div className="grid grid-cols-3 gap-2 items-center">
                                  <label htmlFor="sortBy" className="block text-sm font-medium text-slate-700">
                                    Sort by
                                  </label>
                                  <div className="col-span-2">
                                    <select
                                      name="sort"
                                      defaultValue={sortValue}
                                      id="sortBy"
                                      className="mt-1 blocl w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                      {sortBy?.length &&
                                        sortBy.map((sort, index) => (
                                          <option key={index} value={sort.value}>
                                            {sort.name}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-4">
                                <div className="grid grid-cols-3 gap-2 items-center">
                                  <label htmlFor="orderBy" className="block text-sm font-medium text-slate-700">
                                    Order by
                                  </label>
                                  <div className="col-span-2">
                                    <select
                                      name="order"
                                      defaultValue={orderValue}
                                      id="orderBy"
                                      className="mt-1 blocl w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                      <option value="asc">Ascending</option>
                                      <option value="desc">Descending</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-4">
                                <div className="grid grid-cols-3 gap-2 items-center">
                                  <label htmlFor="limit" className="block text-sm font-medium text-slate-700">
                                    Limit
                                  </label>
                                  <div className="col-span-2">
                                    <select
                                      name="limit"
                                      defaultValue={limitValue}
                                      id="limit"
                                      className="mt-1 blocl w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                      <option value="5">5</option>
                                      <option value="10">10</option>
                                      <option value="15">15</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={toggle}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Apply
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default FilterModal
