import { useEffect, useState } from 'react';
import { fetchData } from '../Utils/fetchApi';
import OrganizedTable from './components/OrganizedTable';

// REMEMBER TO UNCOMMENT STRICT MODE IN MAIN.JSX

function App() {
    const [animalName, setAnimalName] = useState('');
    const [animalsData, setAnimalsData] = useState(null);
    const [options, setOptions] = useState([]);
    const [points, setPoints] = useState(20);
    const [totalScore, setTotalScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [message, setMessage] = useState('');
    const [timeLeft, setTimeLeft] = useState(1200);

    // useEffect(() => {
    //     if (timeLeft > 0) {
    //         const timer = setInterval(() => {
    //             setTimeLeft(timeLeft - 1)
    //         }, 1000)
    //         return () => clearInterval(timer)
    //     }
    // }, [timeLeft])

    const startGame = () => {
        let countDown;
        if (timeLeft > 0) {
            countDown = setInterval(() => {
                setTimeLeft((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(countDown);
    };

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

    return (
        <div>
            <div className=''>
                <button
                    onClick={startGame}
                    className='bg-green-500 px-6 py-2 hover:bg-green-700'
                >
                    Start Game
                </button>
            </div>
            <div className=''>
                <h3 className=''>Timer: {formatTime(timeLeft)}</h3>
                <h3 className=''>Points: {points}</h3>
            </div>
            <div className=''>
                <h2 className=''>Guess Animal Name</h2>
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
            <div className='border border-green-500'>
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
}

export default App;
