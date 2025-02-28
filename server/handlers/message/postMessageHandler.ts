import dotenv from "dotenv";
import OpenAI from "openai";
import { Request, Response } from 'express';
import { IMessage } from '../../interfaces/IMessage';
import { ChatCompletionMessageParam } from "openai/resources";
import { IBotOptions } from "../../interfaces/IBotOptions";

dotenv.config();

const { OPENAI_API_KEY } = process.env;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY! });
const MAX_MESSAGES = 20;

export const postMessageHandler = async (req: Request, res: Response) => {
  try {
    const botOptions = res.locals.employer.botOptions;
    const { message, prevConvo } = req.body;

    if (!message.length) {
      throw Error("Message empty");
    }

    const convo = await _fetchConvo({ message, prevConvo, botOptions: JSON.parse(botOptions) });
    res.status(200).json({ convo });
  } catch (error) {
    console.error(error);
    res.status(400);
  }
}

const _fetchConvo = async ({ message, prevConvo, botOptions }: {
  message: string,
  prevConvo: IMessage[],
  botOptions: IBotOptions,
}): Promise<IMessage[]> => {
  if (prevConvo.length >= MAX_MESSAGES) {
    prevConvo.splice(0, Math.round(MAX_MESSAGES / 4))
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    n: 1,
    messages: <ChatCompletionMessageParam[]>[
      {
        role: "system",
        content: botOptions.completePrePrompt,
      },
      ...prevConvo.map((message) => ({
        role: message.role == "You" ? "user" : "assistant",
        content: message.content
      })),
      {
        role: "user",
        content: message
      }
    ],
  });

  const content = completion.choices[0].message.content;
  const response: IMessage = { role: botOptions.name ?? "Chat-bot", content: content ?? "I'm sorry, something went wrong" };

  return [...prevConvo, { role: "You", content: `${message}` }, response];
}