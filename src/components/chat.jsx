import { useState,} from "react";

export function GPTChat() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
  
    const sendMessage = async () => {
      if (!input.trim()) return;
      const newMessages = [...messages, { text: input, sender: "user" }];
      setMessages(newMessages);
      setInput("");
  
      // Simulación de respuesta del GPT
      setTimeout(() => {
        setMessages([...newMessages, { text: "Respuesta de GPT", sender: "gpt" }]);
      }, 1000);
    };
  
    return (
      <div className="chat-container">
        <h2 className="chat-title">Chat con GPT</h2>
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === "user" ? "chat-message user" : "chat-message gpt"}>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe un mensaje..." className="chat-input" />
          <button onClick={sendMessage} className="send-button">Enviar</button>
        </div>
      </div>
    );
  }
  