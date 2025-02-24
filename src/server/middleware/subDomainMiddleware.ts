import { NextFunction, Request, Response } from "express";
import { Employer } from "../entity/Employer";
import { Equal } from "typeorm";

interface IRequest {
  path: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
}

const allowedRequests: IRequest[] = [
  { path: '/api/v1/employer', method: 'POST' }
]

export const subDomainMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const host = Array.isArray(req.headers['x-forwarded-host'])
      ? req.headers['x-forwarded-host'][0]
      : req.headers['x-forwarded-host'] || req.headers['host'];

    if (!host || typeof host !== 'string') {
      return next(new Error("Host header is missing or invalid"));
    }

    for (const _req of allowedRequests) {
      if (req.path === _req.path && req.method === _req.method) {
        return next();
      }
    }

    const subdomains = host.replace(/:\d+$/, '').split('.');
    const hasSubdomain = (subdomains[0].toString() != 'localhost') && (subdomains[0].toString() != 'www');

    const employer = await Employer.findOne({ where: { subdomain: Equal(hasSubdomain ? subdomains[0] : 'base') } });

    if (!employer || !employer.candidate) {
      throw Error("Invalid employer");
    }

    res.locals.employer = employer;
    next();
  } catch (error) {
    next(error);
  }
};