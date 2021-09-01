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

    element.classList.add('col-11', 'column', 'cen-x');
    difficulty_container.classList.add('col-12');
    questions_container.classList.add('col-12');
    errors_container.classList.add('col-12');

    difficulty_label.innerText = 'difficulty';
    difficulty_element.innerText = data[0];

    questions_label.innerText = 'answers';
    questions_element.innerText = questions;

    errors_label.innerText = 'errors';
    errors_element.innerText = errors;

    button_home.innerText = 'home';
    button_home.onclick = () => {
        context.innerHTML = '';
        setter();
    };

    difficulty_container.appendChild(difficulty_label);
    difficulty_container.appendChild(difficulty_element);
    questions_container.appendChild(questions_label);
    questions_container.appendChild(questions_element);
    errors_container.appendChild(errors_label);
    errors_container.appendChild(errors_element);

    element.appendChild(difficulty_container);
    element.appendChild(questions_container);
    element.appendChild(errors_container);
    element.appendChild(button_home);

    context.appendChild(element);
}

export default GameOverView;