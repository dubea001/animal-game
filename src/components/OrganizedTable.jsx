import { useState } from 'react';

const OrganizedTable = ({ data, points, setPoints }) => {
    const [revealed, setRevealed] = useState({});

    const revealValue = (section, key) => {
        if (
            (section === 'characteristics' && points >= 2) ||
            (section === 'taxonomy' && points >= 4)
        ) {
            setRevealed((prevState) => ({
                ...prevState,
                [section]: {
                    ...prevState[section],
                    [key]: true,
                },
            }));

            if (section === 'characteristics') {
                setPoints(points - 2);
            } else if (section === 'taxonomy') {
                setPoints(points - 4);
            }
        }
    };

    const renderTableSection = (sectionData, sectionName) => {
        return (
            <table
                key={sectionName}
                className='border border-gray-700 w-full my-8 font-mono'
            >
                <thead className='text-white bg-gray-700'>
                    <tr className='border-b border-black'>
                        <th className='text-start py-2 w-[40%] pl-2'>
                            {sectionName}
                        </th>
                        <th className='text-start border-l border-black pl-2 py-2'>
                            Property
                        </th>
                    </tr>
                </thead>
                <tbody className=''>
                    {Object.keys(sectionData).map((key) => (
                        <tr key={key} className=' border border-gray-700'>
                            <td className='pl-2'>{key}</td>
                            <td className='border-l border-gray-700 pl-2 py-2 '>
                                {revealed[sectionName] &&
                                revealed[sectionName][key] ? (
                                    sectionData[key]
                                ) : (
                                    <button
                                        onClick={() =>
                                            revealValue(sectionName, key)
                                        }
                                        className='bg-gray-200 px-4 hover:bg-gray-400 transition-all duration-200'
                                    >
                                        Reveal property
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const filteredData = {};
    if (data.taxonomy) filteredData.taxonomy = data.taxonomy;
    if (data.characteristics)
        filteredData.characteristics = data.characteristics;

    return (
        <div className='px-4'>
            <div className='text-center'>
                <div className='font-bold text-xl mb-2'>Use Hints</div>
                <p className='text-sm'>
                    Each question starts with 20 points. Using hints will reduce
                    the available points. taxonomy reduce 4 points while
                    characteristics reduce 2 points
                </p>
            </div>
            {Object.keys(filteredData).map((sectionName) =>
                renderTableSection(filteredData[sectionName], sectionName)
            )}
        </div>
    );
};

export default OrganizedTable;
