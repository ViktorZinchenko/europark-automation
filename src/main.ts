import { IBrowserManager } from './interfaces/IBrowserManager';
import { PlaywrightBrowserManager } from './managers/playwright/playwrightBrowserManager';
import { PlaywrightHttpClient } from './clients/playwrightHttpClient';
import { LoginManager } from './managers/loginManager';
import { ParkingManager } from './managers/parkingManager';
import { NotificationManager } from './managers/notificationManager';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    const browserManager = new PlaywrightBrowserManager();
    const httpClient = await PlaywrightHttpClient.create();
    const notificationManager = new NotificationManager(
        process.env.TELEGRAM_BOT_TOKEN || '',
        process.env.TELEGRAM_CHAT_ID || '',
        httpClient
    );

    await new EuroParkAutomation(browserManager, notificationManager).run();
}

class EuroParkAutomation {
    private username: string;
    private password: string;
    private vehicleReg: string;
    private browserManager: IBrowserManager;
    private notificationManager: NotificationManager;

    constructor(browserManager: IBrowserManager, notificationManager: NotificationManager) {
        this.username = process.env.EMAIL || '';
        this.password = process.env.PASSWORD || '';
        this.vehicleReg = process.env.VEHICLE_REG || '';
        this.browserManager = browserManager;
        this.notificationManager = notificationManager;
    }

    async run() {
        try {
            await this.browserManager.init();
            const page = this.browserManager.getPage();
            await new LoginManager(page, this.username, this.password).login();
            await new ParkingManager(page, this.vehicleReg).startParking();
            await this.notificationManager.sendNotification("Parking started successfully. 😊");
        } catch (error) {
            const errorMessage = `Error during running the automation: ${(error as Error).message}`;
            console.error(errorMessage);
            await this.notificationManager.sendNotification(errorMessage);
        } finally {
            await this.browserManager.close();
        }
    }
}

main().catch(error => {
    console.error("Unhandled error: ", error);
    process.exit(1);
});