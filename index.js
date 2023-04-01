const url = 'http://localhost:3000';


// Get movie details on page load
const movieDetails = document.getElementById('movie-details');
fetch(`${url}/films`)
  .then(response => response.json())
  .then(data => {
    // Display details for all movies
    for (const movie of data) {
      const availableTickets = movie.capacity - movie.tickets_sold;
      const movieDetailsSection = document.createElement('div');
      movieDetailsSection.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title} poster">
        <h2>${movie.title}</h2>
        <p>Runtime: ${movie.runtime} minutes</p>
        <p>Showtime: ${movie.showtime}</p>
        <p id="available-tickets">Available Tickets: ${availableTickets}</p>
        <button id="buy-ticket" data-available-tickets="${availableTickets}">Buy Ticket (${availableTickets} left)</button>
  <button id="delete-movie">Delete Movie</button>
`;
const deleteButton = movieDetailsSection.querySelector('#delete-movie');
deleteButton.addEventListener('click', () => {
    deleteButton.addEventListener('click', () => {
        fetch(`${url}/films/${movie.id}`, { method: 'DELETE' })
          .then(() => {
            movieDetailsSection.remove();
            
          })
          
      });
      
});

      if (availableTickets === 0) {
        const soldOutMessage = document.createElement('p');
        soldOutMessage.textContent = 'Sold Out';
        movieDetailsSection.appendChild(soldOutMessage);
        movieDetailsSection.querySelector('#buy-ticket').remove();
      }
      movieDetails.appendChild(movieDetailsSection);
    }
  });


//  Buy a ticket
movieDetails.addEventListener('click', event => {
  if (event.target.id === 'buy-ticket') {
    const availableTickets = parseInt(event.target.dataset.availableTickets);
    if (availableTickets > 0) {
      const newAvailableTickets = availableTickets - 1;
      event.target.dataset.availableTickets = newAvailableTickets;
      event.target.textContent = `Buy Ticket (${newAvailableTickets} left)`;
      const movieDetailsAvailableTickets = movieDetails.querySelector('#available-tickets');
      movieDetailsAvailableTickets.textContent = `Available Tickets: ${newAvailableTickets}`;
      if (newAvailableTickets === 0) {
        const soldOutMessage = document.createElement('p');
        soldOutMessage.textContent = 'Sold Out';
        movieDetails.appendChild(soldOutMessage);
        event.target.remove();
        const filmsListItems = filmsList.children;
        for (const item of filmsListItems) {
          if (item.textContent === movieDetails.querySelector('h2').textContent) {
            item.classList.add('sold-out');
          }
        }
      }
    }
  }
});
