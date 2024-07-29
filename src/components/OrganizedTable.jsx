import { useState } from 'react';

const OrganizedTable = ({ data }) => {
    const [revealed, setRevealed] = useState({});

    const revealValue = (section, key) => {
        setRevealed((prevState) => ({
            ...prevState,
            [section]: {
                ...prevState[section],
                [key]: true,
            },
        }));
    };

    const renderTableSection = (sectionData, sectionName) => {
        return (
            <table key={sectionName}>
                <thead>
                    <tr>
                        <th>{sectionName}</th>
                        <th>value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(sectionData).map((key) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>
                                {revealed[sectionName] &&
                                revealed[sectionName][key] ? (
                                    sectionData[key]
                                ) : (
                                    <button
                                        onClick={() =>
                                            revealValue(sectionName, key)
                                        }
                                        className=''
                                    >
                                        Reveal
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
    if (data.characteristics)
        filteredData.characteristics = data.characteristics;
    if (data.taxonomy) filteredData.taxonomy = data.taxonomy;

    return (
        <div>
            {Object.keys(filteredData).map((sectionName) =>
                renderTableSection(filteredData[sectionName], sectionName)
            )}
        </div>
    );
};

export default OrganizedTable;
