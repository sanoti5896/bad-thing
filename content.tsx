import debounce from "lodash.debounce"
import type { PlasmoContentScript } from "plasmo"
import { useEffect } from "react"

import { useStorage } from "@plasmohq/storage"

export const config: PlasmoContentScript = {
  matches: ["https://*/*"]
}

// Idea for an UI API, for popup, notification badge, or mounting UI
// Idea for static mount
// Idea for styling injection support (inline or with custom emotion cache)

// export const getRootContainer = () => {
//   return document.querySelector("#feature")
// }

const replaceOnDocument = (
  badThingList = [],
  string,
  { target = document.body } = {}
) => {
  if (!Array.isArray(badThingList) || badThingList.length === 0) return

  const query = badThingList.join("|")
  const pattern = new RegExp(query, "gi")

  // Handle `string` — see the last section
  ;[
    target,
    ...target.querySelectorAll("*:not(script):not(noscript):not(style)")
  ].forEach(({ childNodes: [...nodes] }) =>
    nodes
      .filter(({ nodeType }) => nodeType === document.TEXT_NODE)
      .forEach(
        (textNode) =>
          (textNode.textContent = textNode.textContent.replace(pattern, string))
      )
  )
}

const PlasmoOverlay = () => {
  const [badThingList = []] = useStorage<Array<string>>("bad-thing-list")

  const runBadThing = () => {
    replaceOnDocument(badThingList, "bad thing")
  }

  useEffect(() => {
    runBadThing()
  }, [])

  useEffect(() => {
    runBadThing()
  }, [badThingList])

  window.addEventListener("scroll", debounce(runBadThing, 500))

  return <div></div>
}

export default PlasmoOverlay
