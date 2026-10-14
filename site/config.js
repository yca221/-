/* =====================================================================
   Firebase 設定：把你自己 Firebase 專案的設定貼在這裡（只要改這個檔案）
   ---------------------------------------------------------------------
   取得方式：Firebase 主控台 → 齒輪 ⚙️ → 專案設定 → 一般 → 您的應用程式
            → 找到 firebaseConfig = { ... }，把裡面的值貼到下面。

   還沒貼（仍是 PASTE_ 開頭）的話，網頁會自動用「本機測試模式」：
   學生一樣可以完整作答，只是錄音不會上傳，會改成讓學生自己下載。
   ===================================================================== */
window.FIREBASE_CONFIG = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT",
  storageBucket: "PASTE_YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID",
};

/* 可以登入「老師後台 teacher.html」聽錄音的 Google 帳號（可以放好幾個）
   ⚠️ 這裡只決定後台畫面給誰看；真正擋住別人的是 Firebase 的安全規則
      （firestore.rules / storage.rules 裡也要填一樣的 Email）。 */
window.TEACHER_EMAILS = [
  "PASTE_TEACHER_EMAIL@gmail.com",
];
