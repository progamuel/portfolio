import fs from "fs/promises";
import path from "path";
import { Employer } from "../entity/Employer";
import { Equal } from "typeorm";

export const seedData = async () => {
  try {
    const filePath = path.resolve(__dirname, "seed.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);

    data.forEach(async (employerData: any) => {
      const { subdomain, name, style, candidate, botOptions, textTitle, textIntro, textGraph, textProjects, projectMinWidth, skills, thesisTexts, projects, faqTexts } = employerData;

      if (!subdomain || !name || !style || !candidate || !botOptions || !textTitle || !textIntro || !textGraph || !textProjects || !skills || !thesisTexts || !projects || !faqTexts) {
        throw new Error("Invalid data format");
      };

      const existingEmployer = await Employer.findOne({ where: { subdomain: Equal(subdomain) } });

      if (existingEmployer) {
        await existingEmployer.remove();
      }

      const employer = Employer.create({
        subdomain,
        name,
        style: JSON.stringify({
          primaryColor: style.primaryColor,
          onPrimaryColor: style.onPrimaryColor,
        }),
        candidate: JSON.stringify({
          profileUrl: candidate.profileUrl,
          name: candidate.name,
          socials: candidate.socials,
        }),
        botOptions: JSON.stringify({
          name: botOptions.name,
          completePrePrompt: `${botOptions.prePromptStatic} ${botOptions.prePrompt}`,
        }),
        textTitle,
        textIntro,
        textGraph,
        textProjects,
        projectMinWidth,
        skills: JSON.stringify(skills),
        thesisTexts: JSON.stringify(thesisTexts.map((thesis: any, idx: number) => ({ ...thesis, order: idx }))),
        projects: JSON.stringify(projects.map((project: any, idx: number) => ({ ...project, order: idx }))),
        faqTexts: JSON.stringify(faqTexts.map((faq: any, idx: number) => ({ ...faq, order: idx }))),
      });
      await employer.save();
    });
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};