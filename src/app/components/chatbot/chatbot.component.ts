import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Message, predefinedResponses} from "../../models/models";

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent  { // implements AfterViewInit
  // isOpen = false;
  // isMinimized = false;
  // messages: Message[] = [];
  // userInput = '';
  // isLoading = false;
  //
  // @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  //
  // constructor() {}
  //
  // ngAfterViewInit() {
  //   this.scrollToBottom();
  // }
  //
  // toggleChat(): void {
  //   if (!this.isOpen) {
  //     this.isOpen = true;
  //     this.isMinimized = false;
  //   } else {
  //     this.isMinimized = !this.isMinimized;
  //   }
  // }
  //
  // closeChat(): void {
  //   this.isOpen = false;
  //   this.isMinimized = false;
  // }
  //
  // sendMessage(): void {
  //   if (!this.userInput.trim()) {
  //     return;
  //   }
  //
  //   const userMessage: Message = { role: 'user', content: this.userInput.trim() };
  //
  //   this.messages.push(userMessage);
  //   const inputText = this.userInput;
  //   this.userInput = '';
  //   this.scrollToBottom();
  //
  //   this.isLoading = false;
  //
  //   setTimeout(() => {
  //     const responseText = this.getAssistantResponse(inputText);
  //     const assistantMessage: Message = { role: 'assistant', content: responseText };
  //
  //     this.messages.push(assistantMessage);
  //     this.isLoading = false;
  //     this.scrollToBottom();
  //   }, 1500);
  // }
  //
  // scrollToBottom(): void {
  //   setTimeout(() => {
  //     if (this.messagesContainer) {
  //       this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
  //     }
  //   }, 0);
  // }
  //
  // getAssistantResponse(userMessage: string): string {
  //   const lowerMessage = userMessage.toLowerCase();
  //   for (const predefined of predefinedResponses) {
  //     for (const keyword of predefined.keywords) {
  //       if (lowerMessage.includes(keyword)) {
  //         const responses = predefined.responses;
  //         return responses[Math.floor(Math.random() * responses.length)];
  //       }
  //     }
  //   }
  //   return "Je ne suis pas sûr de comprendre, pouvez-vous reformuler ?";
  // }







  isOpen = false;          // Indique si la fenêtre de chat est ouverte
  isMinimized = false;     // Indique si la fenêtre de chat est minimisée
  messages: Message[] = []; // Tableau de messages
  isLoading = false;       // Indique l'état de chargement lors de l'envoi/réception d'un message
  userInput = '';          // Texte saisi par l'utilisateur

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  // Permet d'ouvrir/fermer le chat ou de le minimiser
  toggleChat(): void {
    if (!this.isOpen) {
      this.isOpen = true;
    } else {
      this.isMinimized = !this.isMinimized;
    }
  }

  // Ferme complètement le chat et réinitialise la minimisation
  closeChat(): void {
    this.isOpen = false;
    this.isMinimized = false;
  }

  // Vide la conversation
  clearChat(): void {
    this.messages = [];
  }

  // Envoi du message de l'utilisateur et simulation d'une réponse de l'assistant
  sendMessage(): void {
    if (!this.userInput.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: this.userInput,
      timestamp: Date.now()
    };

    this.messages.push(userMessage);
    this.userInput = '';
    this.isLoading = true;
    this.scrollToBottom();

    // Simuler un délai pour la réponse de l'assistant (exemple avec setTimeout)
    setTimeout(() => {
      this.receiveResponse(userMessage);
      this.isLoading = false;
      this.scrollToBottom();
    }, 1000);
  }

  // Simule une réponse de l'assistant
  receiveResponse(userMessage: Message): void {
    const response: Message = {
      role: 'assistant',
      content: `Réponse à : "${userMessage.content}"`, // exemple de réponse
      timestamp: Date.now()
    };

    this.messages.push(response);
    this.scrollToBottom();
  }

  // Formate le timestamp pour l'affichage (exemple en heure locale)
  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  }

  // Fait défiler le conteneur de messages vers le bas
  scrollToBottom(): void {
    try {
      setTimeout(() => {
        if (this.messagesContainer) {
          this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
        }
      }, 0);
    } catch (error) {
      console.error('Erreur lors du défilement vers le bas:', error);
    }
  }


}
