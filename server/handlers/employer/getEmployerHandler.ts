import { Request, Response } from 'express';

export const getEmployerHandler = async (_req: Request, res: Response) => {
  try {
    const { subdomain, name, style, candidate, botOptions, textTitle, textIntro, textGraph, textProjects, projectMinWidth, skills, thesisTexts, projects, faqTexts } = res.locals.employer;
    const { primaryColor, onPrimaryColor } = style;

    res.status(200).json({
      subdomain,
      name,
      style: {
        primaryColor,
        onPrimaryColor
      },
      candidate: candidate ?? [],
      botOptions: botOptions ?? [],
      textTitle,
      textIntro,
      textGraph,
      textProjects,
      projectMinWidth,
      skills: skills ?? {
        languages: [],
        frameworks: [],
        databases: [],
        tools: [],
        platforms: [],
        other: [],
      },
      thesisTexts: thesisTexts?.sort((a: any, b: any) => a.order - b.order) ?? [],
      faqTexts: faqTexts?.sort((a: any, b: any) => a.order - b.order) ?? [],
      projects: projects?.sort((a: any, b: any) => a.order - b.order) ?? [],
      graphData: [
        { id: 'Yes', value: 25, color: '#eee' },
        { id: 'Yes!', value: 75, color: primaryColor },
      ],
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "An error has occured" })
  }
}