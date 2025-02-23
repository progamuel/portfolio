import { useEffect, useState } from "react";
import { IEmployerData } from "../interfaces/IEmployerData";
import { ErrorComponent } from "../component/ErrorComponent";
import { LoadingComponent } from "../component/LoadingComponent";
import './EditPage.css';

const EditPage = () => {
  const [employerData, setEmployerData] = useState<IEmployerData>();
  const [isInit, setIsInit] = useState<boolean>(false);

  const fetchData = async (): Promise<IEmployerData> => {
    const response = await fetch('/api/v1/employer');
    const data = await response.json();
    setEmployerData(data);
    return data;
  };

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
    return (
      <div style={{ height: "100vh" }}>
        {isInit ? <ErrorComponent /> : <LoadingComponent />}
      </div>
    );
  }
  
  const updateAtPath = (
    obj: any,
    path: (string | number)[],
    value: any
  ): any => {
    if (path.length === 0) return value;
    const key = path[0];
    if (Array.isArray(obj)) {
      const newArr = [...obj];
      if (typeof key === 'number') {
        newArr[key] = updateAtPath(obj[key], path.slice(1), value);
      }
      return newArr;
    }
    return { ...obj, [key]: updateAtPath(obj[key], path.slice(1), value) };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    path: (string | number)[],
    transform?: (val: string) => any
  ) => {
    const newValue = transform ? transform(e.target.value) : e.target.value;
    setEmployerData(prev => updateAtPath(prev, path, newValue));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = document.getElementById("edit-form") as HTMLFormElement;
    const password = form.password.value;
    form.reset();
    try {
      const response = await fetch('/api/v1/employer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...employerData, password }),
      });
      alert(response.ok ? "Employer updated successfully!" : "Failed to update employer.");
    } catch (error) {
      console.error(error);
      alert("Error submitting data.");
    }
  };

  return (
    <main className="flex-col EditPage">
      <form id="edit-form" onSubmit={handleSubmit} className="flex-col">
        <div className="form__header">
          <h2>Editing {employerData.subdomain}</h2>
          <div className="form__header__inner">
            <input type="password" name="password" placeholder="Password" required/>
            <button type="submit">Update</button>
          </div>
        </div>

        <div className="form__section">
          <h5>Employer</h5>
          <div className="form__section__inner">
            <label>Subdomain:</label>
            <textarea
              value={employerData.subdomain}
              onChange={(e) => handleChange(e, ['subdomain'])}
            />
          </div>
          <div className="form__section__inner">
            <label>Name:</label>
            <textarea
              value={employerData.name}
              onChange={(e) => handleChange(e, ['name'])}
            />
          </div>
        </div>

        <div className="form__section">
          <h5>Style</h5>
          <div className="form__section__inner">
            <label>Primary Color:</label>
            <textarea
              value={employerData.style.primaryColor}
              onChange={(e) => handleChange(e, ['style', 'primaryColor'])}
            />
          </div>
          <div className="form__section__inner">
            <label>On Primary Color:</label>
            <textarea
              value={employerData.style.onPrimaryColor}
              onChange={(e) => handleChange(e, ['style', 'onPrimaryColor'])}
            />
          </div>
        </div>

        <div className="form__section">
          <h5>Candidate</h5>
          <div className="form__section__inner">
            <label>Candidate Name:</label>
            <textarea
              value={employerData.candidate.name}
              onChange={(e) => handleChange(e, ['candidate', 'name'])}
            />
          </div>
          {employerData.candidate.socials.map((social, index) => (
            <div key={index} className="form__section__inner">
              <div className="form__section__header">
                <label>Social Title:</label>
                <button type="button" className="delete-btn" onClick={() => {
                  const newSocials = employerData.candidate.socials.filter((_, idx) => idx !== index);
                  setEmployerData({
                    ...employerData,
                    candidate: { ...employerData.candidate, socials: newSocials },
                  });
                }}>Remove</button>
              </div>
              <textarea
                value={social.title}
                onChange={(e) => handleChange(e, ['candidate', 'socials', index, 'title'])}
              />
              <label>Social Link:</label>
              <textarea
                value={social.link}
                onChange={(e) => handleChange(e, ['candidate', 'socials', index, 'link'])}
              />
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => {
            const newSocial = { title: "", link: "" };
            setEmployerData({
              ...employerData,
              candidate: { ...employerData.candidate, socials: [...employerData.candidate.socials, newSocial] },
            });
          }}>Add New</button>
        </div>

        <div className="form__section">
          <h5>Bot Options</h5>
          <div className="form__section__inner">
            <label>Bot Name:</label>
            <textarea
              value={employerData.botOptions.name}
              onChange={(e) => handleChange(e, ['botOptions', 'name'])}
            />
            <label>Complete Pre-Prompt:</label>
            <textarea
              name="completePrePrompt"
              value={employerData.botOptions.completePrePrompt}
              onChange={(e) => handleChange(e, ['botOptions', 'completePrePrompt'])}
            />
          </div>
        </div>

        <div className="form__section">
          <h5>Text Content</h5>
          <div className="form__section__inner">
            <label>Text Title:</label>
            <textarea
              value={employerData.textTitle}
              onChange={(e) => handleChange(e, ['textTitle'])}
            />
            <label>Text Intro:</label>
            <textarea
              value={employerData.textIntro}
              onChange={(e) => handleChange(e, ['textIntro'])}
            />
          </div>
        </div>

        <div className="form__section">
          <h5>Thesis Texts</h5>
          {employerData.thesisTexts.map((thesis, index) => (
            <div key={index} className="form__section__inner">
              <div className="form__section__header">
                <label>Thesis Title:</label>
                <button type="button" className="delete-btn" onClick={() => {
                  const newThesis = employerData.thesisTexts.filter((_, idx) => idx !== index);
                  setEmployerData({ ...employerData, thesisTexts: newThesis });
                }}>Remove</button>
              </div>
              <textarea
                value={thesis.title}
                onChange={(e) => handleChange(e, ['thesisTexts', index, 'title'])}
              />
              <label>Thesis Texts (each on a new line):</label>
              <textarea
                value={thesis.texts.join("\n\n# ")}
                onChange={(e) => handleChange(
                  e,
                  ['thesisTexts', index, 'texts'],
                  (val) =>
                    val.split("\n\n# ").map(line => line.trim()).filter(line => line)
                )}
              />
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => {
            const newThesis = { title: "", texts: [] };
            setEmployerData({
              ...employerData,
              thesisTexts: [...employerData.thesisTexts, newThesis],
            });
          }}>Add New</button>
        </div>

        <div className="form__section">
          <h5>FAQ Texts</h5>
          {employerData.faqTexts.map((faq, index) => (
            <div key={index} className="form__section__inner">
              <div className="form__section__header">
                <label>Question:</label>
                <button type="button" className="delete-btn" onClick={() => {
                  const newFaq = employerData.faqTexts.filter((_, idx) => idx !== index);
                  setEmployerData({ ...employerData, faqTexts: newFaq });
                }}>Remove</button>
              </div>
              <textarea
                value={faq.question}
                onChange={(e) => handleChange(e, ['faqTexts', index, 'question'])}
              />
              <label>Answer:</label>
              <textarea
                value={faq.answer}
                onChange={(e) => handleChange(e, ['faqTexts', index, 'answer'])}
              />
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => {
            const newFaq = { order: employerData.faqTexts.length, question: "", answer: "" };
            setEmployerData({
              ...employerData,
              faqTexts: [...employerData.faqTexts, newFaq],
            });
          }}>Add New</button>
        </div>
      </form>
    </main>
  );
};

export {EditPage};