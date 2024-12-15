import { IGraphData } from "./IGraphData";

export interface IEmployerData {
    name: string;
    candidate: {
        name: string;
        socials: {
            title: string;
            link: string;
        }[];
    };
    textTitle: string;
    textIntro: string;
    thesisTexts: {
        title: string;
        text: string[];
    }[];
    faqTexts: {
        question: string;
        answer: string;
    }[];
    graphData: IGraphData[];
}