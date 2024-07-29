import { useState } from 'react';
import { fetchData } from '../Utils/fetchApi';
import OrganizedTable from './components/OrganizedTable';

// REMEMBER TO UNCOMMENT STRICT MODE IN MAIN.JSX

function App() {
    const [animalName, setAnimalName] = useState('');
    const [animalsData, setAnimalsData] = useState(null);
    const [options, setOptions] = useState([]);

    const getAnimalsData = async () => {
        try {
            const result = await fetchData(animalName);
            if (result && result.length > 0) {
                const selectedAnimal = result[generateRandomNumber(result)];
                setAnimalsData(selectedAnimal);
                const incorrectOptions = fetchIncorrectOptions(result);
                const optionsToSelect = [
                    selectedAnimal.name,
                    ...incorrectOptions,
                ];
                setOptions(optionsToSelect);
            }
        } catch (error) {
            console.error('failed', error);
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
    const shuffleAnswers = shuffleOptions(options);

    const addAlphabetToOptions = (value) => {
        const alphabet = ['A.', 'B.', 'C.', 'D.'];
        return alphabet[value];
    };

    return (
        <div>
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
                    start game
                </button>
            </div>
            {animalsData && <OrganizedTable data={animalsData} />}
            <div className='border border-green-500'>
                {shuffleAnswers.map((option, index) => (
                    <p className='' key={index}>
                        {addAlphabetToOptions(index)} {option}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default App;
