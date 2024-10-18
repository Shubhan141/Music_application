// Array of song objects, each containing a name, path to the audio file, and cover image
const songList = [
  { name: "Aaj ki rat...", path: "../Songs/Aaj_ki_rat.mp3", coverPath: "../Cover/aaj_ki_rat.png" },
  { name: "Aisi diwangi...", path: "../Songs/Aisi_diwangi_dekhi_nahi.mp3", coverPath: "../Cover/Aise_diwangi.png" },
  { name: "Humko hami se...", path: "../Songs/humko_hami.mp3", coverPath: "../Cover/hamki_hami_se.png" },
  { name: "Huwa hai aaj...", path: "../Songs/huwa_hai_aaj.mp3", coverPath: "../Cover/huwa_hai_aaj.png" },
  { name: "Ae raja ji", path: "../Songs/Ae_raja_ji.mp3", coverPath: "../Cover/panchayat.png" },
  { name: "Batao ki ", path: "../Songs/batao_ki_ham.mp3", coverPath: "../Cover/juda.png" },
  { name: "Dil mera ", path: "../Songs/dil_mera_dekhi.mp3", coverPath: "../Cover/dil_mera.png" },
  { name: "dil sambhal ", path: "../Songs/dil_sambhal.mp3", coverPath: "../Cover/dil_sambhal.png" },
  { name: "juda hoker", path: "../Songs/juda_hoker.mp3", coverPath: "../Cover/juda.png" },
  { name: "Rafta rafta", path: "../Songs/Rafta_raft.mp3", coverPath: "../Cover/rafta.png" },
  { name: "wafa na ras", path: "../Songs/wafa_na.mp3", coverPath: "../Cover/wafa.png" },

];

// Get references to the HTML elements for play, pause, next, and previous actions
const playButton = document.getElementById('Playbutton');
const pauseButton = document.getElementById('pausebutton');
const nextButton = document.getElementById('nextbutton');
const prevButton = document.getElementById('prebutton');
const myProgressBar = document.getElementById('myprogressbar');
const gif = document.getElementById('gifid');
const currentTimeDisplay = document.getElementById('currentTimeDisplay');
const totalDurationDisplay = document.getElementById('totalDurationDisplay');
const nameDisplay = document.getElementById('NameDisplay');
const coverDisplay = document.getElementById('coverDisplay');
const valumeSeekbar = document.getElementById('valumeSeekbar');
const mutevalume = document.getElementById('mutevalume');
const ringValume = document.getElementById('ringValume');

// Set pause button display to 'none' by default
pauseButton.style.display = 'none';
gif.style.opacity = 0;


// Variable to keep track of the current song index
let currentSongsIndex = 0;

// Create an audio element and initialize it with the first song
let audio = new Audio(songList[currentSongsIndex].path);

// Play button click event listener
playButton.addEventListener('click', () => {
  if (audio.paused || audio.currentTime <= 0) {
    audio.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
    gif.style.opacity = 1;
  }
});

// Pause button click event listener
pauseButton.addEventListener('click', () => {
  if (!audio.paused) {
    audio.pause();
    playButton.style.display = 'block';
    pauseButton.style.display = 'none';
    gif.style.opacity = 0;
  }
});

// Next button click event listener
nextButton.addEventListener('click', () => {
  currentSongsIndex = (currentSongsIndex + 1) % songList.length;
  audio.src = songList[currentSongsIndex].path;
  audio.play();
  playButton.style.display = 'none';
  pauseButton.style.display = 'block';
  gif.style.opacity = 1;
  nameDisplay.textContent = songList[currentSongsIndex].name;
  coverDisplay.src = songList[currentSongsIndex].coverPath;
});

// Previous button click event listener
prevButton.addEventListener('click', () => {
  currentSongsIndex = (currentSongsIndex - 1 + songList.length) % songList.length;
  audio.src = songList[currentSongsIndex].path;
  audio.play();
  playButton.style.display = 'none';
  pauseButton.style.display = 'block';
  gif.style.opacity = 1;
  nameDisplay.textContent = songList[currentSongsIndex].name;
  coverDisplay.src = songList[currentSongsIndex].coverPath;
});

// Time update event listener to update seek bar and time displays
audio.addEventListener('timeupdate', () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;

  if (duration > 0) {
    const timeInPercent = parseInt((currentTime / duration) * 100);
    myProgressBar.value = timeInPercent;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const formattedCurrentTime = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);
    const formattedDuration = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;

    currentTimeDisplay.textContent = formattedCurrentTime;
    totalDurationDisplay.textContent = formattedDuration;
  }
});

// Seek bar input event listener to update audio time
myProgressBar.addEventListener('input', () => {
  const seekTo = (myProgressBar.value / 100) * audio.duration;
  audio.currentTime = seekTo;
});


//   handling volume of audio element

// Set initial volume
audio.volume = 0.5; // Set initial volume to 50%
valumeSeekbar.value = audio.volume; // Set the slider to match the initial volume (0-1)

// Handling volume of the audio element
valumeSeekbar.addEventListener('input', () => {
  // Set the audio volume based on the slider value (0-1 range)
  audio.volume = valumeSeekbar.value; // Directly set the audio volume from the slider
});


// Initialize the audio volume and mute state
audio.volume = 0.5; // Set initial volume to 50%
let previousVolume = audio.volume; // Variable to store the previous volume level

ringValume.addEventListener('click', () => {
  // when audio is playing 
  ringValume.style.display = 'none';
  mutevalume.style.display = 'block';
  audio.volume = 0;
})
mutevalume.addEventListener('click', () => {
  ringValume.style.display = 'block';
  mutevalume.style.display = 'none';
  audio.volume = previousVolume;
});




// main handling

let count = 0;
const playButtons = document.querySelectorAll('.playbuttonMain');
let playingSongIndex = -1;
// const audio = new Audio(); // Declare globally
gif.style.opacity = 0;
playButtons.forEach((button, index) => {
  console.log("count is:", count++);
  button.addEventListener('click', function () {
    if (audio.paused || playingSongIndex !== index) {
      playingSongIndex = index;
      audio.src = songList[playingSongIndex].path;
      audio.play();
      updateUIForPlaying(button, songList[playingSongIndex]);
    } else {
      audio.pause();
      button.classList.remove('fa-pause');
      button.classList.add('fa-play');
      gif.style.opacity = 0;
    }
  });
});

// Function to update the UI
function updateUIForPlaying(button, song) {
  playButtons.forEach((btn) => {
    btn.classList.remove('fa-pause');
    btn.classList.add('fa-play');
  });

  button.classList.remove('fa-play');
  button.classList.add('fa-pause');
  gif.style.opacity = 1;
  nameDisplay.textContent = song.name;
  coverDisplay.src = song.coverPath;
}

// Handling audio error
audio.addEventListener('error', () => {
  alert('Error loading the song. Skipping to the next one.');
  nextButton.click();
});
