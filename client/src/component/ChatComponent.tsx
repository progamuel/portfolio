import Markdown from 'markdown-to-jsx';
import { FormEvent, useEffect, useState } from 'react';
import { IEmployerData } from '../interfaces/IEmployerData';
import { IMessage } from '../interfaces/IMessage';
import './ChatComponent.css';

const ChatComponent = ({ employerData }: { employerData: IEmployerData }) => {
  const [message, setMessage] = useState('');
  const [convo, setConvo] = useState<IMessage[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    animateInput(`So, why is ${employerData?.candidate.name} a good fit for ${employerData?.name}?`);
  }, [employerData?.candidate.name, employerData?.name]);

  const animateInput = (finalText: string, speed = 30) => {
    setIsAnimating(true);
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < finalText.length) {
        setMessage(finalText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalId);
        setIsAnimating(false);
      }
    }, speed);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isButtonDisabled) {
      setIsButtonDisabled(true);
      animateInput('...', 150);
      setConvo([...convo, { role: "You", content: message }]);
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
      console.error(error);
    } finally {
      setIsButtonDisabled(false);
      setMessage("");
    }
  };

  return (
    <section className="ChatComponent flex-col w-full">
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
          onChange={(e) => {
            if (isAnimating) return;
            setMessage(e.target.value);
          }}
          placeholder={`Ask me why I'm a good fit for ${employerData?.name || ''}`}
          disabled={isAnimating}
          required
        />
        <button
          className="chat__btn"
          type="submit"
          disabled={isAnimating || isButtonDisabled}
          style={{
            backgroundColor: (isAnimating || isButtonDisabled) ? "#ccc" : employerData.style.primaryColor,
            color: (isAnimating || isButtonDisabled) ? "white" : employerData.style.onPrimaryColor,
          }}
        >
          Send
        </button>
      </form>
    </section>
  );
};

export { ChatComponent };