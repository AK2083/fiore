import { UserMessage } from '@core/models/messages/user.message.model';

export class DuplicateMailException extends Error {
  constructor(public readonly userMessage: UserMessage) {
    super(userMessage.message);
    this.name = 'DuplicateMailException';
  }
}
