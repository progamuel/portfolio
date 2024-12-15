import { NextFunction, Request, Response } from "express";
import { Employer } from "../entity/Employer";
import { Equal } from "typeorm";
import path from "path";

export const subDomainMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const host = Array.isArray(req.headers['x-forwarded-host'])
            ? req.headers['x-forwarded-host'][0]
            : req.headers['x-forwarded-host'] || req.headers['host'];

        if (!host || typeof host !== 'string') {
            return next(new Error("Host header is missing or invalid"));
        }

        const subdomains = host.replace(/:\d+$/, '').split('.');

        if (subdomains.length === 0 || !subdomains[0]) {
            return next(new Error("Invalid origin format or missing subdomain"));
        }

        const employer = await Employer.findOne({
            where: { subdomain: Equal(subdomains[0]) },
            relations: ['candidate', 'thesisTexts', 'faqTexts']
        });

        if (!employer || !employer.candidate) {
            throw Error("Invalid employer");
        }

        res.locals.employer = employer;
        next();
    } catch (error) {
        next(error);
    }
};