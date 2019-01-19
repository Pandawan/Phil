import Botkit from 'botkit';
import Express from 'express';
import { messageReceived } from './MediBot';

// Check that env variables were setup
if (process.env.access_token && process.env.verify_token && process.env.PORT) {
  // Create facebook bot controller (for events)
  const controller = Botkit.facebookbot({
    access_token: process.env.access_token,
    verify_token: process.env.verify_token,
  });

  // Create facebook bot (for replies)
  const bot = controller.spawn();

  // Create a basic webserver (Express)
  controller.setupWebserver(
    process.env.PORT,
    (err: Error, webserver: Express.Application) => {
      if (err) {
        console.error(err);
      }

      // Setup webhook endpoints for Facebook to connect to bot
      controller.createWebhookEndpoints(webserver, bot, () => {
        console.log('StoryBot is online.');
      });
    }
  );

  // Called when a message is received
  controller.on('message_received', (bot, message) => {
    messageReceived(bot, message);
  });
} else {
  console.error('Required environment variables not found.');
}
