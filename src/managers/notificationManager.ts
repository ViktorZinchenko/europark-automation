import { IHttpClient } from '../interfaces/IHttpClient';

export class NotificationManager {
    private telegramBotToken: string;
    private chatId: string;
    private notificationSent: boolean = false;
    private httpClient: IHttpClient;

    constructor(telegramBotToken: string, chatId: string, httpClient: IHttpClient) {
        this.telegramBotToken = telegramBotToken;
        this.chatId = chatId;
        this.httpClient = httpClient;
    }

    async sendNotification(message: string) {
        if (this.notificationSent) return;
        try {
            const response = await this.httpClient.post(`https://api.telegram.org/bot${this.telegramBotToken}/sendMessage`, {
                chat_id: this.chatId,
                text: message
            });

            if (response.ok()) {
                this.notificationSent = true;
            } else {
                throw new Error(`HTTP error! status: ${response.status()} - ${response.statusText()}`);
            }
        } catch (error) {
            console.error(`Error sending notification: ${(error as Error).message}`);
        }
    }
}