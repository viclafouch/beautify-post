import puppeteer from 'puppeteer'

export function appendTextToBody(text: string): HTMLElement {
  const nodeContents = document.createElement('div')
  nodeContents.textContent = text
  document.body.appendChild(nodeContents)
  return nodeContents
}

export function createSelection(selectNodeContents: Node): Selection {
  const selection = window.getSelection() as Selection
  const range = document.createRange()
  range.selectNodeContents(selectNodeContents)
  selection.removeAllRanges()
  selection.addRange(range)
  return selection
}

// https://stackoverflow.com/questions/42805128/does-jest-reset-the-jsdom-document-after-every-suite-or-test#comment101682049_50800473
export function cleanDocument(): void {
  document.body.innerHTML = ''
  document.head.innerHTML = ''
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
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
  const page = await browser.newPage()
  try {
    await page.goto('https://www.linkedin.com/login')
    await page.$eval(
      'input#username',
      (input: Element, userEmail: unknown) => {
        if (input instanceof HTMLInputElement) {
          input.value = String(userEmail) || ''
        }
      },
      email
    )
    await page.$eval(
      'input#password',
      (input: Element, userPassword: unknown) => {
        if (input instanceof HTMLInputElement) {
          input.value = String(userPassword)
        }
      },
      password
    )

    await page.click('.login__form_action_container > button[type="submit"]')
    await page.waitForSelector('.share-box-feed-entry__trigger', {
      timeout: 3000
    })
    return { page, browser }
  } catch (error) {
    await browser.close()
    return Promise.reject('EMAIL_OR_PASSWORD_INCORRECT')
  }
}
