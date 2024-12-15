import fs from "fs/promises";
import path from "path";
import { Employer } from "../entity/Employer";
import { TextThesis } from "../entity/TextThesis";
import { TextFAQ } from "../entity/TextFAQ";
import { Equal } from "typeorm";
import { Candidate } from "../entity/Candidate";

export const seedData = async () => {
    try {
        const filePath = path.resolve(__dirname, "seed.json");
        const fileContent = await fs.readFile(filePath, "utf8");
        const data = JSON.parse(fileContent);

        data.forEach(async (employerData: any) => {
            const { subdomain, name, candidate, botOptions, textTitle, textIntro, thesisTexts, FAQTexts } = employerData;

            if (!subdomain || !name || !candidate || !botOptions || !textTitle || !textIntro || !thesisTexts || !FAQTexts) {
                throw new Error("Invalid data format");
            };

            const existingEmployee = await Employer.findOne({ where: { subdomain: Equal(subdomain) } });

            if (existingEmployee) {
                await existingEmployee.remove()
            }

            const employer = Employer.create({
                subdomain,
                name,
                candidate: Candidate.create({
                    name: candidate.name,
                    socials: JSON.stringify(candidate.socials),
                }),
                botOptions: JSON.stringify({
                    name: botOptions.name,
                    completePrePrompt: `${botOptions.prePromptStatic} ${botOptions.prePrompt}`,
                }),
                textTitle,
                textIntro,
                thesisTexts: thesisTexts.map((thesis: any, idx: number) =>
                    TextThesis.create({
                        order: idx,
                        title: thesis.title,
                        texts: JSON.stringify(thesis.texts),
                    })
                ),
                faqTexts: FAQTexts.map((faq: any, idx: number) =>
                    TextFAQ.create({
                        order: idx,
                        question: faq.question,
                        answer: faq.answer,
                    })
                ),
            });
            await employer.save();
        });
    } catch (error) {
        console.error("Error seeding data:", error);
    }
};