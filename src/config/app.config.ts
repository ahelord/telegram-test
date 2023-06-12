import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('config', () => {
  return {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.APP_PORT || 3000,
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    telegramChatId: process.env.TELEGRAM_CHAT_ID,
  };
});
