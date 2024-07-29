// REMEMBER TO UNCOMMENT STRICT MODE IN MAIN.JSX

import { Route, Routes } from 'react-router-dom';
import StartGame from './components/StartGame';
import GameSection from './components/GameSection';

function App() {
    return (
        <Routes>
            <Route path='/' element={<StartGame />} />
            <Route path='/gamesection' element={<GameSection />} />
        </Routes>
    );
}

export default App;
