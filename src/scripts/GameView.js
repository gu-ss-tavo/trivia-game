import QuestionElement from "./QuestionElement.js";
import GameOverView from "./GameOverView.js";

/**
 * @description Video game control;
 * @param { HTMLElement } context 
 * @param { HTMLElement } ui
 * @param { [] } data 
 * @param { function } setter
 */
const GameView = (context, ui, data, setter) => {
    const setHomeView = setter;
    const API = 'https://opentdb.com/api.php?';
    const QUESTIONS_LENGTH = 15;
    const game_modes = ['random', 'short time', 'survive'];
    
    /**
     * @description Load game
     */
    const LoadGame = () => {
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
        let end_game = false;

        const [value_element, question_element] = createUI();
        question_element.innerText = index;

        if(game_mode === game_modes[0]) {
            game_mode = game_modes[Math.ceil(Math.random() * 2)];
        }
        if(game_mode === game_modes[1]) {
            value = 30;
            value_element.innerText = value;
            let interval = setInterval(() => {
                value--;
                value_element.innerText = value;
                
                if(value <= 10) {
                    value_element.classList = ['value-element'];
                    value_element.classList.add('hard');
                }else if(value <= 20) {
                    value_element.classList = ['value-element'];
                    value_element.classList.add('normal');
                }else if(value <= 30) {
                    value_element.classList = ['value-element'];
                    value_element.classList.add('easy');
                }

                if(value <= 0 || end_game) {
                    if(!end_game) gameOver();
                    clearInterval(interval);
                }
            }, 1000);
        }else if(game_mode === game_modes[2]) {
            value = 5;
            value_element.classList.add('hard');
            value_element.innerText = value;
        }
        
        /**
         * @description Event verification
         */
        const correctAnswer = () => {
            index++;
            question_element.innerText = index;
            if(game_mode === game_modes[1]) {
                value += 3;
                value_element.innerText = value;
            }else if(game_mode === game_modes[2]) {
                //
            }
        }
        const incorrectAnswer = () => {
            errors++;
            if(game_mode === game_modes[1]) {
                value -= value > 3 ? 3 : 0;
                value_element.innerText = value;
            }else if(game_mode === game_modes[2]) {
                value -= 1;
                if(value <= 3) value_element.classList.add('normal');
                value_element.innerText = value;
                if(value <= 0) gameOver();
            }
        }
        /**
         * @description Clean and load 'Game Over View'
         */
        const gameOver = () => {
            end_game = true;
            ui.innerHTML = '';
            context.innerHTML = '';
            GameOverView(context, index, errors, data, setHomeView);

            console.log('preguntas:', index);
            console.log('errors:', errors);
        }
        context.classList.remove('home');
        QuestionElement(context, [correctAnswer, incorrectAnswer, gameOver], questions);
    }
    /**
     * @description Use the 'ui' element and generate one according to the game mode
     * @returns HTMLElement
     */
    const createUI = () => {
        let value_element = document.createElement('div');
        let question_element = document.createElement('div');

        value_element.classList.add('value-element');
        question_element.classList.add('question-element');

        ui.appendChild(value_element);
        ui.appendChild(question_element);
        return [value_element, question_element];
    }
    LoadGame();
}
export { GameView };