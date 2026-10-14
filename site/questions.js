/* =====================================================================
   題目設定檔（老師可以直接修改這個檔案來換題目）
   ---------------------------------------------------------------------
   每一題可以設定：
     say     ：電腦會用英文「唸出來」的內容（像考官在說話）
     text    ：顯示在螢幕上的文字（例如要學生朗讀的句子）
     hint    ：顯示在螢幕上的小提示（中文或英文都可以）
     picture ：一張圖（用表情符號拼出來的場景，或改成 src 指定圖片檔）
     pictures：多張圖（看圖說故事用，會排成 2x2 連環圖）
     prep    ：準備時間（秒）
     answer  ：作答 / 錄音時間（秒）

   想用自己的圖片：把圖片放進 images 資料夾，然後把 picture 改成
       picture: { src: "images/park.jpg" }
   檔名大小寫要完全一樣喔！
   ===================================================================== */

window.TEST_CONFIG = {
  testId: "gept-kids-speaking-01",      // 測驗代號：換一份題目時改一下，後台會分開放
  title: "GEPT Kids 小學英檢・口說練習",
  voiceRate: 0.85,                      // 電腦唸題目的速度（1 = 正常，越小越慢）
  maxRetries: 1,                        // 每題可以重錄幾次（0 = 像正式考試一樣不能重錄）
  allowReplay: true,                    // 準備時間內可以按「再聽一次」（每題一次）
  showQuestionText: false,              // true = 把考官說的英文題目也顯示在螢幕上
};

window.TEST_PARTS = [
  {
    id: "P1",
    title: "第一部分：暖身問答",
    titleEn: "Part 1 · Warm-up",
    intro: "電腦考官會用英文問你幾個簡單的問題。聽完題目後，聽到「嗶」一聲，就開始用英文回答。",
    items: [
      { id: "P1-1", say: "Hello! What's your name?", prep: 2, answer: 10 },
      { id: "P1-2", say: "How old are you?", prep: 2, answer: 10 },
      { id: "P1-3", say: "What grade are you in?", prep: 2, answer: 10 },
    ],
  },
  {
    id: "P2A",
    title: "第二部分 A：朗讀句子",
    titleEn: "Part 2A · Read Aloud",
    intro: "螢幕上會出現一個英文句子。先在準備時間內默念一次，聽到「嗶」一聲後，大聲、清楚地把句子唸出來。",
    items: [
      { id: "P2A-1", say: "Please read the sentence.", text: "I have a red bike.", prep: 10, answer: 15 },
      { id: "P2A-2", say: "Please read the sentence.", text: "My sister likes to sing and dance.", prep: 10, answer: 15 },
      { id: "P2A-3", say: "Please read the sentence.", text: "Can you help me find my bag?", prep: 10, answer: 15 },
    ],
  },
  {
    id: "P2B",
    title: "第二部分 B：看圖回答",
    titleEn: "Part 2B · Picture Questions",
    intro: "請看圖片。電腦考官會問你關於圖片的問題，聽到「嗶」一聲後，用英文回答。",
    items: [
      { id: "P2B-1", say: "Look at the picture. What is the boy doing?", picture: "park", prep: 5, answer: 10 },
      { id: "P2B-2", say: "What is the girl doing?", picture: "park", prep: 5, answer: 10 },
      { id: "P2B-3", say: "How is the weather?", picture: "park", prep: 5, answer: 10 },
    ],
  },
  {
    id: "P3",
    title: "第三部分：看圖說故事",
    titleEn: "Part 3 · Picture Story",
    intro: "螢幕上有四張連環圖。準備時間內先想一想發生了什麼事，聽到「嗶」一聲後，用英文把故事從第 1 張說到第 4 張。",
    items: [
      {
        id: "P3-1",
        say: "Look at the four pictures. Tell the story.",
        hint: "可以這樣開始：This is Amy. It is Saturday morning…",
        pictures: ["wakeUp", "breakfast", "walkDog", "rain"],
        prep: 30,
        answer: 60,
      },
    ],
  },
  {
    id: "P4",
    title: "第四部分：回答問題",
    titleEn: "Part 4 · Questions About You",
    intro: "電腦考官會問一些關於你自己的問題。請盡量用完整的句子回答，可以多說一點喔！",
    items: [
      { id: "P4-1", say: "What do you usually eat for breakfast?", prep: 5, answer: 20 },
      { id: "P4-2", say: "What do you like to do on weekends?", prep: 5, answer: 20 },
      { id: "P4-3", say: "What is your favorite animal? Why do you like it?", prep: 5, answer: 20 },
    ],
  },
];

/* =====================================================================
   圖片庫：用表情符號拼成的場景（x、y 是位置百分比，s 是大小）
   不想用表情符號的話，可以改成 { src: "images/檔名.jpg" }
   ===================================================================== */
window.TEST_PICTURES = {
  park: {
    bg: "linear-gradient(#BFE6FF 0 55%, #A8E07A 55%)",
    items: [
      { e: "☀️", x: 86, y: 16, s: 14 },
      { e: "☁️", x: 52, y: 14, s: 12 },
      { e: "🌳", x: 18, y: 46, s: 30 },
      { e: "👧", x: 24, y: 76, s: 14 },
      { e: "📖", x: 34, y: 80, s: 8 },
      { e: "👦", x: 60, y: 68, s: 15 },
      { e: "⚽", x: 72, y: 84, s: 8 },
      { e: "🐕", x: 88, y: 78, s: 12 },
    ],
  },
  wakeUp: {
    bg: "linear-gradient(#FFF1D6 0 70%, #E9C9A0 70%)",
    items: [
      { e: "🪟", x: 18, y: 24, s: 18 },
      { e: "☀️", x: 18, y: 22, s: 9 },
      { e: "⏰", x: 80, y: 24, s: 16 },
      { e: "🛏️", x: 45, y: 72, s: 34 },
      { e: "👧", x: 42, y: 50, s: 18 },
    ],
  },
  breakfast: {
    bg: "linear-gradient(#FFF7E6 0 62%, #F3D9B1 62%)",
    items: [
      { e: "👧", x: 30, y: 52, s: 22 },
      { e: "🍞", x: 62, y: 66, s: 14 },
      { e: "🥛", x: 80, y: 62, s: 14 },
      { e: "🍳", x: 70, y: 82, s: 10 },
    ],
  },
  walkDog: {
    bg: "linear-gradient(#CDEBFF 0 55%, #A8E07A 55%)",
    items: [
      { e: "🌳", x: 84, y: 44, s: 28 },
      { e: "👧", x: 34, y: 66, s: 18 },
      { e: "🐕", x: 58, y: 76, s: 15 },
      { e: "🌼", x: 12, y: 86, s: 8 },
    ],
  },
  rain: {
    bg: "linear-gradient(#9FB3C8 0 55%, #7FA36A 55%)",
    items: [
      { e: "🌧️", x: 28, y: 16, s: 16 },
      { e: "🌧️", x: 66, y: 14, s: 14 },
      { e: "🏃‍♀️", x: 34, y: 66, s: 18 },
      { e: "🐕", x: 56, y: 74, s: 13 },
      { e: "🏠", x: 84, y: 58, s: 24 },
    ],
  },
};
