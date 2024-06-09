import { request, APIRequestContext } from 'playwright';
import { IHttpClient } from '../interfaces/IHttpClient';
import { IHttpResponse } from '../interfaces/IHttpResponse';
import { PlaywrightHttpResponse } from './playwrightHttpResponse';

export class PlaywrightHttpClient implements IHttpClient {
    private requestContext: APIRequestContext;

    private constructor(requestContext: APIRequestContext) {
        this.requestContext = requestContext;
    }

    static async create(): Promise<PlaywrightHttpClient> {
        const requestContext = await request.newContext();
        return new PlaywrightHttpClient(requestContext);
    }

    async post(url: string, data: any): Promise<IHttpResponse> {
        const response = await this.requestContext.post(url, { data });
        return new PlaywrightHttpResponse(response);
    }
}