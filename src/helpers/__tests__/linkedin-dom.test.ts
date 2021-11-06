import { jest } from '@jest/globals'
import {
  getContainerElement,
  getTextEditorElement
} from '@helpers/linkedin-dom'
import { Browser, Page } from 'puppeteer'
import { initLinkedinFeedPage } from './utils'

let feedPage: Page
let currentBrowser: Browser
const { LINKEDIN_EMAIL_TEST, LINKEDIN_PASSWORD_TEST } = process.env
const withPupetter =
  LINKEDIN_EMAIL_TEST && LINKEDIN_PASSWORD_TEST ? describe : describe.skip

// TODO: make it work 100%
// eslint-disable-next-line jest/no-disabled-tests
withPupetter('helpers/linkedin-dom', () => {
  beforeAll(async () => {
    jest.setTimeout(50000)
    const { page, browser } = await initLinkedinFeedPage({
      email: LINKEDIN_EMAIL_TEST as string,
      password: LINKEDIN_PASSWORD_TEST as string
    })
    feedPage = page
    currentBrowser = browser
  })

  describe('Pupetter tests with your account', () => {
    describe('getContainerElement', function () {
      beforeAll(async () => {
        await feedPage.exposeFunction(
          'getContainerElement',
          getContainerElement
        )
      })

      it('check if linkedin feed as container element', async () => {
        const isContainerExists = await feedPage.evaluate(() => {
          const container = getContainerElement()
          return container !== null
        })
        expect(isContainerExists).toBeTrue()
      })
    })

    describe('getTextEditorElement', () => {
      beforeAll(async () => {
        await feedPage.exposeFunction(
          'getTextEditorElement',
          getTextEditorElement
        )
      })

      it('should return null when no clicking on new post', async () => {
        const textEditor = await feedPage.evaluate(() => {
          return getTextEditorElement()
        })
        expect(textEditor).toBeNull()
      })
    })

    afterAll(async () => {
      await feedPage?.close()
      await currentBrowser?.close()
    })
  })
})
