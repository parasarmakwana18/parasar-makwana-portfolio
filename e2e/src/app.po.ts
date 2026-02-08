import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getPageTitle(): Promise<string> {
    return browser.getTitle() as Promise<string>;
  }
}
