import Botkit from 'botkit';

interface FBMessage extends Botkit.FacebookMessage {
  nlp: any;
}

export function messageReceived(
  bot: Botkit.FacebookBot,
  msg: Botkit.FacebookMessage
) {
  const message = msg as FBMessage;

  const entity = getFirstEntity(message.nlp, 'greetings');

  if (entity) {
    bot.reply(message, 'Hello World!');
    return;
  }
  bot.reply(message, `I'm sorry, I do not understand.`);
}

function getFirstEntity(nlp: any, name: string) {
  return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
}
