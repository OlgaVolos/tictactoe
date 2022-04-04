import React, {useState} from 'react';
import './game.css'
import {calculateWinner} from "../../calculateWinner";
import Board from "../board/Board";


function Game({player1, player2}) {
    const [board, setBoard]=useState(Array(9).fill(null));
    const [isNext, setIsNext] = useState('X');
    const [xIsNext, setXIsNext] = useState(true);
    const [player1Stat, setPlayer1Stat] = useState(0);
    const [player2Stat, setPlayer2Stat] = useState(0);

    const winner = calculateWinner(board);

    const handleClick = (index) => {
        const boardCopy = [...board];

        if (winner || boardCopy[index]) return;

        boardCopy[index] = xIsNext ? 'X': 'O';

        if (xIsNext){
            setIsNext("O");
        } else {
            setIsNext('X')
        }
        setBoard(boardCopy);
        setXIsNext(!xIsNext)
    };

    const reset = () => {
        if(winner){
            if(winner === 'X'){
                setPlayer1Stat(player1Stat +1);
                setIsNext('X');
                setXIsNext(true)
            } else{
                setPlayer2Stat(player2Stat +1);
                setIsNext('O');
                setXIsNext(!xIsNext);
            }
        }
        setBoard(Array(9).fill(null))
    };

    const whoIsNext = () => {
        if(winner) {
            return ("Winner: " + winner);
        } else if (board.every(element => element !== null) && !winner){
            return "Draw!!!";
        } else {
            return "Next player: "+ isNext;
        }
    };

    const score = () => {
        if(player1Stat === 0 && player2Stat ===0){
            return "Start the game";
        } else if(player1Stat>player2Stat){
            return `${player1} is winning!`
        } else if(player2Stat>player1Stat){
            return `${player2} is winning!`
        } else if(player1Stat === player2Stat){
            return `It is DRAW!`
        }
    }



    return (
        <div className={'game'}>
            <Board squares={board} onClick={handleClick}/>
            <div className={'game_info'}>
                <h3>{score()}</h3>
                <div className={'statistics'}>
                    <p>{`${player1}: ${player1Stat}`}</p>
                    <p>{`${player2}: ${player2Stat}`}</p>
                </div>

                <div className={'win'}>
                    <p>{whoIsNext()}</p>
                    <div className={'button'}>
                        <button onClick={reset}>Play again</button>
                        <button onClick={() => window.location.reload()}>
                            Reset game
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Game;
