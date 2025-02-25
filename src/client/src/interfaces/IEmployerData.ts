import { IGraphData } from "./IGraphData";

export interface IEmployerData {
  subdomain: string;
  name: string;
  style: {
    primaryColor: string;
    onPrimaryColor: string;
  };
  candidate: {
    name: string;
    profileUrl: string;
    socials: {
      title: string;
      link: string;
    }[];
  };
  botOptions: {
    name: string;
    completePrePrompt: string
  };
  textTitle: string;
  textIntro: string;
  textGraph: string;
  skills: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    tools: string[];
    platforms: string[];
    other: string[];
  };
  thesisTexts: {
    title: string;
    text: string;
  }[];
  projects: {
    title: string;
    text: string;
    imgUrl: string;
  }[];
  faqTexts: {
    question: string;
    answer: string;
  }[];
  graphData: IGraphData[];
}