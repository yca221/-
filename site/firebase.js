/* 共用的 Firebase 載入程式（學生頁、老師後台都會用到，不需要修改） */
const VERSION = "10.12.2";
const BASE = `https://www.gstatic.com/firebasejs/${VERSION}`;

// 開發測試用：在本機網址加 ?emu=1 會連到 Firebase 模擬器，不會動到真正的後台
const EMU = ["localhost", "127.0.0.1"].includes(location.hostname)
  && new URLSearchParams(location.search).has("emu");

export const firebaseReady = () => {
  const k = window.FIREBASE_CONFIG?.apiKey;
  return !!k && !String(k).startsWith("PASTE");
};

let core = null, authPromise = null;

export async function loadFirebase({ auth = false } = {}) {
  core ||= (async () => {
    const [appM, fs, st] = await Promise.all([
      import(`${BASE}/firebase-app.js`),
      import(`${BASE}/firebase-firestore.js`),
      import(`${BASE}/firebase-storage.js`),
    ]);
    const app = appM.initializeApp(window.FIREBASE_CONFIG);
    const db = fs.getFirestore(app), storage = st.getStorage(app);
    if (EMU) {
      fs.connectFirestoreEmulator(db, "localhost", 8080);
      st.connectStorageEmulator(storage, "localhost", 9199);
    }
    return { app, db, storage, fs, st, emu: EMU };
  })();
  const fb = await core;
  if (auth) {
    authPromise ||= (async () => {
      const au = await import(`${BASE}/firebase-auth.js`);
      const a = au.getAuth(fb.app);
      if (EMU) au.connectAuthEmulator(a, "http://localhost:9099", { disableWarnings: true });
      fb.au = au; fb.auth = a;
    })();
    await authPromise;
  }
  return fb;
}

/* 等登入狀態確定（重新整理後 Firebase 需要一點時間還原登入） */
export function waitForUser(fb) {
  return new Promise(resolve => {
    const off = fb.au.onAuthStateChanged(fb.auth, u => { off(); resolve(u); });
  });
}
