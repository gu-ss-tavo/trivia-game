const HomeView = (context, startGame) => {
    const difficulties = ['ease', 'medium', 'hard'];
    const categories = {
        mythology: 20,
        sports: 21,
        geography: 22,
        history: 23,
        celebrities: 26,
        animals: 27
    };
    const game_modes = ['random', 'short time', 'survive'];

    // final data
    let final_difficulty = 'medium';

    let final_categories = {}
    for(let category in categories) {
        final_categories[categories[category]] = false;
    }

    let final_game_mode = 'random';

    // utils
    const toggle_difficulties = [];
    const toggle_game_modes = [];

    // events
    const handleSendForm = e => {
        e.preventDefault();
        console.log(final_difficulty, final_categories, final_game_mode);
        startGame();
    }
    const handleEntryDifficulty = e => {
        final_difficulty = e.target.getAttribute('value');
        
        for(let i = 0; i < toggle_difficulties.length; i++) {
            if(final_difficulty === difficulties[i]) {
                toggle_difficulties[i].classList.add('active');
            }else {
                toggle_difficulties[i].classList.remove('active');
            }
        }
    }
    const handleEntryCategory = e => {
        let value = e.target.getAttribute('value');
        final_categories[value] = e.target.classList.toggle('active');
    }
    const handleEntryGameMode = e => {
        final_game_mode = e.target.getAttribute('value');

        for(let i = 0; i < toggle_game_modes.length; i++) {
            if(final_game_mode === game_modes[i]) {
                toggle_game_modes[i].classList.add('active');
            }else {
                toggle_game_modes[i].classList.remove('active');
            }
        }
    }

    // create elements
    const createRadioInput = (name, value) => {
        let entry = document.createElement('div');
        entry.setAttribute('value', value);
        entry.innerText = value;    

        if(name === 'difficulty') {
            toggle_difficulties.push(entry);
            entry.onclick = handleEntryDifficulty;
            if(value === final_difficulty) entry.click();
        }else if(name === 'game_mode') {
            toggle_game_modes.push(entry);
            entry.onclick = handleEntryGameMode;
            if(value === final_game_mode) entry.click();
        }
        
        return entry;
    }

    const createCategoryCheckbox = category =>{
        let entry = document.createElement('div');
        entry.setAttribute('value', categories[category]);
        entry.innerText = category;
        entry.onclick = handleEntryCategory;
        return entry;
    }

    // structure
    let form = document.createElement('form');
    form.onsubmit = handleSendForm;

    difficulties.forEach(difficulty => {
        let element = createRadioInput('difficulty', difficulty);
        form.appendChild(element);
    });

    for(let category in categories) {
        let element = createCategoryCheckbox(category);
        form.appendChild(element);
    }

    game_modes.forEach(game_mode => {
        let element = createRadioInput('game_mode', game_mode);
        form.appendChild(element);
    });

    let send_form = document.createElement('input');
    send_form.setAttribute('type', 'submit');

    form.appendChild(send_form);

    context.appendChild(form);

    return {
        element: form,
    };
}

export { HomeView };