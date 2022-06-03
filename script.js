console.log("Welcome to Spotify");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let songs = [
    {
        songName: "Mahiya Mere Mahi - Sunil Kamath",
        filePath: "songs/1.mp3",
        coverPath: "covers/cover1.jpg"
    },
    {
        songName: "Ye Tune Kya Kiya - Javed Bashir ",
        filePath: "songs/2.mp3",
        coverPath: "covers/cover2.jpg"
    },
    {
        songName: "Dil Ko Karaar Aaya - Neha Kakkar",
        filePath: "songs/3.mp3",
        coverPath: "covers/cover3.jpg"
    },
    {
        songName: "Tum Jo Aayee - Tulsi Kumar",
        filePath: "songs/4.mp3",
        coverPath: "covers/cover4.jpg"
    },
    {
        songName: "Piya Ghar Aavenge - Kailash Kher",
        filePath: "songs/5.mp3",
        coverPath: "covers/cover5.jpg"
    }
]

songItem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})


//Handle masterplay play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

//Listen to events
audioElement.addEventListener('timeupdate', () => {
    //Updating seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = function () {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

let clickedtime = 0;

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        clickedtime += 1;
        if (clickedtime % 2 != 0) {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            masterSongName.innerText = songs[songIndex - 1].songName;
            gif.style.opacity = 1;
        }
        else{
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            audioElement.pause();
            gif.style.opacity = 0;
            
        }
        //if(currentTime.)
    })
    
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex > 5) {
        songIndex = 1;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerText = songs[songIndex - 1].songName;
    gif.style.opacity = 1;
});


document.getElementById('previous').addEventListener('click', () => {
    if (songIndex < 1) {
        songIndex = 1;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
});

audioElement.addEventListener('ended',()=>{
    songIndex  += 1;
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerText = songs[songIndex - 1].songName;
    gif.style.opacity = 1;
})
