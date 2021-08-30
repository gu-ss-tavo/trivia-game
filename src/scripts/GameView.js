const GameView = (context, data) => {
    const API = 'https://opentdb.com/api.php?';
    const QUESTIONS_LENGTH = 15;

    context.innerHTML = '';

    /**
     * @description Load game
     * @param {[]} data 
     */
    const LoadGame = data => {
        console.log(data);
        fetchApi(createApiPaths(data)).then(questions => {
            console.log(createQuestionLevel(questions));
        });
    }
    
    /**
     * @description Create readable api paths
     * @param {[]} data 
     * @returns []
     */
    const createApiPaths = data => {
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

    LoadGame(data);
}
export { GameView };