/* GLOBAL STATE */
const GV_CODE = "1412";
let playerName = "";
let currentPhe = "";      // 'chipheo' or 'laohac'
let currentIndex = 0;
let score = 0;
let locked = false;
let currentQuestions = [];

/* DOM */
const nameScreen = document.getElementById("nameScreen");
const menu = document.getElementById("menu");
const game = document.getElementById("game");
const leaderboardSection = document.getElementById("leaderboard");

const playerNameInput = document.getElementById("playerNameInput");
const playerNameLabel = document.getElementById("playerNameLabel");
const pheNameLabel = document.getElementById("pheNameLabel");
const pheImage = document.getElementById("pheImage");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const currentIdxEl = document.getElementById("currentIdx");
const leaderListEl = document.getElementById("leaderList");

const bgm = document.getElementById("bgm");
const clickSound = document.getElementById("clickSound");

/* QUESTION BANK: 10 Q / phe */
const chipheoQuestions = [
  { q:"Chí Phèo xuất thân từ đâu?", a:[{t:"Trẻ mồ côi bị bỏ rơi",c:true},{t:"Con gia đình khá giả",c:false},{t:"Con quan",c:false},{t:"Con nhà giàu",c:false}]},
  { q:"Trước khi bị tha hóa, Chí Phèo là người như thế nào?", a:[{t:"Lương thiện, hiền lành",c:true},{t:"Côn đồ",c:false},{t:"Buôn bán",c:false},{t:"Quan chức",c:false}]},
  { q:"Ai đã trực tiếp đẩy Chí Phèo vào tù và thay đổi số phận?", a:[{t:"Bá Kiến",c:true},{t:"Ông giáo",c:false},{t:"Thị Nở",c:false},{t:"Dân làng",c:false}]},
  { q:"Sau khi ra tù, Chí Phèo thường biểu hiện bằng hành vi nào?", a:[{t:"Rạch mặt, say rượu, ăn vạ",c:true},{t:"Làm ruộng",c:false},{t:"Lập gia đình",c:false},{t:"Lấy vợ",c:false}]},
  { q:"Thị Nở đem cho Chí Phèo món gì khiến anh động lòng?", a:[{t:"Bát cháo hành",c:true},{t:"Bát phở",c:false},{t:"Một quả trứng",c:false},{t:"Một ổ bánh",c:false}]},
  { q:"Ý nghĩa bát cháo hành đối với Chí Phèo là gì?", a:[{t:"Biểu tượng của tình người và hy vọng hoàn lương",c:true},{t:"Bữa ăn bình thường",c:false},{t:"Mưu mô",c:false},{t:"Tiền bạc",c:false}]},
  { q:"Chí Phèo khao khát điều gì sau khi gặp Thị Nở?", a:[{t:"Được làm người lương thiện",c:true},{t:"Được giàu có",c:false},{t:"Được trả thù",c:false},{t:"Rời làng",c:false}]},
  { q:"Ai là nhân vật đại diện cho thế lực áp bức trong truyện?", a:[{t:"Bá Kiến",c:true},{t:"Ông giáo",c:false},{t:"Thị Nở",c:false},{t:"Cảnh sát",c:false}]},
  { q:"Hành động giết Bá Kiến của Chí Phèo thể hiện điều gì?", a:[{t:"Phản kháng tuyệt vọng",c:true},{t:"Tư lợi",c:false},{t:"Tội lỗi vô nghĩa",c:false},{t:"Sự nhầm lẫn",c:false}]},
  { q:"Kết cục của Chí Phèo cho thấy thông điệp gì?", a:[{t:"Bi kịch bị tước đoạt quyền làm người",c:true},{t:"Thành công",c:false},{t:"Hòa giải",c:false},{t:"Đổi đời",c:false}]}
];

const laohacQuestions = [
  { q:"Lão Hạc sống bằng nghề gì?", a:[{t:"Làm ruộng/nuôi ít",c:true},{t:"Buôn bán",c:false},{t:"Quan chức",c:false},{t:"Làm thợ",c:false}]},
  { q:"Tài sản quý nhất của Lão Hạc là gì?", a:[{t:"Mảnh vườn",c:true},{t:"Con bò",c:false},{t:"Tiền",c:false},{t:"Nhà sang",c:false}]},
  { q:"Vì sao Lão Hạc bán cậu Vàng?", a:[{t:"Để giữ mảnh vườn cho con",c:true},{t:"Ghét chó",c:false},{t:"Bị ép",c:false},{t:"Muốn ăn",c:false}]},
  { q:"Sau khi bán cậu Vàng, Lão Hạc cảm thấy thế nào?", a:[{t:"Đau đớn, day dứt",c:true},{t:"Vui vẻ",c:false},{t:"Không bận tâm",c:false},{t:"Hạnh phúc",c:false}]},
  { q:"Lão Hạc gửi tiền và nhờ ai giữ giúp?", a:[{t:"Ông giáo",c:true},{t:"Bá Kiến",c:false},{t:"Con trai",c:false},{t:"Thầy thuốc",c:false}]},
  { q:"Nguyên nhân sâu xa dẫn đến kết cục của Lão Hạc?", a:[{t:"Đói nghèo và bế tắc",c:true},{t:"Bệnh tật",c:false},{t:"Chiến tranh",c:false},{t:"May mắn",c:false}]},
  { q:"Nhân cách nổi bật của Lão Hạc là gì?", a:[{t:"Lòng tự trọng và nhân hậu",c:true},{t:"Gian trá",c:false},{t:"Tham lam",c:false},{t:"Hống hách",c:false}]},
  { q:"Ai là người thấu hiểu Lão Hạc nhất?", a:[{t:"Ông giáo",c:true},{t:"Bá Kiến",c:false},{t:"Dân làng",c:false},{t:"Con trai",c:false}]},
  { q:"Cái chết của Lão Hạc khiến người đọc cảm thấy gì?", a:[{t:"Xót xa và thương cảm",c:true},{t:"Vui mừng",c:false},{t:"Thờ ơ",c:false},{t:"Ngạc nhiên",c:false}]},
  { q:"Giá trị nhân đạo chính của truyện Lão Hạc là?", a:[{t:"Cảm thương và trân trọng người nghèo",c:true},{t:"Ca ngợi giàu sang",c:false},{t:"Ca ngợi sức mạnh",c:false},{t:"Khuyên cam chịu",c:false}]}
];

/* UTIL: shuffle (Fisher-Yates) */
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* NAME */
function confirmName() {
  const name = playerNameInput.value.trim();
  if (!name) { alert("Phải nhập tên trước khi chơi."); return; }
  playerName = name;
  playerNameLabel && (playerNameLabel.textContent = playerName);
  nameScreen.classList.add("hidden");
  menu.classList.remove("hidden");
  // try play bgm (browser requires user gesture — we have it)
  bgm.play().catch(()=>{});
}

/* START GAME */
function startGame(phe) {
  currentPhe = phe;
  currentQuestions = phe === "chipheo" ? chipheoQuestions : laohacQuestions;
  currentIndex = 0;
  score = 0;
  locked = false;

  menu.classList.add("hidden");
  leaderboardSection && leaderboardSection.classList.add("hidden");
  game.classList.remove("hidden");

  // set UI labels and image
  document.getElementById("playerNameLabel").textContent = playerName;
  document.getElementById("pheNameLabel").textContent = (phe === "chipheo") ? "Chí Phèo" : "Lão Hạc";
  document.getElementById("pheImage").src = (phe === "chipheo") ? "images/chipheo.jpg" : "images/laohac.jpg";

  showQuestion();
}

/* SHOW QUESTION */
function showQuestion() {
  locked = false;
  const q = currentQuestions[currentIndex];
  questionEl.textContent = q.q;
  answersEl.innerHTML = "";
  currentIdxEl.textContent = (currentIndex + 1);

  // prepare shuffled answers (clone + shuffle)
  const shuffled = shuffle(q.a);
  shuffled.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = item.t;
    btn.onclick = () => onAnswer(btn, item.c);
    answersEl.appendChild(btn);
  });

  scoreEl.textContent = score;
}

/* ON ANSWER (lock + play sound + mark + next) */
function onAnswer(btn, correct) {
  if (locked) return;
  locked = true;

  // disable all buttons immediately to prevent multi-click
  document.querySelectorAll(".answer-btn").forEach(b => {
    b.disabled = true;
    b.style.pointerEvents = "none";
  });

  // sound feedback
  try { clickSound.currentTime = 0; clickSound.play(); } catch(e){}

  // color feedback
  if (correct) {
    score += 10;
    btn.style.background = "linear-gradient(90deg,#34d399,#10b981)";
    btn.style.color = "#fff";
  } else {
    btn.style.background = "linear-gradient(90deg,#fb7185,#f43f5e)";
    btn.style.color = "#fff";
    // highlight the correct button for clarity
    const allBtns = Array.from(document.querySelectorAll(".answer-btn"));
    const correctBtn = allBtns.find(b => {
      // match text with correct answer text (safe when texts unique)
      const q = currentQuestions[currentIndex];
      return q.a.some(a => a.c && a.t === b.textContent);
    });
    if (correctBtn) {
      correctBtn.style.background = "linear-gradient(90deg,#34d399,#10b981)";
      correctBtn.style.color = "#fff";
    }
  }

  // next question after short delay
  setTimeout(() => {
    currentIndex++;
    if (currentIndex < currentQuestions.length) {
      showQuestion();
    } else {
      finishGame();
    }
  }, 800);
}

/* FINISH GAME -> save and show leaderboard */
function finishGame() {
  saveScoreToStorage(playerName, score, currentPhe);
  showLeaderboard();
}

/* LEADERBOARD: store records as {name,score,phe,date} */
function saveScoreToStorage(name, score, phe) {
  const key = "namcao_scores_v1";
  const raw = localStorage.getItem(key);
  const arr = raw ? JSON.parse(raw) : [];
  arr.push({ name, score, phe, date: new Date().toISOString() });
  arr.sort((a,b) => b.score - a.score || new Date(a.date) - new Date(b.date));
  localStorage.setItem(key, JSON.stringify(arr.slice(0, 50))); // keep up to 50 records
}

/* render leaderboard UI */
function showLeaderboard() {
  nameScreen.classList.add("hidden");
  menu.classList.add("hidden");
  game.classList.add("hidden");
  leaderboardSection.classList.remove("hidden");

  const key = "namcao_scores_v1";
  const raw = localStorage.getItem(key);
  const arr = raw ? JSON.parse(raw) : [];

  if (!arr.length) {
    leaderListEl.innerHTML = "<p class='muted'>Chưa có điểm.</p>";
    return;
  }

  // group by phe? we show combined but indicate phe
  const html = arr.slice(0, 10).map((r, idx) => {
    const badge = r.phe === "chipheo" ? "Chí Phèo" : "Lão Hạc";
    return `<div class="leader-row">
      <strong>${idx+1}. ${escapeHtml(r.name)}</strong>
      <span class="leader-tag">${escapeHtml(badge)}</span>
      <div class="muted">Điểm: <b>${r.score}</b></div>
    </div>`;
  }).join("");

  leaderListEl.innerHTML = html;
}

/* RESET with GV code prompt */
function promptReset() {
  const code = prompt("Nhập mã GV để reset bảng điểm:");
  if (code === GV_CODE) {
    localStorage.removeItem("namcao_scores_v1");
    alert("Đã reset bảng điểm.");
    showLeaderboard();
  } else {
    alert("Sai mã GV.");
  }
}

/* safety escape for display */
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, ch => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[ch]));
}

/* try to resume if user previously set a name (optional) */
(function tryResume(){
  const last = localStorage.getItem("namcao_last_name");
  if (last) {
    playerNameInput.value = last;
  }
})();

/* save last name on confirm */
function confirmName(){
  const name = playerNameInput.value.trim();
  if(!name){ alert("Phải nhập tên trước khi chơi."); return; }
  playerName = name;
  localStorage.setItem("namcao_last_name", playerName);
  playerNameLabel && (playerNameLabel.textContent = playerName);
  nameScreen.classList.add("hidden");
  menu.classList.remove("hidden");
  // try play music
  bgm.play().catch(()=>{});
}

/* Compatibility: connect DOM elements that may be referenced before script loads */
document.addEventListener("DOMContentLoaded", ()=> {
  // already referenced earlier, but ensure elements exist
});

/* Expose functions to global for inline handlers */
window.confirmName = confirmName;
window.startGame = startGame;
window.showLeaderboard = showLeaderboard;
window.promptReset = promptReset;
