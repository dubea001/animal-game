import { useEffect, useState } from 'react';
import { fetchData } from '../../Utils/fetchApi';
import OrganizedTable from './OrganizedTable';

const GameSection = () => {
    const [animalName, setAnimalName] = useState('');
    const [animalsData, setAnimalsData] = useState(null);
    const [options, setOptions] = useState([]);
    const [points, setPoints] = useState(20);
    const [totalScore, setTotalScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [message, setMessage] = useState('');
    const [timeLeft, setTimeLeft] = useState(1200);
    const [gameStarted, setGameStarted] = useState(true);

    useEffect(() => {
        if (gameStarted && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }

        if (timeLeft === 0) {
            setGameStarted(false);
        }
    }, [gameStarted, timeLeft]);

    const getAnimalsData = async () => {
        try {
            const result = await fetchData(animalName);
            if (result && result.length > 0) {
                const selectedAnimal = result[generateRandomNumber(result)];
                console.log(selectedAnimal);
                setAnimalsData(selectedAnimal);
                const incorrectOptions = fetchIncorrectOptions(result);
                const optionsToSelect = [
                    selectedAnimal.name,
                    ...incorrectOptions,
                ];
                setOptions(shuffleOptions(optionsToSelect));
                setPoints(20);
                setSelectedOption(null);
                setMessage('');
            }
        } catch (error) {
            console.error('failed to fetch data. please try again', error);
        }
    };

    const generateRandomNumber = (value) => {
        return Math.floor(Math.random() * value.length);
    };

    const fetchIncorrectOptions = (value) => {
        const incorrectOptions = [];
        for (let index = 0; index < 3; index++) {
            const randomIndex = Math.floor(Math.random() * value.length);
            incorrectOptions.push(value[randomIndex].name);
            value.splice(randomIndex, 1);
        }
        return incorrectOptions;
    };

    const shuffleOptions = (value) => {
        const arrayShuffle = [...value];
        for (let index = arrayShuffle.length - 1; index > 0; index--) {
            const j = Math.floor(Math.random() * (index + 1));
            [arrayShuffle[index], arrayShuffle[j]] = [
                arrayShuffle[j],
                arrayShuffle[index],
            ];
        }
        return arrayShuffle;
    };

    const addAlphabetToOptions = (value) => {
        const alphabet = ['A.', 'B.', 'C.', 'D.'];
        return alphabet[value];
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${
            remainingSeconds < 10 ? '0' : ''
        } ${remainingSeconds}`;
    };

    const handleAnswer = (option) => {
        if (option === animalsData.name) {
            setTotalScore(totalScore + points);
            setMessage('Correct');
        } else {
            setMessage(`Incorrect the correct answer is ${animalsData.name}`);
        }
        setSelectedOption(option);
    };

    const handleRestart = () => {
        setTotalScore(0);
        setTimeLeft(1200);
        setGameStarted(true);
        setAnimalName('');
        setAnimalsData(null);
        setOptions([]);
        setPoints(20);
        setSelectedOption(null);
        setMessage('');
    };

    const handleQuit = () => {
        // IMPLEMENT QUIT GAME LOGIC
    };

    if (timeLeft === 0) {
        return (
            <div className=''>
                <h2 className=''>Game Over</h2>
                <p className=''>Your total score is: {totalScore}</p>
                <button onClick={handleRestart}>Restart Game</button>
                <button onClick={handleQuit}>Quit</button>
            </div>
        );
    }

    return (
        <div>
            <div className=''>
                <h3 className=''>Timer: {formatTime(timeLeft)}</h3>
                <h3 className=''>Score: {points}</h3>
            </div>
            <div className=''>
                <input
                    type='text'
                    className='px-6 py-2 border border-black mr-8'
                    autoFocus
                    placeholder='Enter animal name'
                    onChange={(e) => setAnimalName(e.target.value)}
                />
                <button
                    className='bg-blue-500 px-6 py-2 hover:bg-blue-700'
                    onClick={getAnimalsData}
                >
                    search
                </button>
            </div>

            <div className=''>Total Score: {totalScore}</div>

            {animalsData && (
                <OrganizedTable
                    data={animalsData}
                    points={points}
                    setPoints={setPoints}
                />
            )}
            <div className=''>
                {options.map((option, index) => (
                    <p
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className={`${
                            selectedOption === option
                                ? 'bg-gray-200'
                                : 'hover:bg-gray-100'
                        }`}
                    >
                        {addAlphabetToOptions(index)} {option}
                    </p>
                ))}
            </div>

            {message && <div>{message}</div>}
        </div>
    );
};

export default GameSection;
