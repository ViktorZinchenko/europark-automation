import { APIResponse } from 'playwright';
import { IHttpResponse } from '../interfaces/IHttpResponse';

export class PlaywrightHttpResponse implements IHttpResponse {
    private response: APIResponse;

    constructor(response: APIResponse) {
        this.response = response;
    }

    ok(): boolean {
        return this.response.ok();
    }

    status(): number {
        return this.response.status();
    }

    statusText(): string {
        return this.response.statusText();
    }
}