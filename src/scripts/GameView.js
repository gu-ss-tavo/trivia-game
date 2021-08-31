import QuestionElement from "./QuestionElement.js";

/**
 * @description Video game control;
 * @param {HTMLElement} context 
 * @param {[]} data 
 */
const GameView = (context, ui, data) => {
    const API = 'https://opentdb.com/api.php?';
    const QUESTIONS_LENGTH = 15;
    const game_modes = ['random', 'short time', 'survive'];
    
    /**
     * @description Load game
     * @param {[]} data 
     */
    const LoadGame = data => {
        fetchApi(createApiPaths()).then(questions => {
            createGame(createQuestionLevel(questions));
        });
    }
    
    /**
     * @description Create readable api paths
     * @param {[]} data 
     * @returns []
     */
    const createApiPaths = () => {
        const [difficulty, categories] = data;
        let categories_res = [];
        
        for(let category in categories) {
            if(categories[category]) categories_res.push(category);
        }
        if(categories_res.length === 0) {
            for(let category in categories) {
                categories_res.push(category);
            }
        }
        
        return categories_res.map(category_res => `${API}amount=${QUESTIONS_LENGTH}&category=${category_res}&difficulty=${difficulty}`);
    }

    /**
     * @description Uploads and retrieves the petition's data
     * @param {[]} paths 
     * @returns []
     */
    const fetchApi = async paths => {
        let questions_by_category= [];
        try {
            for(let path of paths) {
                const response = await fetch(path);
                const resolve = await response.json();
                const result = await resolve;
                questions_by_category.push(result.results);
            }
        }catch(err) {
            console.error(err);
        }finally {
            return questions_by_category;
        }
    }

    /**
     * @description Create the level to start the game
     * @param {[]} questions 
     * @returns []
     */
    const createQuestionLevel = questions => {
        let questions_res = [];

        for (let i = 0; i < QUESTIONS_LENGTH; i++) {
            const category = Math.floor(Math.random() * questions.length);
            questions_res.push(questions[category][i]);
        }
        return questions_res;
    }

    /**
     * @description Create game with defined questions
     * @param {[]} questions 
     */
    const createGame = questions => {
        let game_mode = data[2];
        let index = 0;
        let errors = 0;
        let value = 0;

        const value_container = createUI();
        if(game_mode === game_modes[0]) {
            game_mode = game_modes[Math.ceil(Math.random() * 2)];
        }
        if(game_mode === game_modes[1]) {
            value = 30;
            value_container.innerText = value;
            let interval = setInterval(() => {
                value--;
                value_container.innerText = value;
                if(value <= 0) {
                    gameOver();
                    clearInterval(interval);
                }
            }, 1000);
        }else if(game_mode === game_modes[2]) {
            value = 5;
            value_container.innerText = value;
        }
        
        
        const correctAnswer = () => {
            index++;
            if(game_mode === game_modes[1]) {
                value += 4;
            }else if(game_mode === game_modes[2]) {
                //
            }
        }
        const incorrectAnswer = () => {
            errors++;
            if(game_mode === game_modes[1]) {
                value -= value > 3 ? 3 : 0;
            }else if(game_mode === game_modes[2]) {
                value -= 1;
                value_container.innerText = value;
                if(value <= 0) gameOver();
            }
        }

        const gameOver = () => {
            console.log('errors:', errors);
            console.log('preguntas:', index);
            context.innerHTML = '';
        }
        
        QuestionElement(context, [correctAnswer, incorrectAnswer, gameOver], questions);
    }

    const createUI = () => {
        let element = document.createElement('div');
        ui.appendChild(element);
        return element;
    }
    LoadGame(data);
}
export { GameView };