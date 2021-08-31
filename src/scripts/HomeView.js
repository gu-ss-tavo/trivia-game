/**
 * @author Gusstavo
 * @description Create home view
 * 
 * @param { HTMLElement } context 
 * @param { function } setGameView 
 * @returns { object }
 */
const HomeView = (context, setGameView) => {
    /**
     * @description Constant names and values
     */
    const difficulties = ['easy', 'medium', 'hard'];
    const categories = {
        mythology: 20,
        sports: 21,
        geography: 22,
        history: 23,
        celebrities: 26,
        animals: 27
    };
    const game_modes = ['random', 'short time', 'survive'];

    /**
     * @description The 'final' variables are the basis of the structure of the game.
     */
    let final_difficulty = 'medium';
    //
    let final_categories = {}
    for(let category in categories) {
        final_categories[categories[category]] = false;
    }
    //
    let final_game_mode = 'random';

    /**
     * @description Utility group for radio type
     */
    const toggle_difficulties = [];
    const toggle_game_modes = [];

    /**
     * @description Action when submitting form
     * @param { event } e 
     */
    const handleSendForm = e => {
        e.preventDefault();
        form.onsubmit = e => {e.preventDefault()};
        // console.log(final_difficulty, final_categories, final_game_mode);
        setGameView([final_difficulty, final_categories, final_game_mode]);
    }

    /**
     * @description Action to select a sub-element 'difficulty'
     * @param { event } e 
     */
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

    /**
     * @description Action to select a sub-element 'categories'
     * @param { event } e 
     */
    const handleEntryCategory = e => {
        let value = e.target.getAttribute('value');
        final_categories[value] = e.target.classList.toggle('active');
    }

    /**
     * @description Action to select a sub-element 'game mode'
     * @param { event } e
     */
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

    /**
     * @description Creates radio elements, such as { difficulty, game mode }
     * @param {string} name 
     * @param {string} value 
     * @returns {HTMLElement}
     */
    const createRadioInput = (name, value) => {
        let container = document.createElement('div');
        container.classList.add('row', 'cen-x');

        let entry = document.createElement('div');
        entry.setAttribute('value', value);

        if(name === 'difficulty') {
            if(value === 'easy') entry.classList.add('icon-f_easy');
            else if(value === 'medium') entry.classList.add('icon-f_normal');
            else if(value === 'hard') entry.classList.add('icon-f_hard');

            toggle_difficulties.push(entry);
            entry.onclick = handleEntryDifficulty;
            if(value === final_difficulty) entry.click();

            container.appendChild(entry);
        }else if(name === 'game_mode') {
            entry.innerText = value;
            toggle_game_modes.push(entry);
            entry.onclick = handleEntryGameMode;
            if(value === final_game_mode) entry.click();

            container.appendChild(entry);
        }
        
        return container;
    }

    /**
     * @description Creates checkbox items, such as { categories }
     * @param { string } category 
     * @returns { HTMLElement }
     */
    const createCheckboxEntry = (name, value) =>{
        let container = document.createElement('div');
        container.classList.add('row', 'cen-x');

        let entry = document.createElement('div');
        entry.setAttribute('value', categories[value]);

        if(name === 'category') {
            entry.classList.add(`icon-f_${value}`);
            entry.onclick = handleEntryCategory;

            container.appendChild(entry);
        }
        return container;
    }

    /**
     * @description Creates and designs the form
     */
    let form = document.createElement('form');
    form.classList.add('form-container', 'col-11', 'column', 'cen-x');
    form.onsubmit = handleSendForm;

    /**
     * @description Create and design item sections
     */
    let difficulties_section = document.createElement('div');
    let categories_section = document.createElement('div');
    let game_mode_section = document.createElement('div');
    difficulties_section.classList.add('difficulty-section', 'col-11', 'row', 'space-around');
    categories_section.classList.add('category-section', 'col-12', 'row', 'cen-x');
    game_mode_section.classList.add('game-mode-section', 'col-11', 'row', 'space-around');

    /**
     * @description Create, design and add 'difficulty' elements
     */
    difficulties.forEach(difficulty => {
        let element = createRadioInput('difficulty', difficulty);
        element.classList.add('input-container', 'col-3');
        difficulties_section.appendChild(element);
    });

    /**
     * @description Create, design and add 'categories' elements
     */
    for(let category in categories) {
        let element = createCheckboxEntry('category', category);
        element.classList.add('col-4');
        categories_section.appendChild(element);
    }

    /**
     * @description Create, design and add 'game mode' elements
     */
    game_modes.forEach(game_mode => {
        let element = createRadioInput('game_mode', game_mode);
        element.classList.add('game-mode', 'col-3');
        game_mode_section.appendChild(element);
    });

    /**
     * @description adding sections
     */
    form.appendChild(difficulties_section);
    form.appendChild(categories_section);
    form.appendChild(game_mode_section);

    /**
     * @description Create, design and add 'submit' elements
     */
    let send_form = document.createElement('input');
    send_form.setAttribute('type', 'submit');
    send_form.setAttribute('value', 'Jugar');
    send_form.classList.add('col-12');
    form.appendChild(send_form);


    const game_title = document.createElement('h1');
    game_title.innerText = 'Trivia Game';

    /**
     * @description Render views
     */
    context.appendChild(game_title);
    context.appendChild(form);
}

export { HomeView };