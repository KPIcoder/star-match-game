import React, {FC, useState} from 'react';
import {Game} from "./components";

const App: FC = (): JSX.Element => {
    const [gameId, setGameId] = useState(1);
    return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>;
}

export default App;
