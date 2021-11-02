import { SubscriptionSelection } from '@helpers/selection'
import { getContainerElement, matchIsPopupOpened } from '@helpers/linkedin-dom'
import { subscribeSelectionChange } from './create-tooltip'

function createObserver() {
  let currentSubscription: SubscriptionSelection | null = null
  const containerElement = getContainerElement()
  if (containerElement) {
    const onObserveMutation = () => {
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
