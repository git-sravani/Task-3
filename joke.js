const jokeContainer=document.getElementById("joke");
const jokeBtn=document.getElementById("btn");
const url=  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";
let getJoke=()=>{
    
    fetch(url)
    .then(data=>data.json())
    .then(item=>{
        jokeContainer.textContent=`${item.joke}`; 
    });
}
jokeBtn.addEventListener('click',getJoke);
getJoke();