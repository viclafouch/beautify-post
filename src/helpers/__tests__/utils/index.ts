import puppeteer from 'puppeteer'

export function appendTextToBody(text: string): HTMLElement {
  const nodeContents = document.createElement('div')
  nodeContents.textContent = text
  document.body.appendChild(nodeContents)
  return nodeContents
}

export function createSelection(selectNodeContents: Node): Selection {
  const selection = window.getSelection() as Selection
  const selectionRange = document.createRange()
  selectionRange.selectNodeContents(selectNodeContents)
  selection.removeAllRanges()
  selection.addRange(selectionRange)
  return selection
}

// https://stackoverflow.com/questions/42805128/does-jest-reset-the-jsdom-document-after-every-suite-or-test#comment101682049_50800473
export function cleanDocument(): void {
  document.body.innerHTML = ''
  document.head.innerHTML = ''
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, index) => {
    return start + index
  })
}

type Credentials = {
  email: string
  password: string
}

type InitLinkedinFeedPage = {
  page: puppeteer.Page
  browser: puppeteer.Browser
}

export async function initLinkedinFeedPage({
  email,
  password
}: Credentials): Promise<InitLinkedinFeedPage> {
  const browser = await puppeteer.launch()
  const page = (await browser.pages())[0]
  try {
    await page.goto('https://www.linkedin.com/login')
    await page.$eval(
      'input#username',
      (input: Element, userEmail: unknown) => {
        if (input instanceof HTMLInputElement) {
          // eslint-disable-next-line no-param-reassign
          input.value = String(userEmail) || ''
        }
      },
      email
    )
    await page.$eval(
      'input#password',
      (input: Element, userPassword: unknown) => {
        if (input instanceof HTMLInputElement) {
          // eslint-disable-next-line no-param-reassign
          input.value = String(userPassword)
        }
      },
      password
    )
    await new Promise((resolve) => {
      setTimeout(resolve, 3000)
    })
    await page.click('.login__form_action_container > button[type="submit"]')
    await new Promise((resolve) => {
      setTimeout(resolve, 3000)
    })
    await page.waitForSelector('.share-box-feed-entry__trigger')
    return { page, browser }
  } catch (error) {
    await browser.close()
    return Promise.reject(new Error('EMAIL_OR_PASSWORD_INCORRECT'))
  }
}
