export interface IHttpResponse {
    ok(): boolean;
    status(): number;
    statusText(): string;
}