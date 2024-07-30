import { Link } from 'react-router-dom';

const StartGame = () => {
    return (
        <div className='font-mono py-8 md:w-1/2 mx-auto flex flex-col items-center justify-center mb-8'>
            <h2 className='font-bold text-2xl md:text-4xl '>
                Welcome to the Animal Quiz Game!
            </h2>
            <p className=' text-xl my-4 font-semibold'>How the game works:</p>
            <ul className='mb-8 px-4 list-disc list-inside'>
                <li className='my-4'>
                    When you click "Start Game", you will be taken to the game
                    page.
                </li>
                <li className='my-4'>
                    On the game page, you can enter any animal name in the input
                    box and click "Search".
                </li>
                <li className='my-4'>
                    The game will fetch various types of the searched animal and
                    randomly select one.
                </li>
                <li className='my-4'>
                    The characteristics and taxonomy of the selected animal will
                    be displayed.
                </li>
                <li className='my-4'>
                    You can then guess the name of the animal or use hints to
                    reveal more characteristics or taxonomy details.
                </li>
                <li className='my-4'>
                    If you don't have a specific animal in mind, you can type
                    any random letter or multiple letters, and a random animal
                    will be selected for you to guess. <br />
                    <span className='font-semibold'>
                        For example, typing "a" or "xyz" will return a random
                        animal
                    </span>
                </li>
                <li className='my-4'>
                    Each question starts with 20 points. Using hints will reduce
                    the available points.
                </li>
                <li className='my-4'>
                    If you guess the animal correctly, you will be awarded
                    points based on the number of hints used. If you guess
                    incorrectly, you get 0 points for that question.
                </li>
                <li className='my-4'>
                    Answer as many questions as possible within the 20-minute
                    time limit.
                </li>
                <li className='my-4'>
                    Your total score will be calculated and displayed at the end
                    of the game.
                </li>
            </ul>
            <p className=' text-xl my-4 font-semibold'>Game Rules:</p>
            <ul className='mb-8 px-4 list-disc list-inside'>
                <li className='my-4'>
                    Enter an animal name in the input box and click "Search" to
                    start each question.
                </li>
                <li className='my-4'>
                    The game will display characteristics and taxonomy of a
                    randomly selected type of the searched animal.
                </li>
                <li className='my-4'>
                    You start with 20 points for each question.
                </li>
                <li className='my-4'>
                    Each hint you reveal will reduce the points for that
                    question.
                </li>
                <li className='my-4'>
                    If you guess the correct animal name, you will earn points
                    based on the number of hints used. Fewer hints mean more
                    points.
                </li>
                <li className='my-4'>
                    If you guess incorrectly, you will receive 0 points for that
                    question.
                </li>
                <li className='my-4'>
                    Answer as many questions as you can within the 20-minute
                    time limit.
                </li>
                <li className='my-4'>
                    Your total score will be calculated and displayed when the
                    time runs out or when you finish all questions.
                </li>
                <li className='my-4 font-semibold'>
                    Have fun and learn about different animals!
                </li>
            </ul>
            <Link
                to='/gamesection'
                className='bg-gray-700 hover:shadow-[-3px_3px_0px_#374151] text-white hover:text-gray-700 hover:bg-transparent hover:border hover:border-t hover:border-gray-700 px-8 py-2 transition-all duration-200'
            >
                Start Game
            </Link>
        </div>
    );
};

export default StartGame;
