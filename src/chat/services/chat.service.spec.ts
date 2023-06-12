import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { ConfigService } from '@nestjs/config';
import { ChatMessageRepository } from '../repositories/chat-message.repository';
import { when } from 'jest-when';
import { ChatStub } from '../stubs/chat.stub';
type ChatMessageRepositoryMock = Partial<Record<keyof ChatMessageRepository, jest.Mock>>;
const chatMessageRepositoryMock = (): ChatMessageRepositoryMock => ({
  findOrCreate: jest.fn(),
  find: jest.fn(),
});
describe('ChatService', () => {
  let service: ChatService;
  let chatRepositoryMocked: ChatMessageRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        ConfigService,
        {
          provide: ChatMessageRepository,
          useValue: chatMessageRepositoryMock(),
        },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
    chatRepositoryMocked = module.get(ChatMessageRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Find all messages', async () => {
    when(chatRepositoryMocked.find).calledWith().mockReturnValue(ChatStub.repository.find);
    const response = await service.getMessages();
    expect(response).toEqual(ChatStub.service.getMessages);
  });
});
