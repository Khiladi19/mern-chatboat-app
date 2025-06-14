import { useState } from "react";
import API from "../api";

export default function DeepSeekBot() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const askBot = async () => {
    const res = await API.post("/chat/deepseek", { userPrompt: input });
    setResponse(res.data.choices?.[0]?.message?.content || "No response");
  };

  return (
    <div className="border p-4 rounded-lg mb-4">
      <h3 className="text-lg font-bold mb-2">🤖 DeepSeek Bot</h3>
      <input
        className="border px-2 py-1 mr-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={askBot} className="bg-green-500 text-white px-4 py-1">
        Ask
      </button>
      {response && <div className="mt-2 p-2 bg-gray-100">{response}</div>}
    </div>
  );
}
