import { useEffect, useState } from "react";
import { PieChartComponent } from "../component/PieChartComponent";
import { ChatComponent } from "../component/ChatComponent";
import { IEmployerData } from "../interfaces/IEmployerData";
import { LoadingComponent } from "../component/LoadingComponent";
import { ErrorComponent } from "../component/ErrorComponent";
import "./HomePage.css";

const HomePage = () => {
  const [employerData, setEmployerData] = useState<IEmployerData>();
  const [isInit, setIsInit] = useState<boolean>(false);

  const fetchData = async (): Promise<IEmployerData> => {
    const response = await fetch('/api/v1/employer');
    const data = await response.json();
    setEmployerData(data);
    return data;
  }

  useEffect(() => {
    fetchData()
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setIsInit(true);
    });
  }, []);

  if (!employerData) {
    return <div style={{ height: "100vh" }}>
      {isInit ? <ErrorComponent /> : <LoadingComponent />};
    </div>
  }

  return (
    <main className="flex-col HomePage">
      <div className="home__header w-full">
        <div className="links flex-row">
          {employerData?.candidate.socials.map((social, idx: number) => <a key={idx} rel="noreferrer" href={social.link} target="_blank">{social.title}</a>)}
        </div>
        <a className="profile__link">
          <img className="profile__img" src={employerData?.candidate.profileUrl} alt="profile" style={{borderColor: isInit ? employerData.style.primaryColor : "white" }}/>
        </a>
      </div>
      <ChatComponent employerData={employerData}/>
      <section className="thesis flex-col">
        <div className="thesis__text">
          <h1>{employerData?.textTitle}</h1>
          <p>{employerData?.textIntro}</p>
        </div>
        <div className="chart flex-col">
            <b>{employerData?.textGraph}</b>
            {<PieChartComponent data={employerData?.graphData} />}
          </div>
        {employerData?.thesisTexts.map((thesis, idx) => {
          return <div key={idx} className="thesis__wrapper flex-col">
            <div className="thesis__text">
              <b>{thesis.title}</b>
              <p>{thesis.text}</p>
            </div>
          </div>
        })}

        {employerData?.projects.length ? (
          <div className="projects">
            <div className="thesis__text">
              <h1>Project Showcase:</h1>
            </div>
            <div className="projects__grid">
            {employerData?.projects.map((project, idx) => (
              <div key={idx} className="project flex-col">
                <div className="project__overlay">
                  <div className="project__text">
                    <b>{project.title}</b>
                    <p>{project.text}</p>
                  </div>
                </div>
                <img className="project__img" src={project.imgUrl} alt="project" />
              </div>
            ))}
            </div>
          </div>
        ) :
          <div className="thesis__text">
            <hr></hr>
          </div>
        }

        <div className="thesis__text">
          <h1>Frequently Asked Questions:</h1>
        </div>
        {employerData?.faqTexts.map((faq, idx) => (
          <p className="thesis__text" key={idx}>
            <b>{faq.question}</b>
            <br></br>
            <span>{faq.answer}</span>
          </p>
        ))}
      </section>
    </main>
  );
}

export {HomePage};