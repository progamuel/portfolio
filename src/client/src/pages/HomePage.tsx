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

        <div className="skills">
          <div className="skills__grid">
            <div className="skills__outer__container">
              <b>Languages:</b>
              <div className="skills__inner__container">
                {employerData?.skills.languages.map((language, idx) => {
                  return <span className="skill"
                    style={{
                      backgroundColor: employerData.style.primaryColor,
                      color: employerData.style.onPrimaryColor
                    }}
                    key={idx}>{language}</span>;
                })}
              </div>
            </div>
            <div className="skills__outer__container">
              <b>Frameworks:</b>
              <div className="skills__inner__container">
                {employerData?.skills.frameworks.map((framework, idx) => {
                  return <span className="skill"
                    style={{
                      backgroundColor: employerData.style.primaryColor,
                      color: employerData.style.onPrimaryColor
                    }}
                    key={idx}>{framework}</span>;
                })}
              </div>
            </div>
            <div className="skills__outer__container">
              <b>Tools:</b>
              <div className="skills__inner__container">
                {employerData?.skills.tools.map((tool, idx) => {
                  return <span className="skill"
                    style={{
                      backgroundColor: employerData.style.primaryColor,
                      color: employerData.style.onPrimaryColor
                    }}
                    key={idx}>{tool}</span>;
                })}
              </div>
            </div>
            <div className="skills__outer__container">
              <b>Databases:</b>
              <div className="skills__inner__container">
                {employerData?.skills.databases.map((database, idx) => {
                  return <span className="skill"
                    style={{
                      backgroundColor: employerData.style.primaryColor,
                      color: employerData.style.onPrimaryColor
                    }}
                    key={idx}>{database}</span>;
                })}
              </div>
            </div>
            <div className="skills__outer__container">
              <b>Platforms:</b>
              <div className="skills__inner__container">
                {employerData?.skills.platforms.map((platform, idx) => {
                  return <span className="skill"
                    style={{
                      backgroundColor: employerData.style.primaryColor,
                      color: employerData.style.onPrimaryColor
                    }}
                    key={idx}>{platform}</span>;
                })}
              </div>
            </div>
            <div className="skills__outer__container">
              <b>Other:</b>
              <div className="skills__inner__container">
                {employerData?.skills.other.map((other, idx) =>{
                  return <span className="skill"
                    style={{
                      backgroundColor: employerData.style.primaryColor,
                      color: employerData.style.onPrimaryColor
                    }}
                    key={idx}>{other}</span>;
                })}
              </div>
            </div>
          </div>
        </div>
        
        {employerData?.projects.length ? (
          <div className="projects">
            {employerData?.textProjects?.length > 0 ? <b>{employerData?.textProjects}</b> : null}
            <div className="projects__grid" style={{gridTemplateColumns: `repeat(auto-fill, minmax(${employerData?.projectMinWidth}, 1fr))`}}>
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
        ) : null}

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