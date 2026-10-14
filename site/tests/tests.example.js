/* =====================================================================
   「跟網站一起部署的試題」格式範例
   用法：把這個檔案複製一份改名為 tests.js，照下面的格式填題目，
        圖片放在 tests/試題資料夾/ 裡。
   學生網址：網站網址/?test=試題代號
   （也可以不用這個檔案，直接在老師後台的「試題管理」建立試題）
   ===================================================================== */
window.BUILTIN_TESTS = (window.BUILTIN_TESTS || []).concat([
  {
    id: "my-test-1",                      // 試題代號（英文、數字、- 組成，網址會用到）
    title: "口說模擬測驗 第 1 回",         // 學生看到的名稱
    config: {
      voiceRate: 0.85,                    // 電腦語音速度
      maxRetries: 0,                      // 每題可重錄幾次
      allowReplay: true,                  // 準備時間可以「再聽一次」
      showQuestionText: false,            // 題目文字也顯示在螢幕上
      outro: "Thank you. This is the end of the test. Goodbye.",   // 結束時考官說的話
    },
    parts: [
      {
        title: "第一部分：暖身、問候",
        titleEn: "Part 1 · Warm-up",
        intro: "給學生看的中文說明",
        items: [
          // say：考官說的話（{greeting} 會自動變成 Good morning / Good afternoon）
          { id: "P1-1", say: "{greeting}. How are you today?", prep: 0, answer: 8 },
        ],
      },
      {
        title: "第二部分：朗讀句子",
        items: [
          {
            id: "P2-1",
            say: "First, just look at the sentences.",
            text: "1. 第一句\n2. 第二句",                 // 螢幕上的文字（\n = 換行）
            picture: { src: "tests/my-test-1/picture.jpg" },
            prep: 15,                                        // 準備秒數
            cue: "Now, read the sentences aloud.",           // 準備時間結束後考官說的話
            answer: 30,                                      // 錄音秒數
          },
        ],
      },
      {
        title: "第三部分：看圖說話",
        items: [
          {
            id: "P3-1",
            say: "Look at the four pictures.",
            hint: "小提示",
            pictures: [                                      // 多張圖 → 排成連環圖
              { src: "tests/my-test-1/story-1.jpg" },
              { src: "tests/my-test-1/story-2.jpg" },
            ],
            prep: 15, answer: 60,
          },
        ],
      },
    ],
  },
]);
