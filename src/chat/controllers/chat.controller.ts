import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { MessagePostBodyDto } from '../dtos/message-post-body.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { MessageDto } from '../dtos/message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  async postMessage(@Body() messagePostBodyDto: MessagePostBodyDto): Promise<ResponseDto<MessageDto>> {
    return new ResponseDto(await this.chatService.sendMessage(messagePostBodyDto.message));
  }

  @Get('message')
  async getMessages(): Promise<ResponseDto<MessageDto[]>> {
    return new ResponseDto(await this.chatService.getMessages());
  }
}
