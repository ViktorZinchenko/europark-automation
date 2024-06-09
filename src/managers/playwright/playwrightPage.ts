import { Page } from 'playwright';
import { IPage } from '../../interfaces/IPage';

export class PlaywrightPage implements IPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async fill(selector: string, value: string): Promise<void> {
        await this.page.fill(selector, value);
    }

    async click(selector: string): Promise<void> {
        await this.page.click(selector);
    }

    async waitForSelector(selector: string): Promise<void> {
        await this.page.waitForSelector(selector);
    }
}