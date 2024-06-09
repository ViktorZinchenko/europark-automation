import { chromium, Browser } from 'playwright';
import { IBrowserManager } from '../../interfaces/IBrowserManager';
import { IPage } from '../../interfaces/IPage';
import { PlaywrightPage } from './playwrightPage';

export class PlaywrightBrowserManager implements IBrowserManager {
    private browser: Browser | null = null;
    private page: PlaywrightPage | null = null;

    async init() {
        try {
            this.browser = await chromium.launch({ headless: true });
            
            const page = await this.browser.newPage();
            this.page = new PlaywrightPage(page);
        } catch (error) {
            throw new Error(`Error during initialization: ${error}`);
        }
    }

    getPage(): IPage {
        if (!this.page) throw new Error("Page is not initialized");
        return this.page;
    }

    async close() {
        try {
            if (this.browser) {
                await this.browser.close();
            }
        } catch (error) {
            throw new Error(`Error during closing the browser: ${error}`);
        }
    }
}