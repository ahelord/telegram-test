import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { MessageDto } from '../dtos/message.dto';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { ChatMessageRepository } from '../repositories/chat-message.repository';
import { formatMessage } from '../../common/utils/format-message.util';
import { ReasonPhrases } from 'http-status-codes';

@Injectable()
export class ChatService {
  telegramBot: TelegramBot;

  constructor(private readonly configService: ConfigService, private chatMessageRepository: ChatMessageRepository) {
    this.telegramBot = new TelegramBot(this.configService.get<string>('config.telegramBotToken'), { polling: true });
    this.handleIncomingMessages();
  }

  private handleIncomingMessages() {
    this.telegramBot.on('message', incomeMessage => {
      void (async () => {
        try {
          const externalId = incomeMessage.message_id.toString();
          const groupExternalId = this.configService.get<string>('config.telegramChatId');
          const attachmentUrl = await this.getUrlOfAttachment(incomeMessage);
          const fromExternalId = incomeMessage.from.id.toString();
          await this.chatMessageRepository.findOrCreate(
            externalId,
            groupExternalId,
            attachmentUrl,
            fromExternalId,
            incomeMessage.text || incomeMessage.caption
          );
        } catch (error) {
          Logger.error(formatMessage(ChatService.name, this.handleIncomingMessages.name, error));
        }
      })();
    });
  }

  private async getUrlOfAttachment(msg: TelegramBot.Message): Promise<string> {
    try {
      if (!msg.text) {
        const fileId =
          (msg.photo && msg.photo[0]?.file_id) ||
          msg.voice?.file_id ||
          msg.audio?.file_id ||
          msg.video?.file_id ||
          msg.document?.file_id ||
          msg.video_note?.file_id;
        return await this.telegramBot.getFileLink(fileId);
      }
    } catch (error) {
      Logger.error(formatMessage(ChatService.name, this.getUrlOfAttachment.name, error));
    }
  }

  async sendMessage(message: string): Promise<MessageDto> {
    try {
      const response = await this.telegramBotSendMessage(
        message,
        this.configService.get<string>('config.telegramChatId')
      );
      console.log(response);
      const externalId = response.message_id.toString();
      const groupExternalId = this.configService.get<string>('config.telegramChatId');
      const attachmentUrl = await this.getUrlOfAttachment(response);
      const fromExternalId = response.from.id.toString();
      const chatMessage = await this.chatMessageRepository.findOrCreate(
        externalId,
        groupExternalId,
        attachmentUrl,
        fromExternalId,
        response.text
      );
      return {
        id: chatMessage.id,
        message: chatMessage.message,
        attachmentUrl: chatMessage.attachmentUrl,
      } as MessageDto;
    } catch (error) {
      Logger.error(formatMessage(ChatService.name, this.sendMessage.name, error));
      throw new InternalServerErrorException(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  }

  async telegramBotSendMessage(message: string, chatId: string) {
    return await this.telegramBot.sendMessage(chatId, message);
  }

  async getMessages(): Promise<MessageDto[]> {
    try {
      const chatMessages = await this.chatMessageRepository.find();
      const messagesDto = chatMessages.map(
        chatMessage =>
          ({
            message: chatMessage.message,
            id: chatMessage.id,
            attachmentUrl: chatMessage.attachmentUrl,
          } as MessageDto)
      );
      return messagesDto;
    } catch (error) {
      Logger.error(formatMessage(ChatService.name, this.getMessages.name, error));
      throw new InternalServerErrorException(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  }
}
