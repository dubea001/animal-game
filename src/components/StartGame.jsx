import { Link } from 'react-router-dom';

const StartGame = ({ onStart }) => {
    return (
        <div>
            <h2>Welcome to the Animal Quiz Game!</h2>
            <p>Here are the rules:</p>
            <ul className='mb-12'>
                <li>
                    Guess the name of the animal based on the provided
                    characteristics and taxonomy.
                </li>
                <li>You start with 20 points for each question.</li>
                <li>Each hint you reveal will reduce the points.</li>
                <li>Answer as many questions as possible within 20 minutes.</li>
                <li>Your total score will be calculated at the end.</li>
            </ul>
            <Link
                to='/gamesection'
                className='border-0 bg-blue-500 px-8 py-2 hover:bg-blue-600'
            >
                Start Game
            </Link>
        </div>
    );
};

export default StartGame;
