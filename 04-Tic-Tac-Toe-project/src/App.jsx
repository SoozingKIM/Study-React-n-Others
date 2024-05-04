import { useState } from "react"

import Player from "../components/Player"
import GameBoard from "../components/GameBoard"
import Log from "../components/Log";
import GameOver from "../components/GameOver";
import { WINNING_COMBINATIONS } from "../winning-combinations";

const PLAYERS ={
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD=[
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns){
  let curPlayer='X';

  if(gameTurns.length>0 && gameTurns[0].player==='X'){
    curPlayer='O';
  }
  return curPlayer;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(arr=>[...arr])];

  for(const turn of gameTurns){
      const {square, player}=turn;
      const {row, col}=square;

      gameBoard[row][col]=player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players){
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column]
    
    if(
      firstSymbol&&
      firstSymbol===secondSymbol&&
      firstSymbol===thirdSymbol
    ){
      winner=players[firstSymbol];
    }
  }

  return winner;
}

function App() {
  const [players,setPlayers]=useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer=deriveActivePlayer(gameTurns);
  const gameBoard=deriveGameBoard(gameTurns);
  const winner=deriveWinner(gameBoard,players);
  const hasDraw = gameTurns.length===9 && !winner;

  function handleSelectSquare(rowIdx,colIdx){
    setGameTurns((prevTurns)=>{
      const curPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns=[{
        square:{row: rowIdx, col: colIdx},
        player: curPlayer
      },...prevTurns];
      
      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }
  
  function handlePlayerName(symbol,newName){
    setPlayers(prev=>{
      return{
        ...prev,
        [symbol]:newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer==="X"} onChangeName={handlePlayerName}/>
            <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer==="O"} onChangeName={handlePlayerName}/> 
          </ol>
          {(winner||hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
          <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
