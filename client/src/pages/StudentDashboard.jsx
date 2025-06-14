import ChatBox from "../components/ChatBox";
import DeepSeekBot from "../components/DeepSeekBot";

export default function StudentDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
      <DeepSeekBot />
      <ChatBox isAdmin={false} />
    </div>
  );
}




