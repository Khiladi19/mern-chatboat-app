import ChatBox from "../components/ChatBox";
import DeepSeekBot from "../components/DeepSeekBot";

export default function AdminDashboard() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <DeepSeekBot />
      <ChatBox isAdmin={true} />
    </div>
  );
}

