import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {
    this.bot.start((ctx) => this.start(ctx));
    this.bot.command('ref', (ctx) => this.generateRefLink(ctx));
    this.bot.action('getreflink', (ctx) => this.generateRefLink(ctx));
  }

  async start(ctx: Context) {
    console.log(ctx.from);
    const startParam = ctx.message;
    console.log(startParam);
    this.showToolbarButton(ctx);
  }

  async launchApp(ctx: Context) {
    const webAppUrl = 'https://coinmarketcap.com/';

    ctx.reply('Launch mini app', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Launch App',
              web_app: { url: webAppUrl },
            },
          ],
        ],
      },
    });
  }

  private async generateRefLink(ctx: Context) {
    const telegramId = ctx.from.id;
    const refLink = `https://t.me/BatGunner_Bot/app?startapp=${telegramId}`;

    ctx.reply(`Your referral link: ${refLink}`, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Share Referral Link',
              url: refLink,
            },
          ],
        ],
      },
    });
  }

  private async fetchTitleFromLink(link: string): Promise<string> {
    return link;
  }

  private async showToolbarButton(ctx: Context) {
    const telegramId = ctx.from.id;
    const appLink = `https://t.me/BatGunner_Bot/app?startapp=${telegramId}`;

    ctx.reply('Main toolbar button:', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Launch App',
              url: 'https://coinmarketcap.com/', // Thay thế bằng URL của mini app của bạn
            },
          ],
          [
            {
              text: 'Launch App with Referral',
              url: appLink,
            },
          ],
          [
            {
              text: 'Get Referral Link',
              callback_data: 'getreflink', // Đăng ký hành động callback khi người dùng nhấn vào nút này
            },
          ],
        ],
      },
    });
  }
}
