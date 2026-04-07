const openBtn = document.getElementById("open-invite-btn");
const welcome = document.getElementById("welcome");
const musicBtn = document.getElementById("button-music");

const bgAudio = new Audio("https://akshay-kaviya-6.pages.dev/assets/music/sound.mp3");
bgAudio.loop = true;
bgAudio.preload = "auto";

function setMusicButtonState(isPlaying) {
  if (!musicBtn) return;

  musicBtn.innerHTML = isPlaying
    ? '<i class="fa-solid fa-circle-pause"></i>'
    : '<i class="fa-solid fa-circle-play"></i>';
  musicBtn.setAttribute(
    "aria-label",
    isPlaying ? "Pause background music" : "Play background music",
  );
  musicBtn.setAttribute(
    "title",
    isPlaying ? "Pause background music" : "Play background music",
  );
}

function toggleMusic() {
  if (!musicBtn) return;

  if (bgAudio.paused) {
    bgAudio.play();
    setMusicButtonState(true);
    return;
  }

  bgAudio.pause();
  setMusicButtonState(false);
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function startCountdown() {
  const node = document.getElementById("count-down");
  if (!node) return;

  const target = new Date(node.dataset.time).getTime();
  const dayNode = document.getElementById("day");
  const hourNode = document.getElementById("hour");
  const minuteNode = document.getElementById("minute");
  const secondNode = document.getElementById("second");

  const update = () => {
    const now = Date.now();
    const distance = target - now;

    if (distance <= 0) {
      dayNode.textContent = "0";
      hourNode.textContent = "00";
      minuteNode.textContent = "00";
      secondNode.textContent = "00";
      return;
    }

    const day = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const second = Math.floor((distance % (1000 * 60)) / 1000);

    dayNode.textContent = String(day);
    hourNode.textContent = pad(hour);
    minuteNode.textContent = pad(minute);
    secondNode.textContent = pad(second);
  };

  update();
  window.setInterval(update, 1000);
}

function launchConfetti() {
  if (typeof confetti !== "function") return;

  confetti({
    particleCount: 90,
    spread: 70,
    origin: { y: 0.62 },
    colors: ["#2d5b44", "#d9a86c", "#f3d8b1", "#f7ebda"],
  });
}

function revealInvite() {
  welcome.classList.add("welcome-hidden");
  document.body.style.overflow = "auto";
  window.AOS?.init({ duration: 1200, once: true });
  if (musicBtn) {
    musicBtn.hidden = false;
  }
  bgAudio.play();
  setMusicButtonState(true);
  launchConfetti();
}

document.body.style.overflow = "hidden";
startCountdown();

openBtn?.addEventListener("click", revealInvite);
musicBtn?.addEventListener("click", toggleMusic);
