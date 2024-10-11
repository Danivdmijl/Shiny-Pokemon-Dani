document.querySelectorAll('.kaartjes').forEach((card, index) => {
    const modal = document.getElementById("pokemonModal");
    const closeModal = document.getElementsByClassName("close")[0];
    const pokemonImagesContainer = document.getElementById("pokemonImages");
    const pokemonStats = document.getElementById('pokemonStats'); // Stats container

    // Array of Pokémon names in the order they appear on your page
    const pokemonNames = [
        "giratina", "registeel", "absol", "azelf", "rookidee",
        "zigzagoon-galar", "accelgor", "dottler", "golisopod", "araquanid",
        "karrablast", "dwebble", "orbeetle", "abra", "doduo",
        "buizel", "gallade", "nickit", "drifloon", "lucario"
    ];

    card.addEventListener('click', function () {
        // Clear any previous images in the modal
        pokemonImagesContainer.innerHTML = '';

        // Get the Pokémon name based on the card's index
        const pokemonName = pokemonNames[index];

        // Update the modal title with the selected Pokémon's name
        const modalTitle = document.querySelector('.modal-title');
        modalTitle.innerText = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1); // Capitalize the first letter

        // Special case handling for Giratina (both Altered and Origin, and their shiny versions)
        if (pokemonName === 'giratina') {
            console.log('Giratina card clicked');  // Debugging log to ensure this case is hit
            

            // Populate the modal with 4 images (Normal forms at the top, shiny forms below)
            pokemonImagesContainer.innerHTML = `
                <div class="pokemon-row">
                    <div class="pokemon-image">
                        <h3>Altered Form</h3>
                        <img src="https://play.pokemonshowdown.com/sprites/xyani/giratina.gif" alt="Altered Form">
                    </div>
                    <div class="pokemon-image">
                        <h3>Origin Form</h3>
                        <img src="https://play.pokemonshowdown.com/sprites/xyani/giratina-origin.gif" alt="Origin Form">
                    </div>
                    <div>
                        <h3 class="formStatTitle">Origin form stats:</h3>
                        <p class="pokemon-stats" id="originStats"></p>
                    </div>

                </div>
                <div class="pokemon-row">
                    <div class="pokemon-image">
                        <h3>Shiny Altered Form</h3>
                        <img src="https://play.pokemonshowdown.com/sprites/xyani-shiny/giratina.gif" alt="Shiny Altered Form">
                    </div>
                    <div class="pokemon-image">
                        <h3>Shiny Origin Form</h3>
                        <img src="https://play.pokemonshowdown.com/sprites/xyani-shiny/giratina-origin.gif" alt="Shiny Origin Form">
                    </div>
                    <div>
                        <h3 class="formStatTitle">Altered form stats:</h3>
                            <p class="pokemon-stats" id="alteredStats"></p>
                    </div>
                </div>
            `;



            // Fetch and display stats for Altered Form
            fetch(`https://pokeapi.co/api/v2/pokemon/giratina-altered`)
                .then(response => response.json())
                .then(data => {
                    const height = (data.height / 10).toFixed(1); // Height in meters
                    const weight = (data.weight / 10).toFixed(1); // Weight in kilograms
                    const types = data.types.map(typeInfo => typeInfo.type.name).join(', '); // Types
                    const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', '); // Abilities

                    document.getElementById('alteredStats').innerHTML = `
                        <p><strong>Height:</strong> ${height} m</p>
                        <p><strong>Weight:</strong> ${weight} kg</p>
                        <p><strong>Types:</strong> ${types}</p>
                        <p><strong>Abilities:</strong> ${abilities}</p>
                    `;
                })
                .catch(error => {
                    console.error('Error fetching Giratina Altered stats:', error);
                    document.getElementById('alteredStats').innerHTML = "<p>Stats unavailable</p>";
                });

            // Fetch and display stats for Origin Form
            fetch(`https://pokeapi.co/api/v2/pokemon/giratina-origin`)
                .then(response => response.json())
                .then(data => {
                    const height = (data.height / 10).toFixed(1); // Height in meters
                    const weight = (data.weight / 10).toFixed(1); // Weight in kilograms
                    const types = data.types.map(typeInfo => typeInfo.type.name).join(', '); // Types
                    const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', '); // Abilities

                    document.getElementById('originStats').innerHTML = `
                        <p><strong>Height:</strong> ${height} m</p>
                        <p><strong>Weight:</strong> ${weight} kg</p>
                        <p><strong>Types:</strong> ${types}</p>
                        <p><strong>Abilities:</strong> ${abilities}</p>
                    `;
                })
                .catch(error => {
                    console.error('Error fetching Giratina Origin stats:', error);
                    document.getElementById('originStats').innerHTML = "<p>Stats unavailable</p>";
                });

            // Show the modal (important!)
            modal.style.display = "flex";
        } else {
            // Non-Giratina Pokémon: Show only Normal and Shiny versions
            const normalImageUrl = `https://play.pokemonshowdown.com/sprites/xyani/${pokemonName}.gif`;
            const shinyImageUrl = `https://play.pokemonshowdown.com/sprites/xyani-shiny/${pokemonName}.gif`;

            // Populate the modal with 2 images (Normal and Shiny)
            pokemonImagesContainer.innerHTML = `
                <div class="pokemon-image">
                    <h3>Normal Form</h3>
                    <img src="${normalImageUrl}" alt="Normal Form">
                </div>
                <div class="pokemon-image">
                    <h3>Shiny Form</h3>
                    <img src="${shinyImageUrl}" alt="Shiny Form">
                </div>
            `;

            // Fetch Pokémon stats for the normal version
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                .then(response => response.json())
                .then(data => {
                    const height = (data.height / 10).toFixed(1); // Height in meters
                    const weight = (data.weight / 10).toFixed(1); // Weight in kilograms
                    const types = data.types.map(typeInfo => typeInfo.type.name).join(', '); // Types
                    const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', '); // Abilities

                    pokemonStats.innerHTML = `
                        <p><strong>Height:</strong> ${height} m</p>
                        <p><strong>Weight:</strong> ${weight} kg</p>
                        <p><strong>Types:</strong> ${types}</p>
                        <p><strong>Abilities:</strong> ${abilities}</p>
                    `;
                })
                .catch(error => {
                    console.error('Error fetching Pokémon stats:', error);
                    pokemonStats.innerHTML = "<p>Stats unavailable</p>";
                });

            // Show the modal for non-Giratina Pokémon
            modal.style.display = "flex";
        }

        // Close the modal when the 'X' is clicked
        closeModal.onclick = function () {
            modal.style.display = "none";
        };

        // Close the modal if the user clicks outside the modal content
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    });
});
