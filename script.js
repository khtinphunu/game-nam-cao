/* ===== CẤU HÌNH ===== */
const RESET_CODE = "14122009";
const STORAGE_KEY = "namcao_leaderboard";

/* ===== BIẾN GAME ===== */
let playerName = "";
let currentPhe = "";
let currentIndex = 0;
let score = 0;
let locked = false;
let questions = [];

/* ===== DOM ===== */
const nameScreen = document.getElementById("nameScreen");
const menu = document.getElementById("menu");
const game = document.getElementById("game");
const leaderboard = document.getElementById("leaderboard");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const currentIdxEl = document.getElementById("currentIdx");
const leaderListEl = document.getElementById("leaderList");

const bgm = document.getElementById("bgm");
const clickSound = document.getElementById("clickSound");

/* ===== CÂU HỎI (10 CÂU / PHE) ===== */
const chipheo = [
  {q:"Chí Phèo xuất thân từ đâu?",a:[{t:"Trẻ mồ côi bị bỏ rơi",c:true},{t:"Con địa chủ",c:false},{t:"Con quan",c:false},{t:"Con nhà giàu",c:false}]},
  {q:"Trước khi tha hóa, Chí Phèo là người thế nào?",a:[{t:"Hiền lành, lương thiện",c:true},{t:"Côn đồ",c:false},{t:"Tham lam",c:false},{t:"Lười biếng",c:false}]},
  {q:"Ai đẩy Chí Phèo vào tù?",a:[{t:"Bá Kiến",c:true},{t:"Thị Nở",c:false},{t:"Ông giáo",c:false},{t:"Dân làng",c:false}]},
  {q:"Sau khi ra tù, Chí Phèo thường làm gì?",a:[{t:"Say rượu, rạch mặt ăn vạ",c:true},{t:"Làm ruộng",c:false},{t:"Buôn bán",c:false},{t:"Đi học",c:false}]},
  {q:"Món ăn Thị Nở cho Chí Phèo là?",a:[{t:"Cháo hành",c:true},{t:"Cháo gà",c:false},{t:"Cơm",c:false},{t:"Bánh",c:false}]},
  {q:"Ý nghĩa cháo hành?",a:[{t:"Tình người và hi vọng",c:true},{t:"Sự bố thí",c:false},{t:"Âm mưu",c:false},{t:"May mắn",c:false}]},
  {q:"Chí Phèo khao khát điều gì?",a:[{t:"Làm người lương thiện",c:true},{t:"Giàu có",c:false},{t:"Trả thù",c:false},{t:"Rời làng",c:false}]},
  {q:"Ai ngăn cản Chí Phèo hoàn lương?",a:[{t:"Bà cô Thị Nở",c:true},{t:"Bá Kiến",c:false},{t:"Ông giáo",c:false},{t:"Dân làng",c:false}]},
  {q:"Chí Phèo giết ai?",a:[{t:"Bá Kiến",c:true},{t:"Lý Cường",c:false},{t:"Thị Nở",c:false},{t:"Dân làng",c:false}]},
  {q:"Kết cục của Chí Phèo?",a:[{t:"Tự sát",c:true},{t:"Đi tù",c:false},{t:"Bỏ làng",c:false},{t:"Sống tiếp",c:false}]}
];

const laohac = [
  {q:"Lão Hạc sống bằng nghề gì?",a:[{t:"Làm ruộng",c:true},{t:"Buôn bán",c:false},{t:"Quan chức",c:false},{t:"Thợ mộc",c:false}]},
  {q:"Tài sản quý nhất của Lão Hạc?",a:[{t:"Mảnh vườn",c:true},{t:"Con bò",c:false},{t:"Ngôi nhà",c:false},{t:"Tiền bạc",c:false}]},
  {q:"Vì sao Lão Hạc bán cậu Vàng?",a:[{t:"Giữ tiền cho con",c:true},{t:"Ghét chó",c:false},{t:"Bị ép",c:false},{t:"Muốn ăn thịt",c:false}]},
  {q:"Sau khi bán chó, Lão Hạc cảm thấy?",a:[{t:"Đau đớn, ân hận",c:true},{t:"Vui vẻ",c:false},{t:"Bình thường",c:false},{t:"Thoải mái",c:false}]},
  {q:"Lão Hạc gửi tiền cho ai giữ?",a:[{t:"Ông giáo",c:true},{t:"Bá Kiến",c:false},{t:"Con trai",c:false},{t:"Binh Tư",c:false}]},
  {q:"Nguyên nhân chính cái chết của Lão Hạc?",a:[{t:"Đói nghèo và bế tắc",c:true},{t:"Bệnh tật",c:false},{t:"Tai nạn",c:false},{t:"Chiến tranh",c:false}]},
  {q:"Phẩm chất nổi bật của Lão Hạc?",a:[{t:"Tự trọng, nhân hậu",c:true},{t:"Tham lam",c:false},{t:"Gian trá",c:false},{t:"Hống hách",c:false}]},
  {q:"Ai hiểu Lão Hạc nhất?",a:[{t:"Ông giáo",c:true},{t:"Bá Kiến",c:false},{t:"Binh Tư",c:false},{t:"Con trai",c:false}]},
  {q:"Cái chết của Lão Hạc gây cảm xúc gì?",a:[{t:"Xót xa, thương cảm",c:true},{t:"Vui mừng",c:false},{t:"Thờ ơ",c:false},{t:"Ngạc nhiên",c:false}]},
  {q:"Giá trị nhân đạo của truyện?",a:[{t:"Trân trọng người nghèo",c:true},{t:"Ca ngợi giàu sang",c:false},{t:"Khuyên cam chịu",c:false},{t:"Đề cao bạo lực",c:false}]}
];

/* ===== HÀM ===== */
function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

function confirmName(){
  const name=document.getElementById("playerNameInput").value.trim();
  if(!name){alert("Phải nhập tên!");return;}
  playerName=name;
  nameScreen.classList.add("hidden");
  menu.classList.remove("hidden");
  bgm.play().catch(()=>{});
}

function startGame(phe){
  currentPhe=phe;
  questions = phe==="chipheo" ? chipheo : laohac;
  currentIndex=0;
  score=0;
  locked=false;
  menu.classList.add("hidden");
  game.classList.remove("hidden");
  showQuestion();
}

function showQuestion(){
  locked=false;
  const q=questions[currentIndex];
  questionEl.innerText=q.q;
  answersEl.innerHTML="";
  currentIdxEl.innerText=currentIndex+1;
  scoreEl.innerText=score;

  shuffle([...q.a]).forEach(ans=>{
    const btn=document.createElement("button");
    btn.className="answer-btn";
    btn.innerText=ans.t;
    btn.onclick=()=>chooseAnswer(btn,ans.c);
    answersEl.appendChild(btn);
  });
}

function chooseAnswer(btn,correct){
  if(locked)return;
  locked=true;

  document.querySelectorAll(".answer-btn").forEach(b=>{
    b.disabled=true;
    b.style.pointerEvents="none";
  });

  clickSound.play().catch(()=>{});

  if(correct){
    score+=10;
    btn.style.background="#34d399";
  }else{
    btn.style.background="#fb7185";
  }

  setTimeout(()=>{
    currentIndex++;
    currentIndex<questions.length?showQuestion():endGame();
  },700);
}

function endGame(){
  saveScore();
  showLeaderboard();
}

function saveScore(){
  const data=JSON.parse(localStorage.getItem(STORAGE_KEY))||[];
  data.push({name:playerName,score,phe:currentPhe});
  data.sort((a,b)=>b.score-a.score);
  localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
}

function showLeaderboard(){
  game.classList.add("hidden");
  menu.classList.add("hidden");
  leaderboard.classList.remove("hidden");

  const data=JSON.parse(localStorage.getItem(STORAGE_KEY))||[];
  if(!data.length){
    leaderListEl.innerHTML="<p>Chưa có dữ liệu</p>";
    return;
  }

  leaderListEl.innerHTML=
    "<ol>"+data.slice(0,10).map(d=>
      `<li>${d.name} — <b>${d.score}</b> điểm <i>(${d.phe==="chipheo"?"Chí Phèo":"Lão Hạc"})</i></li>`
    ).join("")+"</ol>";
}

function promptReset(){
  const code=prompt("Nhập mã GV để reset bảng điểm:");
  if(code===RESET_CODE){
    localStorage.removeItem(STORAGE_KEY);
    alert("Đã reset toàn bộ bảng điểm");
    location.reload();
  }else{
    alert("Sai mã!");
  }
}

/* expose */
window.confirmName=confirmName;
window.startGame=startGame;
window.showLeaderboard=showLeaderboard;
window.promptReset=promptReset;
