import { HomeView } from "./HomeView.js";
import { GameView } from "./GameView.js";

let root = document.getElementById('root');
let ui = document.getElementById('ui');

/**
 * @description Create 'Home View'
 */
const setHomeView = () => {
    HomeView(root, setGameView);
}
/**
 * @description Create 'Game View'
 */
const setGameView = data => {
    GameView(root, ui, data, setHomeView);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('hola mundo!');
    setHomeView();
});