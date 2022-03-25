import React, {useEffect, useState} from 'react';
import Square from "./Square";

const defaultSquare = () => (new Array(9).fill(null))

const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

function Board(props) {
    const [squares, setSquares] = useState(defaultSquare());
    const [winner, setWinner] = useState(null);

    const linesFull = (a, b, c) => {
        return lines.filter(squareIndexes => {
            const squareValues = squareIndexes.map(index => squares[index]);
            return JSON.stringify([a, b, c].sort()) === JSON.stringify(squareValues.sort())
        })
    }

    const computerTurn = () => {
        const isComputerTurn = squares.filter(square => square !== null).length % 2 === 1;
        const emptyIndexes = squares
            .map((square, index) => square === null ? index : null)
            .filter(value => value !== null);
        const putComputerAt = index => {
            let newSquares = squares;
            newSquares[index] = 'o';
            setSquares([...newSquares])
        }
        if (isComputerTurn) {
            const winingLines = linesFull('o', 'o', null)
            if (winingLines.length > 0) {
                const winPosition = winingLines[0].filter(index => squares[index] === null)[0];
                putComputerAt(winPosition);
                return;
            }
            const blockLines = linesFull('x', 'x', null);
            if (blockLines.length > 0) {
                const blockPosition = blockLines[0].filter(index => squares[index] === null)[0];
                putComputerAt(blockPosition)
                return;
            }

            const linesToContinue = linesFull('o', null, null);
            if (linesToContinue.length > 0) {
                const continuePosition = linesToContinue[0].filter(index => squares[index] === null)[0];
                putComputerAt(continuePosition);
                return;
            }
            const randomIndex = emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
            putComputerAt(randomIndex)

        }
    }

    const checkWinner = () => {
        const playerWon = linesFull('x', 'x', 'x').length > 0;
        const computerWon = linesFull('o', 'o', 'o').length > 0;

        if (playerWon) {
            setWinner('x');

        } else if (computerWon) {
            setWinner('o');

        }
    }


    // const checkIfTie = () => {
    //     let filled = 0;
    //     squares.forEach((square) => {
    //         if (square !== null) {
    //             filled++;
    //         }
    //     });
    //     return filled === 9
    // }

    useEffect(() => {
        computerTurn();
        checkWinner();

    }, [squares]);


    function handleSquareClick(index) {
        const isPlayerTurn = squares.filter(square => square !== null).length % 2 === 0;
        if (isPlayerTurn) {
            let newSquares = squares;
            newSquares[index] = 'x';
            setSquares([...newSquares])
        }
    }

    function restartGame() {
        setSquares(defaultSquare());
        setWinner(null);
    }

    return (
        <div>
            <div className={'board'} {...props} >
                {squares.map((square, index) =>
                    <Square key={index}
                            x={square === 'x' ? 1 : 0}
                            o={square === 'o' ? 1 : 0}
                            onClick={() => handleSquareClick(index)}/>)}
            </div>
            <div className={'winner'}>
                <button onClick={restartGame}>Restart</button>
            </div>
            {!!winner && winner === 'x' && (
                <div className={'winner green'}>
                    You are winner!
                </div>
            )}
            {!!winner && winner === 'o' && (
                <div className={'winner red'}>
                    You are loser!
                </div>
            )}


        </div>
    );
}

export default Board;
