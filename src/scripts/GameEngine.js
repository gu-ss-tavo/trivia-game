import { HomeView } from "./HomeView.js";
import { GameView } from "./GameView.js";

let root = document.getElementById('root');

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
    GameView(root, data);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('hola mundo!');
    setHomeView();
});