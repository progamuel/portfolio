import { Request, Response } from 'express';
import { Employer } from '../../entity/Employer';
import { Equal } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const { PASSWORD } = process.env;

export const updateEmployerHandler = async (req: Request, res: Response) => {
  try {
    const {
      subdomain,
      name,
      style,
      candidate,
      botOptions,
      textTitle,
      textIntro,
      textGraph,
      textProjects,
      projectMinWidth,
      skills,
      thesisTexts,
      projects,
      faqTexts,
      password
    } = req.body;

    if (password !== PASSWORD) {
      throw new Error("Invalid password");
    }

    const employer = await Employer.findOne({ where: { subdomain: Equal(subdomain) } });

    if (!employer) {
      throw new Error("Invalid employer");
    }


    employer.name = name;
    employer.style = JSON.stringify(style);
    employer.candidate = JSON.stringify(candidate);
    employer.botOptions = JSON.stringify(botOptions);
    employer.textTitle = textTitle;
    employer.textIntro = textIntro;
    employer.textGraph = textGraph;
    employer.textProjects = textProjects;
    employer.projectMinWidth = projectMinWidth;
    employer.skills = JSON.stringify(skills);
    employer.thesisTexts = JSON.stringify(thesisTexts);
    employer.projects = JSON.stringify(projects);
    employer.faqTexts = JSON.stringify(faqTexts);

    await employer.save();

    res.status(200).json({})
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "An error has occured" })
  }
}