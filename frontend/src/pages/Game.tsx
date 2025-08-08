import { useEffect, useState } from "react";
import ChessBoard from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

function Game() {
  const socket = useSocket();

  const [chess, setChess] = useState(new Chess());

  const [board, setBoard] = useState(chess.board());

  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);

      switch (message.type) {
        case INIT_GAME:
          setBoard(new Chess().board());
          setStarted(true);
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Player moved");
          break;
        case GAME_OVER:
          console.log("Game over");
          break;
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#333333] text-white lg:grid lg:grid-cols-2">
      <div>
        <ChessBoard
          chess={chess}
          setBoard={setBoard}
          socket={socket}
          board={board}
        />
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        {!started && (
          <button
            onClick={() => socket.send(JSON.stringify({ type: INIT_GAME }))}
            className="text-lg text-center m-4 bg-[#34C759] hover:cursor-pointer hover:bg-[#FFC107] px-6 py-4 rounded-md font-medium transition-colors duration-200"
          >
            Play
          </button>
        )}
      </div>
    </div>
  );
}

export default Game;
