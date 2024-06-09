import { IHttpResponse } from './IHttpResponse';

export interface IHttpClient {
    post(url: string, data: any): Promise<IHttpResponse>;
}