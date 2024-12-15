import { Request, Response } from 'express';

export const getDataHandler = async (_req: Request, res: Response) => {
    try {
        const { name, candidate, textTitle, textIntro, thesisTexts, faqTexts } = res.locals.employer;

        res.status(200).json({
            name,
            candidate: {
                name: candidate.name,
                socials: JSON.parse(candidate.socials),
            },
            textTitle,
            textIntro,
            thesisTexts: thesisTexts
                .sort((a: any, b: any) => a.order - b.order)
                .map((thesis: any) => ({
                    title: thesis.title,
                    text: JSON.parse(thesis.texts),
                })),
            faqTexts: faqTexts
                .sort((a: any, b: any) => a.order - b.order)
                .map((faq: any) => ({
                    question: faq.question,
                    answer: faq.answer,
                })),
            graphData: [
                { id: 'Yes', value: 25 },
                { id: 'Yes!', value: 70 },
            ]
        });
    } catch (error) {
        console.error(error);
        res.status(400);
    }
}