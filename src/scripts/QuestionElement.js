/**
 * @description Create loop 'Question Element'
 * @param { HTMLElement } context 
 * @param { [] } questions 
 * @param { number } ini 
 */
const QuestionElement = (context, events, questions, ini=0) => {
    let [setCorrectAnswer, setIncorrectAnswer, setGameOver] = events;
    let next_question = questions[ini+1];
    let answers_count = questions[ini].incorrect_answers.length + 1;
    let correct_answer = Math.floor(Math.random() * answers_count);
    
    const element = document.createElement('div');
    const question_element = document.createElement('h2');
    const response_container = document.createElement('div');
    
    element.classList.add('question-container', 'col-11', 'column', 'cen-x');
    
    question_element.classList.add('col-10');
    question_element.innerHTML = questions[ini].question;
    
    response_container.classList.add('col-10', 'row', 'cen-x');
    if(questions[ini].type == 'multiple') response_container.classList.add('question-multiple');
    else if(questions[ini].type == 'boolean') response_container.classList.add('question-boolean');

    /**
     * @description Creates the elements of the answers
     */
    for(let i = 0; i < answers_count; i++) {
        let response_element = document.createElement('div');
        if(i !== correct_answer) {
            response_element.innerHTML = questions[ini].incorrect_answers[i > correct_answer ? i-1 : i];
        }else{
            response_element.innerHTML = questions[ini].correct_answer;
        }
        
        response_element.classList.add('col-4');
        if(response_element.innerHTML === 'True') response_element.classList.add('bolean-true');
        if(response_element.innerHTML === 'False') response_element.classList.add('bolean-false');

        response_element.style.textAlign = 'center';

        response_element.onclick = e => validateResponse(e, i === correct_answer);
        response_container.appendChild(response_element);
    }

    /**
     * @description Validate response
     * @param {event} e 
     * @param {boolean} correct 
     */
    const validateResponse = (e, correct) => {
        e.target.onclick = undefined;
        if(correct) {
            setCorrectAnswer();
            if(next_question !== undefined)
                QuestionElement(context, events, questions, ini+1);
            else 
                setGameOver();
        }else {
            setIncorrectAnswer();
        }
    }

    element.appendChild(question_element);
    element.appendChild(response_container);
    
    context.innerHTML = '';
    context.appendChild(element);
}

export default QuestionElement;