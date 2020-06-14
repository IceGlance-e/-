function include(url) {
    if(document.getElementById(url)){
        return;
    }

    let script = document.createElement('script');
    script.src = url;
    script.id = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
include("Js_Files/Game.js");

window.onload = function() {
    let game = Game.getInstance(); //Создаем объект класса Game
    game.loop(0);
    console.dir(game);
};