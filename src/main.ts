import { getContainerElement, matchIsPopupOpened } from '@helpers/linkedin-dom'
import {
  subscribeSelectionChange,
  unsubscribeSelectionChange
} from './create-tooltip'

function createObserver() {
  let isPopupOpen = false
  const containerElement = getContainerElement()
  if (containerElement) {
    const onObserveMutation = () => {
      if (!isPopupOpen && matchIsPopupOpened()) {
        isPopupOpen = true
        subscribeSelectionChange()
      } else if (isPopupOpen && !matchIsPopupOpened()) {
        isPopupOpen = false
        unsubscribeSelectionChange()
      }
    }

    const observer = new MutationObserver(onObserveMutation)
    observer.observe(containerElement, {
      childList: true
    })
  }
}

createObserver()
