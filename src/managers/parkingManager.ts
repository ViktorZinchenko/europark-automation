import { IPage } from '../interfaces/IPage';

const VEHICLE_REG_SELECTOR = 'input[id="vehicleReg"]';
const START_PARKING_BUTTON_SELECTOR = 'button:has-text("alusta parkimine")';
const SUCCESS_MESSAGE_SELECTOR = 'button:has-text("lõpeta parkimine")';

export class ParkingManager {
    private page: IPage;
    private vehicleReg: string;

    constructor(page: IPage, vehicleReg: string) {
        this.page = page;
        this.vehicleReg = vehicleReg;
    }

    async startParking() {
        try {
            await this.page.waitForSelector(VEHICLE_REG_SELECTOR);
            await this.page.fill(VEHICLE_REG_SELECTOR, this.vehicleReg);
            await this.page.click(START_PARKING_BUTTON_SELECTOR);
            await this.page.waitForSelector(SUCCESS_MESSAGE_SELECTOR);
        } catch (error) {
            throw new Error(`Error during starting parking: ${error}`);
        }
    }
}