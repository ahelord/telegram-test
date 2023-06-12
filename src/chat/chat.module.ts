import { Module } from '@nestjs/common';
import { ChatController } from './controllers/chat.controller';
import { ChatService } from './services/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessageRepository } from './repositories/chat-message.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessageRepository])],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
