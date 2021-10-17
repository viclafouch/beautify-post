import { getContainerElement, matchIsPopupOpened } from '@helpers/linkedin-dom'
import { initTootlip } from './create-tooltip'

function createObserver() {
  let isPopupOpen = false
  const containerElement = getContainerElement()
  if (containerElement) {
    const onObserveMutation = () => {
      if (!isPopupOpen && matchIsPopupOpened()) {
        isPopupOpen = true
        initTootlip()
      } else if (isPopupOpen) {
        isPopupOpen = false
      }
    }

    const observer = new MutationObserver(onObserveMutation)
    observer.observe(containerElement, {
      childList: true
    })
  }
}

createObserver()
