import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import API from "../api";

export default function ChatBox({ isAdmin }) {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [text, setText] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!isAdmin) return;

    // TODO: Replace with dynamic student selection in future
    API.post("/auth/sync-user", { clerkId: "hardcoded-student-id" })
      .then((res) => {
        setReceiverId(res.data.clerkId);
      })
      .catch((err) => console.error("Failed to get student:", err));
  }, []);

  useEffect(() => {
    if (!user?.id || !receiverId) return;

    const fetchChat = async () => {
      const res = await API.get(`/chat/messages/${user.id}/${receiverId}`);
      setMessages(res.data);
    };

    fetchChat();
  }, [user?.id, receiverId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    await API.post("/chat/send", {
      senderId: user.id,
      receiverId,
      message: text,
    });

    setMessages((prev) => [
      ...prev,
      { senderId: user.id, receiverId, message: text },
    ]);
    setText("");
  };

  return (
    <div className="border p-4 rounded-lg mt-4 max-w-xl mx-auto">
      <h3 className="text-lg font-bold mb-2">💬 Chat</h3>
      <div className="h-40 overflow-y-scroll border mb-2 p-2 bg-gray-100 rounded">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-1">
            <strong>{msg.senderId === user.id ? "You" : "Other"}:</strong>{" "}
            {msg.message}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="flex">
        <input
          className="border px-2 py-1 flex-1 mr-2 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
