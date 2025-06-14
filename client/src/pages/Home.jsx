import { useUser } from "@clerk/clerk-react";

const Home = () => {
  const { user } = useUser();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome {user?.fullName}</h1>
      <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
    </div>
  );
};

export default Home;
