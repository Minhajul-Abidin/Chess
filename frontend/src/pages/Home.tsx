import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col items-center justify-center h-screen bg-[#333333] text-white lg:grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center">
        <img
          src="/chessboard.png"
          alt="Chess Board"
          className="w-64 mb-4 lg:w-2xl lg:p-7"
        />
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-center m-4">
          Play Chess Online on the number #2 Site!
        </h1>
        <button
          onClick={() => navigate("/game")}
          className="text-lg text-center m-4 bg-[#34C759] hover:cursor-pointer hover:bg-[#FFC107] px-6 py-4 rounded-md font-medium transition-colors duration-200"
        >
          Play Online
        </button>
      </div>
    </div>
  );
}

export default Home;
