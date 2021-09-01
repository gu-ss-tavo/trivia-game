/**
 * @description Create 'Game Over' view
 * @param { HTMLElement } context 
 * @param { number } questions 
 * @param { number } errors 
 * @param { [] } data 
 * @param { function } setter 
 */
const GameOverView = (context, questions, errors, data, setter) => {
    const element = document.createElement('div');
    const game_over_title = document.createElement('h2');
    const difficulty_container = document.createElement('div');
    const difficulty_label = document.createElement('h2');
    const difficulty_element = document.createElement('div');
    const questions_container = document.createElement('div');
    const questions_label = document.createElement('h2');
    const questions_element = document.createElement('div');
    const errors_container = document.createElement('div');
    const errors_label = document.createElement('h2');
    const errors_element = document.createElement('div');
    const button_home = document.createElement('button');

    element.classList.add('game-over-container', 'col-11', 'col-md-10', 'col-lg-8', 'column', 'cen-x');
    game_over_title.classList.add('col-12', 'row', 'cen-x');
    questions_container.classList.add('questions-container', 'col-12', 'row');
    errors_container.classList.add('errors-container', 'col-12', 'row');
    difficulty_container.classList.add('difficulty-container', 'col-12', 'row');
    button_home.classList.add('col-12');

    game_over_title.innerText = 'Game Over';

    questions_label.innerText = 'corrects';
    questions_element.innerText = questions;

    errors_label.innerText = 'errors';
    errors_element.innerText = errors;

    difficulty_label.innerText = 'difficulty';
    difficulty_element.innerText = data[0];

    button_home.innerText = 'home';
    button_home.onclick = () => {
        context.innerHTML = '';
        setter();
    };

    questions_container.appendChild(questions_label);
    questions_container.appendChild(questions_element);
    errors_container.appendChild(errors_label);
    errors_container.appendChild(errors_element);
    difficulty_container.appendChild(difficulty_label);
    difficulty_container.appendChild(difficulty_element);

    element.appendChild(game_over_title);
    element.appendChild(questions_container);
    element.appendChild(errors_container);
    element.appendChild(difficulty_container);
    element.appendChild(button_home);

    context.appendChild(element);
}

export default GameOverView;