import { Request, Response } from 'express';

export const getDataHandler = async (_req: Request, res: Response) => {
  try {
    const { subdomain, name, style, candidate, botOptions, textTitle, textIntro, thesisTexts, faqTexts } = res.locals.employer;
    const { primaryColor, onPrimaryColor } = JSON.parse(style);

    res.status(200).json({
      subdomain,
      name,
      primaryColor,
      onPrimaryColor,
      candidate: JSON.parse(candidate),
      botOptions: JSON.parse(botOptions),
      textTitle,
      textIntro,
      thesisTexts: JSON.parse(thesisTexts).sort((a: any, b: any) => a.order - b.order),
      faqTexts: JSON.parse(faqTexts).sort((a: any, b: any) => a.order - b.order),
      graphData: [
        { id: 'Yes', value: 25, color: '#eee' },
        { id: 'Yes!', value: 75, color: primaryColor },
      ]
    });
  } catch (error) {
    console.error(error);
    res.status(400);
  }
}