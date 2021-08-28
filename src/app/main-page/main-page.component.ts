import { MessagesService } from './../services/messages.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  messages: any = [];

  showConfirmDeleteModal: boolean = false;
  showEditModal: boolean = false;

  currentTitle: string = '';
  currentDescription: string = '';

  currentEditTitle: string = '';
  currentEditDescription: string = '';

  currentId: number = 0;

  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.getMessages();
  }

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
    let newMessages: any = [];
    this.messagesService.getMessages().subscribe((res: any) => {
      res.map((m: any) => {
        newMessages = [
          ...newMessages,
          {
            id: m.id,
            title: m.title,
            description: m.description,
            createdAt: m.createdAt,
            updatedAt: m.updatedAt,
          },
        ];
      });
      this.messages = newMessages;
    });
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
      this.messagesService
        .addMessage({
          title: this.currentTitle,
          description: this.currentDescription,
        })
        .subscribe((_) => {
          this.getMessages();
          this.clearCurrentInput();
        });
    }
  }

  private deleteMessage(id: number) {
    this.messagesService.deleteMessage(id).subscribe((_) => {
      this.getMessages();
    });
  }

  private editMessage(id: number) {
    if (this.currentEditTitle !== '' && this.currentEditDescription !== '') {
      this.messagesService
        .updateMessage(id, {
          title: this.currentEditTitle,
          description: this.currentEditDescription,
        })
        .subscribe((_) => {
          this.getMessages();
          this.clearCurrentEditInput();
        });
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
