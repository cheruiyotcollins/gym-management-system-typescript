import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/solid";
import React, { Fragment } from "react";
import { IFilterParams } from "../../../interfaces/Product";
import { filters } from "../config";

interface Props {
  filterParams: IFilterParams;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (open: boolean) => void;
  handleSearch: (query: string) => void;
  handleCategoryChange: (category: string) => void;
}

const MobileFiltersDialog: React.FC<Props> = ({
  filterParams,
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleSearch,
  handleCategoryChange,
}) => {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40 lg:hidden"
        onClose={() => setMobileFiltersOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* Replacing Dialog.Overlay with a div */}
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
            <div className="px-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4 border-t border-gray-200">
              <h3 className="sr-only">Categories</h3>
              <div className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search"
                    type="search"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </div>

              {filters.map((section) => (
                <Disclosure
                  defaultOpen={true}
                  as="div"
                  key={section.id}
                  className="border-t border-gray-200 px-4 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusSmallIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusSmallIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                checked={filterParams.category.includes(
                                  option.value
                                )}
                                onChange={() =>
                                  handleCategoryChange(option.value)
                                }
                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileFiltersDialog;
