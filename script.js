const apiKey = 'gj1s2wGhcjHJtLBzNx2arX233glOtV0paVxTdr5J'; 

function fetchMultipleApods(numberOfImages) {
    const apodElement = document.getElementById('apod');

    apodElement.innerHTML = '';

    for (let i = 0; i < numberOfImages; i++) {
        const randomDate = getRandomDate();
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${randomDate}`)
            .then(response => response.json())
            .then(data => {
                const title = data.title;
                const explanation = data.explanation;
                const imageUrl = data.url;

                const newImageDiv = document.createElement('div');
                newImageDiv.classList.add('apod-item');

                newImageDiv.innerHTML = `
                    <h2>${title}</h2>
                    <p>${explanation}</p>
                    <img src="${imageUrl}" alt="${title}" />
                `;

                apodElement.appendChild(newImageDiv);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}

function getRandomDate() {
    const start = new Date(1995, 5, 16); 
    const end = new Date();  
    const randomDate = new Date(start.getTime() + Math.random() * (end - start));
    
    const year = randomDate.getFullYear();
    const month = (randomDate.getMonth() + 1).toString().padStart(2, '0');
    const day = randomDate.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

document.getElementById('fetchNewImageBtn').addEventListener('click', () => fetchMultipleApods(1));
