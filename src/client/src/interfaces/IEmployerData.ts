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
  thesisTexts: {
    title: string;
    texts: string[];
  }[];
  faqTexts: {
    question: string;
    answer: string;
  }[];
  graphData: IGraphData[];
}