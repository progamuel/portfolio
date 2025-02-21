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
      const { subdomain, name, style, candidate, botOptions, textTitle, textIntro, thesisTexts, faqTexts } = employerData;

      if (!subdomain || !name || !style || !candidate || !botOptions || !textTitle || !textIntro || !thesisTexts || !faqTexts) {
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
          name: candidate.name,
          socials: candidate.socials,
        }),
        botOptions: JSON.stringify({
          name: botOptions.name,
          completePrePrompt: `${botOptions.prePromptStatic} ${botOptions.prePrompt}`,
        }),
        textTitle,
        textIntro,
        thesisTexts: JSON.stringify(thesisTexts.map((thesis: any, idx: number) => ({ ...thesis, order: idx }))),
        faqTexts: JSON.stringify(faqTexts.map((faq: any, idx: number) => ({ ...faq, order: idx }))),
      });
      await employer.save();
    });
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};