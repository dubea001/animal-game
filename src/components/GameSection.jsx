import { useEffect, useState } from 'react';
import { fetchData } from '../../Utils/fetchApi';
import OrganizedTable from './OrganizedTable';
import ClipLoader from 'react-spinners/ClipLoader';

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
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
            setLoading(true);
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
                setAnimalName('');
                setIsInputDisabled(true);
            }
        } catch (error) {
            setError('Request failed. please try again', error);
        } finally {
            setLoading(false);
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

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
        // return `${minutes}:${
        //     remainingSeconds < 10 ? '0' : ''
        // } ${remainingSeconds}`;
    };

    const handleAnswer = (option) => {
        if (option === animalsData.name) {
            setTotalScore(totalScore + points);
            setMessage('Correct');
        } else {
            setMessage(`Incorrect the correct answer is ${animalsData.name}`);
        }
        setSelectedOption(option);
        setIsInputDisabled(true);
        setShowNextButton(true);
        setCorrectAnswer(animalsData.name);
    };

    const handleNext = () => {
        setAnimalName('');
        setAnimalsData(null);
        setOptions([]);
        setPoints(20);
        setSelectedOption(null);
        setMessage('');
        setIsInputDisabled(false);
        setShowNextButton(false);
        setCorrectAnswer(null);
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
        setIsInputDisabled(false);
        setShowNextButton(false);
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

    if (error) {
        return <div className=''>{error}</div>;
    }

    return (
        <div className='border border-gray-700 md:w-1/2 mx-auto font-mono'>
            <div className='flex text-white justify-between items-center mx-auto px-4 py-6 bg-gray-700'>
                <h3 className=' py-2 text-lg'>
                    Time Remaining: {formatTime(timeLeft)}
                </h3>

                <h3 className='py-2 text-lg'>Total Score: {totalScore}</h3>
            </div>
            <div className='my-6 flex justify-between px-4'>
                <input
                    type='text'
                    className='px-6 py-2 border border-gray-700 w-[70%] md:w-[80%] outline-0 focus:border focus:border-gray-700'
                    autoFocus
                    placeholder='Enter animal name'
                    value={animalName}
                    onChange={(e) => setAnimalName(e.target.value)}
                    disabled={isInputDisabled}
                />
                <button
                    className='bg-gray-700 hover:shadow-[-3px_3px_0px_#374151] text-white hover:text-gray-700 hover:bg-transparent hover:border hover:border-t hover:border-gray-700 px-6 py-2 transition-all duration-200'
                    onClick={getAnimalsData}
                    disabled={isInputDisabled}
                >
                    search
                </button>
            </div>
            <div className='flex items-center justify-center'>
                {loading && <ClipLoader color='#374151' />}
            </div>
            <div className='my-4 flex flex-col md:flex-row md:flex-wrap md:gap-x-8 md:items-center md:justify-center px-4'>
                {options.map((option, index) => (
                    <p
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className={`cursor-pointer my-4 py-2 md:w-full border pl-4 border-gray-700 ${
                            selectedOption === option &&
                            option === animalsData.name
                                ? 'bg-green-300'
                                : selectedOption === option
                                ? 'bg-gray-200'
                                : selectedOption !== null &&
                                  option === animalsData.name
                                ? 'bg-green-300'
                                : 'hover:bg-gray-100'
                        }`}
                        style={{
                            pointerEvents:
                                selectedOption !== null ? 'none' : 'auto',
                        }}
                    >
                        {addAlphabetToOptions(index)} {option}
                    </p>
                ))}
            </div>
            {/* {message && <div className='text-center text-lg'>{message}</div>} */}

            <div className='flex items-center justify-center my-8'>
                {showNextButton && (
                    <button
                        onClick={handleNext}
                        className='bg-gray-700 hover:shadow-[-3px_3px_0px_#374151] text-white hover:text-gray-700 hover:bg-transparent hover:border hover:border-t hover:border-gray-700 px-8 py-2 transition-all duration-200'
                    >
                        Continue
                    </button>
                )}
            </div>

            {animalsData && (
                <OrganizedTable
                    data={animalsData}
                    points={points}
                    setPoints={setPoints}
                />
            )}
        </div>
    );
};

export default GameSection;
