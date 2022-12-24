import {
  getContainerElement,
  getFooter,
  getHeader,
  matchIsPopupOpened
} from '@helpers/linkedin-dom'
import { SubscriptionSelection } from '@helpers/selection'
import { subscribeSelectionChange } from './create-tooltip'

function createObserver(): void {
  let currentSubscription: SubscriptionSelection | null = null
  const containerElement = getContainerElement()
  if (containerElement) {
    const onObserveMutation = (): void => {
      if (!currentSubscription && matchIsPopupOpened()) {
        currentSubscription = subscribeSelectionChange()
        const footerEditor = getFooter()
        const headerEditor = getHeader()
        if (headerEditor) {
          headerEditor.style.userSelect = 'none'
        }
        if (footerEditor) {
          footerEditor.style.userSelect = 'none'
        }
      } else if (currentSubscription && !matchIsPopupOpened()) {
        currentSubscription.unsubscribe()
        currentSubscription = null
      }
    }

    const observer = new MutationObserver(onObserveMutation)
    observer.observe(containerElement, {
      childList: true
    })
  }
}

createObserver()
