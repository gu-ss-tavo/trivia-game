import { HomeView } from "./HomeView.js";
import { GameView } from "./GameView.js";

let root = document.getElementById('root');

const setHomeView = () => {
    HomeView(root, setGameView);
}
const setGameView = data => {
    GameView(root, data);
}



document.addEventListener('DOMContentLoaded', () => {
    console.log('hola mundo!');
    setHomeView();
});