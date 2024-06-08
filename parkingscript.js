const { chromium } = require('playwright');
const axios = require('axios');

const USERNAME_SELECTOR = 'input[name="email"]';
const PASSWORD_SELECTOR = 'input[name="password"]';
const VEHICLE_REG_SELECTOR = 'input[id="vehicleReg"]';
const LOGIN_BUTTON_SELECTOR = 'button:has-text("sisene")';
const START_PARKING_BUTTON_SELECTOR = 'button:has-text("alusta parkimine")';

class EuroParkAutomation {
    constructor() {
        this.username = process.env.EMAIL;
        this.password = process.env.PASSWORD;
        this.vehicleReg = process.env.VEHICLE_REG;
        this.telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
        this.chatId = process.env.TELEGRAM_CHAT_ID;
        this.browser = null;
        this.page = null;
    }

    async init() {
        try {
            this.browser = await chromium.launch({ headless: true });
            this.page = await this.browser.newPage();
        } catch (error) {
            console.error("Error during initialization: ", error);
            await this.sendNotification("Error during initialization: " + error.message);
            throw error;
        }
    }

    async login() {
        try {
            await this.page.goto('https://partner.europark.ee/login');
            await this.page.waitForSelector(USERNAME_SELECTOR);
            await this.page.fill(USERNAME_SELECTOR, this.username);
            await this.page.fill(PASSWORD_SELECTOR, this.password);
            await this.page.click(LOGIN_BUTTON_SELECTOR);
        } catch (error) {
            console.error("Error during login: ", error);
            await this.sendNotification("Error during login: " + error.message);
            throw error;
        }
    }

    async startParking() {
        try {
            await this.page.waitForSelector(VEHICLE_REG_SELECTOR);
            await this.page.fill(VEHICLE_REG_SELECTOR, this.vehicleReg);
            await this.page.click(START_PARKING_BUTTON_SELECTOR);
            await this.sendNotification("Parking started successfully. 😊");
        } catch (error) {
            console.error("Error during starting parking: ", error);
            await this.sendNotification("Error during starting parking: " + error.message);
            throw error;
        }
    }

    async sendNotification(message) {
        try {
            await axios.post(`https://api.telegram.org/bot${this.telegramBotToken}/sendMessage`, {
                chat_id: this.chatId,
                text: message
            });
        } catch (error) {
            console.error("Error sending notification: ", error);
        }
    }

    async close() {
        try {
            await this.browser.close();
        } catch (error) {
            console.error("Error during closing the browser: ", error);
            await this.sendNotification("Error during closing the browser: " + error.message);
            throw error;
        }
    }

    async run() {
        try {
            await this.init();
            await this.login();
            await this.startParking();
        } catch (error) {
            console.error("Error during running the automation: ", error);
        } finally {
            await this.close();
        }
    }
}

new EuroParkAutomation().run();
