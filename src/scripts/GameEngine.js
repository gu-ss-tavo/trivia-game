import { HomeView } from "./HomeView.js";
import { GameView } from "./GameView.js";

const API = '';
let root = document.getElementById('root');

const setHomeView = () => {
    let res = HomeView(root, setGameView);
}
const setGameView = () => {
    let res = GameView(root);
    root.innerHTML = res.html;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('hola mundo!');
    setHomeView();
});