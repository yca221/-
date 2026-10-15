/* =====================================================================
   Firebase 設定：把你自己 Firebase 專案的設定貼在這裡（只要改這個檔案）
   ---------------------------------------------------------------------
   取得方式：Firebase 主控台 → 齒輪 ⚙️ → 專案設定 → 一般 → 您的應用程式
            → 找到 firebaseConfig = { ... }，把裡面的值貼到下面。

   還沒貼（仍是 PASTE_ 開頭）的話，網頁會自動用「本機測試模式」：
   學生一樣可以完整作答，只是錄音不會上傳，會改成讓學生自己下載。
   ===================================================================== */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyBaaxF6pP_rA26Q5VXCK2I-1t9q4FHMhJ4",
  authDomain: "geptkidsg6.firebaseapp.com",
  projectId: "geptkidsg6",
  storageBucket: "geptkidsg6-recordings",
  messagingSenderId: "190203845657",
  appId: "1:190203845657:web:34c0caad12e53af3955e88",
};

/* 可以登入「老師後台 teacher.html」聽錄音的 Google 帳號（可以放好幾個）
   ⚠️ 這裡只決定後台畫面給誰看；真正擋住別人的是 Firebase 的安全規則
      （firestore.rules / storage.rules 裡也要填一樣的 Email）。 */
window.TEACHER_EMAILS = [
  "y.ca221@gmail.com",
];
