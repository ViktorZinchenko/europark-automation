export interface IPage {
    goto(url: string): Promise<void>;
    fill(selector: string, value: string): Promise<void>;
    click(selector: string): Promise<void>;
    waitForSelector(selector: string): Promise<void>;
}