import { HttpClient } from '@angular/common/http';
import { MessagesService } from './services/messages.service';
import { Message } from './interfaces/message';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  messages: any = [{ id: 0, title: 'title', description: 'desc' }];

  showConfirmDeleteModal: boolean = false;
  showEditModal: boolean = false;

  currentTitle: string = '';
  currentDescription: string = '';

  currentEditTitle: string = '';
  currentEditDescription: string = '';

  currentId: number = 0;

  constructor(private http: HttpClient) {}

  setCurrentTitle(event: any) {
    this.currentTitle = event.target.value;
  }

  setCurrentDescription(event: any) {
    this.currentDescription = event.target.value;
  }

  setCurrentEditTitle(event: any) {
    this.currentEditTitle = event.target.value;
  }

  setCurrentEditDescription(event: any) {
    this.currentEditDescription = event.target.value;
  }

  getMessages() {
    this.http
      .get('http://localhost:8080/messages')
      .subscribe((res) => (this.messages = res));
  }

  private clearCurrentInput() {
    this.currentTitle = '';
    this.currentDescription = '';
  }

  private clearCurrentEditInput() {
    this.currentEditTitle = '';
    this.currentEditDescription = '';
  }

  addMessage() {
    if (this.currentTitle !== '' && this.currentDescription !== '') {
      // this.messagesService.addMessage({
      //   title: this.currentTitle,
      //   description: this.currentDescription,
      // });
      this.getMessages();
      this.clearCurrentInput();
    }
  }

  private deleteMessage(id: number) {
    // this.messagesService.deleteMessage(id);
    this.getMessages();
  }

  private editMessage(id: number) {
    if (this.currentEditTitle !== '' && this.currentEditDescription !== '') {
      // this.messagesService.updateMessage(id, {
      //   title: this.currentEditTitle,
      //   description: this.currentEditDescription,
      // });
      this.getMessages();
      this.clearCurrentEditInput();
    }
  }

  openConfirmDeleteModal(id: number | undefined) {
    this.showConfirmDeleteModal = true;
    if (id) {
      this.currentId = id;
    }
  }

  closeConfirmDeleteModal() {
    this.showConfirmDeleteModal = false;
  }

  closeConfirmDeleteModalAndDelete() {
    this.closeConfirmDeleteModal();
    this.deleteMessage(this.currentId);
  }

  openEditModal(
    id: number | undefined,
    title: string | undefined,
    description: string | undefined
  ) {
    this.showEditModal = true;
    if (id && title && description) {
      this.currentId = id;
      this.currentEditTitle = title;
      this.currentEditDescription = description;
    }
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  closeEditModalAndEdit() {
    this.closeEditModal();
    this.editMessage(this.currentId);
  }
}
