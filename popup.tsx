// import debounce from "lodash.debounce"
import classNames from "classnames"
import icon from "data-base64:~assets/icon512.png"
import { useState } from "react"

import { useStorage } from "@plasmohq/storage"

import "./style.css"

window.addEventListener("load", () => {
  const html = document.querySelector("html")
  const body = document.querySelector("body")
  html.style.background = "rgb(23 23 23)"
  body.style.background = "rgb(23 23 23)"
})

function IndexPopup() {
  const [badThingList, setBadListThing] = useStorage<Array<string>>(
    "bad-thing-list",
    []
  )
  const [value, setValue] = useState("")

  const addBadThing = (e) => {
    e.preventDefault()

    if (value && !badThingList.includes(value)) {
      setBadListThing([...badThingList, value])
      setValue("")
    }
  }

  const remove = (element) => () => {
    if (element) {
      const newArray = badThingList.filter((value) => value != element)
      setBadListThing(newArray)
    }
  }

  return (
    <div className="bg-neutral-900 text-white px-8 flex flex-col p-4 mb-1">
      <img
        className="max-w-[140px] mt-0 m-auto mb-2.5"
        src={icon}
        alt="Bad Thing"
      />

      <form className="flex flex-col mb-8" onSubmit={addBadThing}>
        <input
          className="p-2 border-b-neutral-900 font-semibold block w-full border border-slate-300 rounded-none focus:outline-none focus:ring-0 focus:border-blue-300 text-neutral-800 placeholder:italic placeholder:text-slate-600 placeholder:text-sm"
          placeholder="Enter an NPC topic"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="flex-1 bg-slate-600 text-white border-slate-600 px-1 py-2 hover:bg-slate-500 focus:outline-none"
          onClick={addBadThing}>
          Add Bad Thing
        </button>
      </form>

      <section>
        {badThingList.length > 0 && (
          <>
            <h2 className="font-semibold mb-1">Current Bad Things:</h2>
            <button
              className="bg-red-800 text-white border-red-800 px-3 py-2 hover:bg-red-700 focus:outline-none font-semibold block w-full"
              onClick={() => setBadListThing([])}>
              Clear All
            </button>
          </>
        )}
        {badThingList.map((value, index) => (
          <div className="flex justify-between py-1" key={`${value}-${index}`}>
            <span className="flex items-center justify-start bg-slate-100 text-slate-900 flex-1 p-2 cursor-not-allowed">
              {value}
            </span>
            <button
              className="bg-slate-600 text-white border-slate-600 px-3 py-2 hover:bg-slate-500 focus:outline-none text-lg font-semibold"
              onClick={remove(value)}>
              x
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}

export default IndexPopup
