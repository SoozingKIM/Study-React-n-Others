export default function GameOver({winner, onRestart}){
    return <div id="game-over">
        <h2>Game</h2>
        {winner && <p>{winner} won!</p>}
        {!winner && <p>It&apos; a draw! </p>}
        <p>
            <button onClick={onRestart}>
                Restart
            </button>
        </p>
    </div>
}