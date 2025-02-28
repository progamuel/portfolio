import { Request, Response } from 'express';
import { Employer } from '../../entity/Employer';
import { Equal } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const { PASSWORD } = process.env;

export const deleteEmployerHandler = async (req: Request, res: Response) => {
  try {
    const { subdomain, password } = req.body;

    if (password !== PASSWORD) {
      throw new Error("Invalid password");
    }

    const employer = await Employer.findOne({ where: { subdomain: Equal(subdomain) } });

    if (!employer) {
      throw new Error("Employer not found")
    }

    await employer.remove();

    res.status(200).json({ message: "Employer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "An error has occured" })
  }
}