import { getContainerElement, matchIsPopupOpened } from '@helpers/linkedin-dom'
import { SubscriptionSelection } from '@helpers/selection'
import { subscribeSelectionChange } from './create-tooltip'

function createObserver(): void {
  let currentSubscription: SubscriptionSelection | null = null
  const containerElement = getContainerElement()
  if (containerElement) {
    const onObserveMutation = (): void => {
      if (!currentSubscription && matchIsPopupOpened()) {
        currentSubscription = subscribeSelectionChange()
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
