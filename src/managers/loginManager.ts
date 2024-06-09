import { IPage } from '../interfaces/IPage';

const USERNAME_SELECTOR = 'input[name="email"]';
const PASSWORD_SELECTOR = 'input[name="password"]';
const LOGIN_BUTTON_SELECTOR = 'button:has-text("sisene")';

export class LoginManager {
    private page: IPage;
    private username: string;
    private password: string;

    constructor(page: IPage, username: string, password: string) {
        this.page = page;
        this.username = username;
        this.password = password;
    }

    async login() {
        try {
            await this.page.goto('https://partner.europark.ee/login');
            await this.page.waitForSelector(USERNAME_SELECTOR);
            await this.page.fill(USERNAME_SELECTOR, this.username);
            await this.page.fill(PASSWORD_SELECTOR, this.password);
            await this.page.click(LOGIN_BUTTON_SELECTOR);
        } catch (error) {
            throw new Error(`Error during login: ${error}`);
        }
    }
}