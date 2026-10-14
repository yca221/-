# 🎤 GEPT Kids 小學英檢・口說練習網站

學生打開網址 → 填班級座號姓名 → 測試麥克風 → 跟著考官完成口說測驗 → 錄音自動存到老師的 Firebase 後台。

老師打開 `teacher.html` 用 Google 帳號登入，可以：
- **📝 試題管理**：自己建立很多份口說試題（上傳圖片、考官錄音檔、設定準備/作答秒數），每份試題都有**自己的網址和 QR Code**
- **🎧 學生錄音**：依試題、班級、姓名找到學生，逐題聽錄音

> 內建的範例題是依照小學英檢口說測驗的架構（暖身問答／朗讀句子・看圖回答／看圖說故事／回答問題，約 10 分鐘）**自行編寫的練習題**，不是官方試題。

## 檔案說明

| 檔案 | 用途 | 需要改嗎？ |
|---|---|---|
| `site/index.html` | 學生作答頁 | 不用 |
| `site/teacher.html` | 老師後台（試題管理、聽錄音） | 不用 |
| `site/firebase.js` | 共用的 Firebase 載入程式 | 不用 |
| `site/config.js` | **Firebase 設定、老師 Email** | ✅ 要貼上自己的 |
| `site/questions.js` | 範例題（後台還沒有開放的試題時使用；也是「用小學英檢架構建立」的範本） | 不用 |
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

   這套規則的效果：
   - 學生只能讀「開放中」的試題、只能**上傳**自己的錄音，看不到別人的資料
   - 只有老師帳號可以建立/修改試題、聽錄音、刪除

### 3️⃣ 部署上線（Netlify，免指令）
**方法 A：拖拉上傳**
1. 到 <https://app.netlify.com/drop>（先註冊/登入）。
2. 把整個 **`site` 資料夾**拖進去（不是拖單一檔案）。
3. 取得網址，例如 `https://xxx.netlify.app` → 把這個網址給學生。

**方法 B：連結 GitHub（之後改題目會自動更新）**
Netlify → Add new site → Import an existing project → 選這個 GitHub repo → 直接 Deploy（`netlify.toml` 已經設定好）。

部署後最後一步：Firebase → Authentication → 設定 → **授權網域** → 加入 `xxx.netlify.app`，否則老師後台無法登入。

- 老師後台：`https://xxx.netlify.app/teacher.html`
- 學生作答：在後台「試題管理」按 **🔗 網址 / QR** 取得每份試題的專屬網址（例如 `https://xxx.netlify.app/?test=試題代號`）
- 學生直接打開 `https://xxx.netlify.app/` 的話，會列出所有「開放中」的試題讓學生選

## 錄音存在哪裡？
- **Storage**：`recordings/試題代號/班級/日期時間_座號_姓名/P1-1.webm` …（每題一個檔）
- **Firestore**：`submissions` 集合，每位學生一筆（班級、座號、姓名、作答時間、每題檔案路徑與秒數）
- 試題本身存在 Firestore 的 `tests` 集合；試題用的圖片、考官錄音存在 Storage 的 `test-assets/試題代號/`

老師後台會自動整理好；也可以直接在 Firebase 主控台的 Storage 裡下載檔案。

## 建立自己的模擬試題（老師後台 → 📝 試題管理）
1. 按 **＋ 用小學英檢架構建立**（已經排好四個部分和範例題，改成你的題目就好），或 **＋ 空白試題**。
2. 每一題可以設定：
   - **考官說的話**：電腦會用英文唸出來
   - **🎵 上傳考官錄音**（mp3 / m4a）：有上傳的話就播放這個錄音，不用電腦語音（模擬試題附的音檔可以直接用）
   - **螢幕上的文字**：朗讀題的句子
   - **🖼️ 上傳圖片**：1 張就是看圖回答；2 張以上會自動排成編號的連環圖（看圖說故事用）。手機照片會自動縮小
   - **準備時間 / 作答時間**（秒）
   - 每題可以 ↑↓ 調整順序、複製、刪除；也可以新增或刪除「部分」
3. 上方可設定每題能重錄幾次（0 次 = 跟正式考試一樣）、語音速度等。
4. 勾選下方 **開放給學生作答** → 按 **💾 儲存**。
5. 按 **👀 預覽** 自己先做一次（預覽不會上傳）；按 **🔗 網址 / QR** 把網址或 QR Code 給學生。
6. 試題列表裡可以 **複製一份** 來快速做第 2 回、第 3 回。考完把「開放給學生作答」取消勾選，學生就看不到了。

> 試題被修改後，已經交卷的錄音不受影響（每筆作答都記錄了當時的題目文字）。

## 常見問題
| 狀況 | 解法 |
|---|---|
| 麥克風不能用 | 一定要用 `https://` 網址；在 LINE / FB 裡打開的話，改用 Chrome 或 Safari 開啟；網址列旁 🔒 → 麥克風改「允許」。 |
| 聽不到考官的聲音 | 檢查音量／靜音鍵；可在試題設定勾「題目文字也顯示在螢幕上」，或為每題上傳考官錄音檔。 |
| 學生完成後顯示「上傳沒有成功」 | 先按「再試一次上傳」；仍失敗就請學生下載音檔交給老師。錯誤訊息若是 `permission-denied`/`unauthorized`，檢查安全規則是否正確發布。 |
| 老師後台出現 `unauthorized-domain` | Authentication → 設定 → 授權網域，加入 Netlify 網址。 |
| 老師後台讀不到資料 / 不能儲存試題 | 確認 `config.js` 和兩份 rules 裡的 Email 一模一樣，而且 rules 有按「發布」。 |
| 學生打開網址顯示「試題目前沒有開放」 | 到試題管理勾選「開放給學生作答」並儲存。 |
| Netlify 出現 Page not found | 拖拉時要拖整個 `site` 資料夾，裡面要有 `index.html`。 |
| Firestore 說 requires billing | 專案要先升級 Blaze 方案（見步驟 2）。 |
