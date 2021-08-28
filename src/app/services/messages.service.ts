import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Message } from '../interfaces/message';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  apiURL: string = 'http://localhost:8080/messages';

  constructor(private http: HttpClient) {}

  getMessages(): any {
    return this.http.get<any>(this.apiURL);
  }

  getMessageById(id: number): Message | null {
    let message: Message | null = null;

    this.http.get<Message>(`${this.apiURL}/${id}`).subscribe((res) => {
      message = { id: res.id, title: res.title, description: res.description };
    });

    return message;
  }

  addMessage(message: Message) {
    return this.http.post<any>(this.apiURL, {
      title: message.title,
      description: message.description,
    });
  }

  updateMessage(id: number, message: Message) {
    return this.http.put<Message>(`${this.apiURL}/${id}`, {
      title: message.title,
      description: message.description,
    });
  }

  deleteMessage(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
