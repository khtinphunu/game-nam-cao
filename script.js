/* ===== CẤU HÌNH ===== */
const RESET_CODE = "14122009";

/* ===== BIẾN ===== */
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

/* ===== CÂU HỎI ===== */
const chipheo = [
 {q:"Chí Phèo xuất thân từ đâu?",a:[
  {t:"Trẻ mồ côi bị bỏ rơi",c:true},{t:"Con địa chủ",c:false},{t:"Con quan",c:false},{t:"Con nhà giàu",c:false}]},
 {q:"Trước khi vào tù, Chí Phèo là người thế nào?",a:[
  {t:"Hiền lành, lương thiện",c:true},{t:"Côn đồ",c:false},{t:"Tham lam",c:false},{t:"Lười biếng",c:false}]},
 {q:"Ai đẩy Chí Phèo vào con đường tha hóa?",a:[
  {t:"Bá Kiến",c:true},{t:"Thị Nở",c:false},{t:"Ông giáo",c:false},{t:"Dân làng",c:false}]},
 {q:"Sau khi ra tù, Chí Phèo thường làm gì?",a:[
  {t:"Say rượu, rạch mặt ăn vạ",c:true},{t:"Làm ruộng",c:false},{t:"Buôn bán",c:false},{t:"Dạy học",c:false}]},
 {q:"Thị Nở cho Chí Phèo ăn món gì?",a:[
  {t:"Cháo hành",c:true},{t:"Cháo gà",c:false},{t:"Bánh đa",c:false},{t:"Cơm nguội",c:false}]},
 {q:"Ý nghĩa của cháo hành là gì?",a:[
  {t:"Biểu tượng của tình người",c:true},{t:"Sự thương hại",c:false},{t:"Âm mưu",c:false},{t:"May mắn",c:false}]},
 {q:"Chí Phèo khao khát điều gì nhất?",a:[
  {t:"Được làm người lương thiện",c:true},{t:"Giàu có",c:false},{t:"Trả thù",c:false},{t:"Rời làng",c:false}]},
 {q:"Ai ngăn cản Chí Phèo hoàn lương?",a:[
  {t:"Bà cô Thị Nở",c:true},{t:"Bá Kiến",c:false},{t:"Ông giáo",c:false},{t:"Dân làng",c:false}]},
 {q:"Chí Phèo giết ai trước khi chết?",a:[
  {t:"Bá Kiến",c:true},{t:"Lý Cường",c:false},{t:"Thị Nở",c:false},{t:"Binh Chức",c:false}]},
 {q:"Kết cục của Chí Phèo?",a:[
  {t:"Tự sát",c:true},{t:"Đi tù",c:false},{t:"Bỏ làng",c:false},{t:"Sống tiếp",c:false}]}
];

const laohac = [
 {q:"Lão Hạc sống bằng nghề gì?",a:[
  {t:"Làm ruộng",c:true},{t:"Buôn bán",c:false},{t:"Quan chức",c:false},{t:"Thợ mộc",c:false}]},
 {q:"Tài sản quý giá nhất của Lão Hạc là gì?",a:[
  {t:"Mảnh vườn",c:true},{t:"Con bò",c:false},{t:"Ngôi nhà",c:false},{t:"Tiền bạc",c:false}]},
 {q:"Cậu Vàng là ai?",a:[
  {t:"Con chó của Lão Hạc",c:true},{t:"Con trai",c:false},{t:"Hàng xóm",c:false},{t:"Bạn thân",c:false}]},
 {q:"Vì sao Lão Hạc bán cậu Vàng?",a:[
  {t:"Giữ tiền cho con",c:true},{t:"Ghét chó",c:false},{t:"Bị ép",c:false},{t:"Muốn ăn thịt",c:false}]},
 {q:"Sau khi bán chó, Lão Hạc cảm thấy thế nào?",a:[
  {t:"Ân hận, đau đớn",c:true},{t:"Vui vẻ",c:false},{t:"Bình thản",c:false},{t:"Thoải mái",c:false}]},
 {q:"Lão Hạc gửi tiền cho ai giữ?",a:[
  {t:"Ông giáo",c:true},{t:"Bá Kiến",c:false},{t:"Binh Tư",c:false},{t:"Con trai",c:false}]},
 {q:"Nguyên nhân chính dẫn đến cái chết của Lão Hạc?",a:[
  {t:"Đói nghèo và bế tắc",c:true},{t:"Bệnh nặng",c:false},{t:"Tai nạn",c:false},{t:"Bị hại",c:false}]},
 {q:"Phẩm chất nổi bật của Lão Hạc?",a:[
  {t:"Tự trọng, nhân hậu",c:true},{t:"Tham lam",c:false},{t:"Gian trá",c:false},{t:"Hống hách",c:false}]},
 {q:"Cái chết của Lão Hạc thể hiện điều gì?",a:[
  {t:"Bi kịch người nông dân nghèo",c:true},{t:"Sự hèn nhát",c:false},{t:"Trốn tránh trách nhiệm",c:false},{t:"May mắn",c:false}]},
 {q:"Giá trị nhân đạo của truyện Lão Hạc?",a:[
  {t:"Cảm thông sâu sắc với người nghèo",c:true},{t:"Ca ngợi giàu sang",c:false},{t:"Khuyên cam chịu",c:false},{t:"Đề cao bạo lực",c:false}]}
];

/* ===== HÀM CHUNG ===== */
function shuffle(arr){
 for(let i=arr.length-1;i>0;i--){
  const j=Math.floor(Math.random()*(i+1));
  [arr[i],arr[j]]=[arr[j],arr[i]];
 }
 return arr;
}

function confirmName(){
 const name=document.getElementById("playerNameInput").value.trim();
 if(!name){alert("Vui lòng nhập tên");return;}
 playerName=name;
 nameScreen.classList.add("hidden");
 menu.classList.remove("hidden");
 bgm.play().catch(()=>{});
}

function startGame(phe){
 currentPhe=phe;
 questions = shuffle(phe==="chipheo"?[...chipheo]:[...laohac]);
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
  btn.style.background="#22c55e";
 }else{
  btn.style.background="#ef4444";
 }

 setTimeout(()=>{
  currentIndex++;
  currentIndex<questions.length?showQuestion():endGame();
 },700);
}

function endGame(){
 const id=Date.now()+"_"+Math.floor(Math.random()*1000);
 db.ref("scores/"+id).set({
  name:playerName,
  score:score,
  phe:currentPhe
 });
 showLeaderboard();
}

function showLeaderboard(){
 game.classList.add("hidden");
 leaderboard.classList.remove("hidden");

 db.ref("scores").on("value",snap=>{
  const data=snap.val();
  if(!data){
   leaderListEl.innerHTML="<p>Chưa có dữ liệu</p>";
   return;
  }
  const arr=Object.values(data).sort((a,b)=>b.score-a.score);
  leaderListEl.innerHTML="<ol>"+arr.slice(0,20).map(d=>
   `<li>${d.name} — <b>${d.score}</b> điểm (${d.phe==="chipheo"?"Chí Phèo":"Lão Hạc"})</li>`
  ).join("")+"</ol>";
 });
}

function promptReset(){
 const code=prompt("Nhập mã GV:");
 if(code===RESET_CODE){
  db.ref("scores").remove();
  alert("Đã reset bảng xếp hạng");
 }else{
  alert("Sai mã");
 }
}

/* expose */
window.confirmName=confirmName;
window.startGame=startGame;
window.promptReset=promptReset;
