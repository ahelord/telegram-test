import { EntityRepository, Repository } from 'typeorm';
import { ChatMessage } from '../entities/chat-message.entity';

@EntityRepository(ChatMessage)
export class ChatMessageRepository extends Repository<ChatMessage> {
  constructor() {
    super();
  }
  public async findOrCreate(
    externalId: string,
    groupExternalId: string,
    attachmentUrl: string,
    fromExternalId: string,
    message: string
  ) {
    let chatMessage = await this.findOne({ externalId, groupExternalId });
    if (!chatMessage) {
      chatMessage = await this.save({
        message,
        attachmentUrl,
        fromExternalId,
        externalId,
        groupExternalId,
      });
    }
    return chatMessage;
  }
}
