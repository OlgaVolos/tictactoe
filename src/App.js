import './App.css';
import Game from "./components/game/Game";
import {useState} from "react";

function App() {
    const [gameVisible, setGameVisible] = useState(false);
    const [namePlayer1, setNamePlayer1] = useState('');
    const [namePlayer2, setNamePlayer2] = useState('');

    const handleSubmit = () => {
        setGameVisible(true);
    }
    const handleChange = (e) => {
        const eventValue = e.target.value;
        const name = e.target.name;

        if(!isNaN(eventValue)){
            throw new Error(`${name} field cannot be a number`);
        }
        if(!eventValue){
            throw new Error(`${name} field cannot be empty`);
        }
        if(name === 'player1'){
            setNamePlayer1(eventValue)
        } else {
            setNamePlayer2(eventValue)
        }
    }

  return (
    <div className={'main'}>
        {!gameVisible && (
            <form className={'form'} onSubmit={handleSubmit}>
                <label htmlFor="player1">Player 1: </label>
                <input type="text" id='player1' name={'player1'} value={namePlayer1} onChange={handleChange} required />
                <br/>
                <label htmlFor="player2">Player 2: </label>
                <input type="text" id='player2' name={'player2'} value={namePlayer2} onChange={handleChange} required />
                <br/>
                <button type={'submit'}>Start game</button>
            </form>
        )}
        {gameVisible && <Game player1={namePlayer1} player2={namePlayer2}/> }


    </div>
  );
}

export default App;
