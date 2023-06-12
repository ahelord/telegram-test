import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from '../services/chat.service';
import { ChatStub } from '../stubs/chat.stub';
import { when } from 'jest-when';

/* Mocks */
type ChatServiceMock = Partial<Record<keyof ChatService, jest.Mock>>;

const chatServiceMock = (): ChatServiceMock => ({
  getMessages: jest.fn(),
  sendMessage: jest.fn(),
});

describe('ChatController', () => {
  let controller: ChatController;
  let chatServiceMocked: ChatServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [
        {
          provide: ChatService,
          useValue: chatServiceMock(),
        },
      ],
    }).compile();

    controller = module.get<ChatController>(ChatController);
    chatServiceMocked = module.get(ChatService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('get messages', () => {
    it('', async () => {
      when(chatServiceMocked.getMessages).mockReturnValue(ChatStub.service.getMessages);
      const response = await controller.getMessages();
      expect(response).toEqual(ChatStub.controller.getMessages);
    });
  });

  describe('post message', () => {
    it('', async () => {
      when(chatServiceMocked.sendMessage).mockReturnValue(ChatStub.service.sendMessage);
      const response = await controller.postMessage(ChatStub.params.messageBodyDto);
      expect(response).toEqual(ChatStub.controller.postMessage);
    });
  });
});
