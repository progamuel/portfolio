import { Request, Response } from 'express';
import { Employer } from '../../entity/Employer';
import { Equal } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const { PASSWORD } = process.env;

export const createEmployerHandler = async (req: Request, res: Response) => {
  try {
    const { subdomain, password } = req.body;

    if (password !== PASSWORD) {
      throw new Error("Invalid password");
    }

    const employers = await Employer.find({
      where: [
        { subdomain: Equal(subdomain) },
        { subdomain: Equal('xyz') }
      ]
    });

    const existingEmployer = employers.find(emp => emp.subdomain === subdomain) || null;
    const templateEmployer = employers.find(emp => emp.subdomain === 'xyz') || null;

    if (existingEmployer) {
      throw new Error("Employer already exists")
    }

    if (!templateEmployer) {
      throw new Error("Template employer not found")
    }

    const { id, createdAt, ...templateData } = templateEmployer;

    const employer = Employer.create({
      ...templateData,
      subdomain,
    });

    await employer.save();

    res.status(200).json({ message: "Employer created successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "An error has occured" })
  }
}