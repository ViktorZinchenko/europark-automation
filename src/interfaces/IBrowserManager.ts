import { IPage } from './IPage';

export interface IBrowserManager {
    init(): Promise<void>;
    getPage(): IPage;
    close(): Promise<void>;
}