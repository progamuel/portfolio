import Markdown from "markdown-to-jsx";
import { FormEvent, useEffect, useState } from "react";
import { PieChartComponent } from "./component/PieChartComponent";
import { IEmployerData } from "./interfaces/IEmployerData";
import { LoadingComponent } from "./component/LoadingComponent";
import { ErrorComponent } from "./component/ErrorComponent";
import { IMessage } from "./interfaces/IMessage";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [convo, setConvo] = useState<IMessage[]>([]);
  const [isInit, setIsInit] = useState<boolean>(false);
  const [employerData, setEmployerData] = useState<IEmployerData>();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isButtonDisabled) {
      setIsButtonDisabled(true);
      setMessage("Sending...");
    }

    try {
      const response = await fetch(`/api/v1/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, prevConvo: convo }),
      });

      const data = await response.json();

      if (data.convo.length) {
        setConvo(data.convo);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsButtonDisabled(false);
      setMessage("");
    }
  };

  const fetchData = async () => {
    const response = await fetch('/api/v1/data');
    const data = await response.json();
    setEmployerData(data);
    setMessage(`So, why is ${data?.candidate.name} a good fit for ${data.name}?`);
  }

  useEffect(() => {
    fetchData().catch((error) => {
      console.error(error);
    }).finally(() => {
      setIsInit(true);
    });
  }, []);

  if (!employerData) {
    return <div style={{ height: "100vh" }}>
      {isInit ? <ErrorComponent /> : <LoadingComponent />};
    </div>
  }

  return (
    <div className="App">
      <main className="flex-col">
        <div className="links flex-row">
          {employerData?.candidate.socials.map((social, idx: number) => <a key={idx} rel="noreferrer" href={social.link} target="_blank">{social.title}</a>)}
        </div>
        <img className="profile" src="profile.jpg" alt="profile" />
        <section className="chat flex-col">
          <div className="chat__convo flex-col">
            {convo.map((message, idx) => (
              <p key={idx}>
                <b>{message.role}:</b>{" "}
                <span className="chat__convo__content"><Markdown>{(message.content)}</Markdown></span>
              </p>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex-row">
            <input
              className="chat__input"
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Ask me why I'm a good fit for ${employerData.name}`}
              required
            />
            <button className="chat__btn" type="submit" disabled={isButtonDisabled}>Send</button>
          </form>
        </section>
        <section className="thesis flex-col">
          <div className="thesis__text">
            <h1>{employerData?.textTitle}</h1>
            <p>
              {employerData?.textIntro}
            </p>
            <hr></hr>
          </div>
          {employerData?.thesisTexts.map((thesis, idx) => {
            return <div key={idx} className="thesis__wrapper flex-col">
              {idx === 1 && (
                <div key={idx} className="chart flex-col">
                  <b>Should {employerData?.candidate.name} work at {employerData.name}?</b>
                  {<PieChartComponent data={employerData?.graphData} />}
                </div>
              )}
              <div className="thesis__text">
                <b>{thesis.title}</b>
                <ul>
                  {thesis.text.map((text, textIdx) => (
                    <li key={textIdx}>{text}</li>
                  ))}
                </ul>
              </div>
            </div>
          })}
          <div className="thesis__text">
            <hr></hr>
            <h1>Frequently Asked Questions:</h1>
          </div>
          {employerData?.faqTexts.map((faq, idx) => (
            <p className="thesis__text" key={idx}>
              <b>{faq.question}</b>
              <br></br>
              <span>{faq.answer}</span>
            </p>
          ))}
        </section >
      </main >
    </div >
  );
}

export default App;