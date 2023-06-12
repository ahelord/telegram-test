import { ResponseDto } from '../../common/dto/response.dto';
import { MessagePostBodyDto } from '../dtos/message-post-body.dto';
import { MessageDto } from '../dtos/message.dto';

export abstract class ChatStub {
  static params = {
    messageBodyDto: { message: 'hello' } as MessagePostBodyDto,
    telegramChatId: 'config.telegramChatId',
    message: 'hello',
  };
  static repository = {
    find: [
      {
        message: 'hello',
        id: 1,
        attachmentUrl: null,
      },
      {
        message: 'hello',
        id: 2,
        attachmentUrl: null,
      },
      {
        message: 'hello',
        id: 3,
        attachmentUrl: null,
      },
      {
        message: 'desde telegram',
        id: 4,
        attachmentUrl: null,
      },
      {
        message: 'assdasd',
        id: 6,
        attachmentUrl:
          'https://api.telegram.org/file/bot5427947077:AAG8NweEAonOadvSPc5P5UxL4m1fQxxf7Dg/photos/file_7.jpg',
      },
      {
        message: 'asdasd',
        id: 7,
        attachmentUrl: null,
      },
    ],
    findOrCreate: {
      message: 'hello',
      id: 6,
      attachmentUrl: null,
    },
  };
  static service = {
    getMessages: this.repository.find as MessageDto[],
    sendMessage: {
      message: 'hello',
      id: 6,
      attachmentUrl:
        'https://api.telegram.org/file/bot5427947077:AAG8NweEAonOadvSPc5P5UxL4m1fQxxf7Dg/photos/file_7.jpg',
    },

    telegramBotSendMessage: {
      message_id: 51,
      from: {
        id: 5427947077,
        is_bot: true,
        first_name: 'telegramtestbot',
        username: 'huntytest2023bot',
      },
      chat: {
        id: -968420070,
        title: 'huntytelegram2023',
        type: 'group',
        all_members_are_administrators: true,
      },
      date: 1686525118,
      text: 'hello',
    },
    getUrlOfAttachment:
      'https://api.telegram.org/file/bot5427947077:AAG8NweEAonOadvSPc5P5UxL4m1fQxxf7Dg/photos/file_7.jpg',
  };
  static controller = {
    getMessages: new ResponseDto(this.service.getMessages),
    postMessage: new ResponseDto(this.service.sendMessage),
  };
}
