const ChuckNorrisJokeSource = async () => {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    if (!response.ok)
    {
        throw new Error(`HTTP error Norris! status: ${res.status}`);
    }
    const data = await response.json();
    return data.value;
};

export default ChuckNorrisJokeSource;