# 🎤 GEPT Kids 小學英檢・口說練習網站

學生打開網址 → 填班級座號姓名 → 測試麥克風 → 跟著電腦考官完成口說測驗 → 錄音自動存到老師的 Firebase 後台。
老師打開 `teacher.html` 用 Google 帳號登入，就能依班級、姓名找到每位學生、逐題聽錄音。

> 題目是依照小學英檢口說測驗的架構（暖身問答／朗讀句子・看圖回答／看圖說故事／回答問題，約 10 分鐘）**自行編寫的練習題**，不是官方試題。準備／作答秒數也是練習用的設定，可以自由調整。

## 檔案說明

| 檔案 | 用途 | 需要改嗎？ |
|---|---|---|
| `site/index.html` | 學生作答頁 | 不用 |
| `site/teacher.html` | 老師後台（聽錄音） | 不用 |
| `site/config.js` | **Firebase 設定、老師 Email** | ✅ 要貼上自己的 |
| `site/questions.js` | **題目、秒數、圖片** | 想換題目時改這裡 |
| `site/images/` | 放自己的圖片（可不用） | 選用 |
| `firestore.rules`、`storage.rules` | 後台安全規則（貼到 Firebase 主控台） | ✅ 要填老師 Email |
| `netlify.toml` | 讓 Netlify 知道網站在 `site` 資料夾 | 不用 |

## 流程

### 1️⃣ 先試用（還不用後台）
`config.js` 還沒填的時候，網頁會進入「🧪 本機測試模式」：整個測驗都能做，只是錄音不上傳，最後會讓你下載音檔試聽。
直接部署到 Netlify（見步驟 3）就能在手機上試；麥克風只能在 `https://` 網址下使用。

### 2️⃣ 建立 Firebase 後台
1. 到 <https://console.firebase.google.com> → **新增專案**（Google Analytics 可以不開）。
2. **升級 Blaze 方案**：現在新專案要用 Firestore 和 Storage 都必須綁信用卡（Blaze）。
   小班級的用量通常在免費額度內，但 Blaze **沒有自動上限**，請一定要到
   <https://console.cloud.google.com/billing> →「預算與快訊」設一個預算提醒（例如 NT$100）。
3. **Firestore Database** → 建立資料庫 → 位置選 `asia-east1`（台灣）→ 先選「正式版模式」。
4. **Storage** → 開始使用 → 同樣選 `asia-east1`。
5. **Authentication** → 開始使用 → 登入方式 → 啟用 **Google**（老師後台登入用）。
6. 齒輪 ⚙️ → 專案設定 → 一般 → 「您的應用程式」按 `</>` 新增網頁應用程式，
   把出現的 `firebaseConfig` 內容貼到 **`site/config.js`**，並把 `TEACHER_EMAILS` 改成你的 Gmail。
7. **安全規則**：
   - 打開本專案的 `firestore.rules`，把 `PASTE_TEACHER_EMAIL@gmail.com` 改成你的 Gmail，整段複製貼到 Firestore →「規則」→ 發布。
   - `storage.rules` 一樣處理，貼到 Storage →「規則」→ 發布。

   這套規則的效果：學生**只能上傳**、看不到別人的資料；只有老師帳號可以讀取、聽錄音、刪除。

### 3️⃣ 部署上線（Netlify，免指令）
**方法 A：拖拉上傳**
1. 到 <https://app.netlify.com/drop>（先註冊/登入）。
2. 把整個 **`site` 資料夾**拖進去（不是拖單一檔案）。
3. 取得網址，例如 `https://xxx.netlify.app` → 把這個網址給學生。

**方法 B：連結 GitHub（之後改題目會自動更新）**
Netlify → Add new site → Import an existing project → 選這個 GitHub repo → 直接 Deploy（`netlify.toml` 已經設定好）。

部署後最後一步：Firebase → Authentication → 設定 → **授權網域** → 加入 `xxx.netlify.app`，否則老師後台無法登入。

- 學生作答：`https://xxx.netlify.app/`
- 老師後台：`https://xxx.netlify.app/teacher.html`

## 錄音存在哪裡？
- **Storage**：`recordings/測驗代號/班級/日期時間_座號_姓名/P1-1.webm` …（每題一個檔）
- **Firestore**：`submissions` 集合，每位學生一筆（班級、座號、姓名、作答時間、每題檔案路徑與秒數）

老師後台會自動整理好；也可以直接在 Firebase 主控台的 Storage 裡下載檔案。

## 修改題目
打開 `site/questions.js`，照著裡面的說明改：
- `say`：電腦考官唸出來的英文
- `text`：螢幕上顯示的句子（朗讀題用）
- `picture` / `pictures`：圖片（預設是用表情符號拼的場景，可換成 `{ src: "images/xxx.jpg" }`）
- `prep` / `answer`：準備秒數 / 作答秒數
- `TEST_CONFIG.maxRetries`：每題可重錄次數（設 `0` 就跟正式考試一樣不能重錄）
- 換一套新題目時，把 `testId` 改成新的名字，後台會分開顯示。

## 常見問題
| 狀況 | 解法 |
|---|---|
| 麥克風不能用 | 一定要用 `https://` 網址；在 LINE / FB 裡打開的話，改用 Chrome 或 Safari 開啟；網址列旁 🔒 → 麥克風改「允許」。 |
| 聽不到電腦考官的聲音 | 檢查音量／靜音鍵；可在 `questions.js` 設 `showQuestionText: true` 讓題目同時顯示文字。 |
| 學生完成後顯示「上傳沒有成功」 | 先按「再試一次上傳」；仍失敗就請學生下載音檔交給老師。錯誤訊息若是 `permission-denied`/`unauthorized`，檢查安全規則是否正確發布。 |
| 老師後台出現 `unauthorized-domain` | Authentication → 設定 → 授權網域，加入 Netlify 網址。 |
| 老師後台讀不到資料 | 確認 `config.js` 和兩份 rules 裡的 Email 一模一樣。 |
| Netlify 出現 Page not found | 拖拉時要拖整個 `site` 資料夾，裡面要有 `index.html`。 |
| Firestore 說 requires billing | 專案要先升級 Blaze 方案（見步驟 2）。 |
