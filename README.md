# תרגיל 8 - פעולות אסינכרוניות ב-Node.js עם Callbacks (+ עבודה עם Git Branches) 🌿

15 תרגילים קצרים עם המודולים המובנים של Node.js: `fs`, `path`, `os` והטיימרים `setTimeout` / `setInterval`.
בכל התרגילים עובדים **רק עם callbacks**.

והפעם יש עוד דבר חדש: **כל תרגיל נמצא ב-branch משלו בגיט.** פותרות תרגיל, מריצות טסטים, עושות `commit`, עוברות ל-branch הבא. בסוף ממזגות (`merge`) את כל ה-branches ל-`main`, מריצות את כל הטסטים ביחד ודוחפות (`push`) הכל ל-GitHub.

## חוקים לכל התרגילים

- כל הפעולות על קבצים ותיקיות נעשות עם הפונקציות **האסינכרוניות בסגנון callback**: `fs.readFile`, `fs.stat`, `fs.readdir`, `fs.lstat`, `fs.appendFile`, `fs.mkdir`, `fs.access`, `fs.unlink`, `fs.writeFile`.
- **אסור** להשתמש בפונקציות Sync (`readFileSync` וכו'), ב-Promises (`fs.promises`, `.then`, `new Promise`) או ב-`async/await`.
- `path` משמש רק לעבודה עם נתיבים (אין לו דרישה של אסינכרוניות).
- `setTimeout` ו-`setInterval` הם טיימרים מבוססי callback.
- כל תרגיל הוא קובץ נפרד (`ex01.js` ... `ex15.js`) שמריצים עם `node exNN.js`.
- כשקוראים או יוצרים קובץ, בונים את הנתיב עם `path.join(__dirname, "שם-הקובץ")`, כך שהקובץ תמיד נמצא באותה תיקייה של התרגיל.
- את ההודעות מדפיסים **בדיוק** כמו בדוגמאות (כולל נקודה בסוף). הטסטים בודקים אותן.

## איך מתחילים

1. לוחצות למעלה על **Use this template** ← **Create a new repository**.
   ⚠️ **חובה לסמן את התיבה `Include all branches`**. בלי זה יגיע רק `main`, בלי התרגילים.
2. עושות `git clone` לריפו החדש ופותחות אותו ב-VS Code.
3. בטרמינל מריצות פעם אחת: `npm install` (צריך Node בגרסה 20 ומעלה. בודקות עם `node -v`).
4. רואות את כל ה-branches של התרגילים:
   ```bash
   git branch -a
   ```

## סדר העבודה - תרגיל אחרי תרגיל

לכל תרגיל יש branch משלו. בכל branch יש את קובץ התרגיל (`exNN.js`), את הטסטים שלו, ואת הקבצים שהוא צריך (למשל `sample.txt`).

| # | Branch | קובץ | נושא |
|---|---|---|---|
| 1 | `ex01-file-reader` | `ex01.js` | קריאת קובץ + גודל ותאריך יצירה |
| 2 | `ex02-directory-files` | `ex02.js` | רק הקבצים בתיקייה (בלי תיקיות) |
| 3 | `ex03-countdown` | `ex03.js` | ספירה לאחור עם רקורסיה + `setTimeout` |
| 4 | `ex04-random-line` | `ex04.js` | שורה אקראית מקובץ |
| 5 | `ex05-memory-logger` | `ex05.js` | אחוז זיכרון פנוי כל 2 שניות |
| 6 | `ex06-append-log` | `ex06.js` | הוספת שורה לקובץ לוג |
| 7 | `ex07-create-folder` | `ex07.js` | יצירת תיקייה אם היא לא קיימת |
| 8 | `ex08-delete-file` | `ex08.js` | מחיקת קובץ בבטחה |
| 9 | `ex09-cpu-models` | `ex09.js` | מודל המעבד של כל ליבה |
| 10 | `ex10-message-chain` | `ex10.js` | שרשרת הודעות עם `setTimeout` מקוננים |
| 11 | `ex11-folder-size` | `ex11.js` | סכום הגדלים של הקבצים בתיקייה |
| 12 | `ex12-file-extension` | `ex12.js` | בדיקת סיומת של קובץ |
| 13 | `ex13-uptime` | `ex13.js` | כמה זמן המחשב פועל |
| 14 | `ex14-random-countdown` | `ex14.js` | ספירה לאחור עם השהיות אקראיות |
| 15 | `ex15-create-file` | `ex15.js` | יצירת קובץ רק אם הוא לא קיים |

### בכל תרגיל עושות את אותם 4 צעדים

```bash
# 1. עוברות ל-branch של התרגיל
git checkout ex01-file-reader

# 2. כותבות את הקוד ב-ex01.js, מריצות אותו ובודקות
node ex01.js
npm test

# 3. כשהטסטים ירוקים - שומרות ב-commit
git add .
git commit -m "ex01 done"

# 4. עוברות לתרגיל הבא
git checkout ex02-directory-files
```

כשהתרגיל עובר, `npm test` מדפיס בדיוק את הפקודות של הצעדים 3-4, כולל השם של ה-branch הבא.

> 💡 `git checkout` לא עובד כשיש שינויים שעוד לא שמרתן ב-commit. קודם `add` + `commit`, אחר כך מחליפות branch.

### צעד אחרון: merge של כל התרגילים ל-main ו-push

אחרי ה-commit של תרגיל 15:

```bash
# 1. חוזרות ל-main
git checkout main

# 2. ממזגות את ה-branches של התרגילים לתוך main, אחד אחרי השני
git merge --no-edit --allow-unrelated-histories ex01-file-reader
git merge --no-edit --allow-unrelated-histories ex02-directory-files
git merge --no-edit --allow-unrelated-histories ex03-countdown
git merge --no-edit --allow-unrelated-histories ex04-random-line
git merge --no-edit --allow-unrelated-histories ex05-memory-logger
git merge --no-edit --allow-unrelated-histories ex06-append-log
git merge --no-edit --allow-unrelated-histories ex07-create-folder
git merge --no-edit --allow-unrelated-histories ex08-delete-file
git merge --no-edit --allow-unrelated-histories ex09-cpu-models
git merge --no-edit --allow-unrelated-histories ex10-message-chain
git merge --no-edit --allow-unrelated-histories ex11-folder-size
git merge --no-edit --allow-unrelated-histories ex12-file-extension
git merge --no-edit --allow-unrelated-histories ex13-uptime
git merge --no-edit --allow-unrelated-histories ex14-random-countdown
git merge --no-edit --allow-unrelated-histories ex15-create-file

# 3. מריצות את כל הטסטים של כל 15 התרגילים ביחד
npm test

# 4. דוחפות ל-GitHub: קודם main לבד (זה מה שמפעיל את בדיקת כל התרגילים), ואחר כך את כל שאר ה-branches
git push origin main
git push --all origin
```

- `--no-edit` אומר לגיט לא לפתוח עורך טקסט להודעת ה-merge. אם בכל זאת נפתח עורך (vim), כותבות `:wq` ולוחצות Enter.
- למה `--allow-unrelated-histories`? כשיוצרים ריפו מ-template, GitHub נותן לכל branch היסטוריה חדשה משלו, בלי commit משותף עם `main`. בלי הדגל הזה גיט עונה `refusing to merge unrelated histories`. הקבצים המשותפים (README, test) זהים בכל ה-branches, אז לא יהיו קונפליקטים.
- ב-`main` הפקודה `npm test` דורשת שכל 15 התרגילים ימוזגו. אם חסר תרגיל, היא מדפיסה איזה branch עוד לא מוזג.
- למה קודם `main` לבד? כך הבדיקה של `main`, זו שמאשרת את המשימה, תמיד רצה, וגם מגיעה ראשונה.
- אחרי ה-`push`, GitHub מריץ את כל הטסטים של `main` (לשונית **Actions**). וי ירוק ליד ה-commit של `main` = **המשימה אושרה**.

## איך בודקים

```bash
npm test
```

- ב-branch של תרגיל: רצים רק הטסטים של התרגיל הזה. בהתחלה הם אדומים (✘).
- ב-`main` אחרי ה-merge: רצים הטסטים של כל 15 התרגילים.
- מתחת לכל טסט שנכשל כתוב מה לא עבד, ולפעמים גם מה התוכנית שלכן הדפיסה.
- הטסטים מריצים את הקובץ שלכן בדיוק כמו `node exNN.js`, בתוך תיקייה זמנית עם קבצים משלהם. כך הם בודקים שהתוצאה באמת מחושבת מהקבצים ולא כתובה ידנית. הקבצים בתיקייה שלכן לא משתנים.
- כדי שהטסטים לא יחכו שניות שלמות, הטיימרים רצים אצלם מהר יותר. הם עדיין בודקים איזו השהיה ביקשתן (`1000`, `2000`...).
- בטסטים של `os` ושל `Math.random` הטסטים מחליפים את הערכים בערכים ידועים. לכן אל תכתבו מספרים ידנית, חשבו אותם.
- כשהכל ירוק ב-`main` מופיעה ההודעה **✅ המשימה אושרה**.

> אל תשנו את הקבצים בתיקייה `test/`.

---

## תרגיל 1: קריאת קובץ עם נתונים - `ex01.js`

**המטרה:** לקרוא את התוכן של `sample.txt`, **ואחרי** הקריאה להביא ולהדפיס את גודל הקובץ (bytes) ואת תאריך היצירה שלו.

**פונקציות חובה:** `fs.readFile(filePath, callback)`, `fs.stat(filePath, callback)`

**פלט לדוגמה:**
```
File Content:
Hello world, welcome to Node.js!

Size: 35 bytes
Created At: 2025-06-27T15:40:12.000Z
```

רמזים: קוראות עם `"utf8"` כדי לקבל טקסט ולא Buffer. הגודל נמצא ב-`stats.size` ותאריך היצירה ב-`stats.birthtime` (מדפיסים עם `.toISOString()`). את `fs.stat` קוראים **בתוך** ה-callback של `fs.readFile`.

## תרגיל 2: רק הקבצים בתיקייה - `ex02.js`

**המטרה:** להדפיס רק את הקבצים (בלי תיקיות) שבתוך התיקייה `my-folder`.

**פונקציות חובה:** `fs.readdir(directoryPath, callback)`, `fs.lstat(filePath, callback)`, `path.join(dir, item)` (לבניית הנתיב המלא)

צריך לבדוק כל פריט עם `fs.lstat` ולהדפיס רק את אלה ש-`stats.isFile()` שלהם הוא `true`.

**פלט לדוגמה** (הסדר יכול להשתנות):
```
File: index.js
File: notes.txt
File: app.js
```

## תרגיל 3: ספירה לאחור - `ex03.js`

**המטרה:** להדפיס ספירה לאחור מ-5 עד 0, מספר אחד בכל שנייה, עם **רקורסיה + `setTimeout`** (בלי לולאות ובלי `setInterval`).

**פונקציות חובה:** `setTimeout(callback, delay)`

**פלט לדוגמה:**
```
5
4
3
2
1
0
Time's up!
```

## תרגיל 4: שורה אקראית מקובץ - `ex04.js`

**המטרה:** לקרוא את `quotes.txt` עם callback, לפצל לשורות, להתעלם משורות ריקות ולהדפיס שורה אקראית אחת.

**פונקציות חובה:** `fs.readFile(filePath, callback)`

**קובץ לדוגמה (`quotes.txt`):**
```
Stay positive.
Keep learning.
JavaScript is fun!
```

**פלט לדוגמה** (אקראי בכל הרצה):
```
Random Line: Stay positive.
```

רמז: `Math.floor(Math.random() * lines.length)`.

## תרגיל 5: מדידת זיכרון פנוי - `ex05.js`

**המטרה:** כל 2 שניות לחשב ולהדפיס את אחוז הזיכרון הפנוי, ולעצור אחרי 5 הדפסות.

**פונקציות חובה:** `os.freemem()`, `os.totalmem()`, `setInterval(callback, delay)`, `clearInterval(intervalId)`

**פלט לדוגמה:**
```
Free Memory: 73.25%
Free Memory: 72.91%
Free Memory: 72.80%
Free Memory: 72.75%
Free Memory: 72.60%
Memory logging complete.
```

רמז: האחוז הוא `freemem / totalmem * 100`, עם 2 ספרות אחרי הנקודה (`toFixed(2)`). מחשבות אותו מחדש בכל הדפסה.

## תרגיל 6: הוספה לקובץ - `ex06.js`

**המטרה:** להוסיף ל-`log.txt` שורה חדשה עם הזמן הנוכחי.

**פונקציות חובה:** `fs.appendFile(filePath, data, callback)`

צריך:
- לבנות את שורת הלוג עם `new Date().toISOString()`.
- להשתמש ב-`fs.appendFile` כדי להוסיף אותה **כשורה חדשה** ל-`log.txt` (כל הרצה מוסיפה שורה, והשורות הקודמות נשארות).

**פלט לדוגמה (בתוך `log.txt`):**
```
2025-06-28T22:10:15.000Z - Log entry
```

## תרגיל 7: יצירת תיקייה חדשה - `ex07.js`

**המטרה:** ליצור תיקייה בשם `backup` אם היא עוד לא קיימת.

**פונקציות חובה:**
- `fs.access(path, fs.constants.F_OK, callback)` - לבדוק אם `backup` קיימת.
- `fs.mkdir(path, callback)` - ליצור את התיקייה אם היא לא קיימת.
- `path.join(basePath, 'backup')` - לבנות את הנתיב (`basePath` הוא `__dirname`).

**פלט לדוגמה:**
```
Folder created successfully.
```
אם היא כבר קיימת:
```
Folder already exists.
```

## תרגיל 8: מחיקת קובץ בבטחה - `ex08.js`

**המטרה:** למחוק את `temp.txt`, אבל רק אם הקובץ קיים.

**פונקציות חובה:**
- `fs.access(path, fs.constants.F_OK, callback)` - לבדוק אם `temp.txt` קיים.
- `fs.unlink(path, callback)` - למחוק אותו אם נמצא.

**פלט לדוגמה:**
```
File deleted.
```
אם הוא לא נמצא:
```
File not found.
```

כדי לבדוק בעצמכן, צרו קודם `temp.txt` בתיקייה (קובץ חדש ב-VS Code), הריצו פעמיים וראו את שתי ההודעות.

## תרגיל 9: מידע על המעבד - `ex09.js`

**המטרה:** להדפיס את המודל של כל ליבת מעבד.

**פונקציות חובה:** `os.cpus()` - מחזירה מערך של אובייקטים עם מידע על כל ליבה (`cpu.model`).

הערה: `os.cpus()` היא פונקציה סינכרונית, אבל זו קריאה פשוטה למידע על המערכת (בלי I/O). את שאר הקוד כותבים בסגנון callback (למשל פונקציה שמקבלת callback ומעבירה לו את התוצאה).

**פלט לדוגמה:**
```
CPU 0: Intel(R) Core(TM) i7-9750H CPU
CPU 1: Intel(R) Core(TM) i7-9750H CPU
...
```

## תרגיל 10: שרשרת הודעות עם השהיה - `ex10.js`

**המטרה:** להדפיס שלוש הודעות, כל אחת אחרי השהיה של שנייה, עם קריאות `setTimeout` **מקוננות**.

**פונקציות חובה:** `setTimeout(callback, delay)`

צריך: callbacks מקוננים (callback hell), בלי לולאות ובלי Promises.

**פלט לדוגמה:**
```
Message 1
...1 second...
Message 2
...1 second...
Message 3
```

## תרגיל 11: סכום הגדלים של הקבצים בתיקייה - `ex11.js`

**המטרה:** לעבור על הקבצים בתיקייה `data-folder` ולסכום את הגודל הכולל שלהם (בלי תיקיות).

**פונקציות חובה:**
- `fs.readdir(directoryPath, callback)` - לקבל את הפריטים בתיקייה.
- `fs.lstat(filePath, callback)` - לבדוק אם הפריט הוא קובץ ולקבל את הגודל שלו (`stats.size`).
- `path.join(directoryPath, entryName)` - לבנות את הנתיב המלא.

צריך:
- להשתמש ב-`fs.readdir` כדי לקבל את הפריטים.
- לכל פריט לקרוא ל-`fs.lstat` (אסינכרוני).
- לסכום את `stats.size` רק לפריטים ש-`stats.isFile()` שלהם `true`.
- להדפיס את הסכום **פעם אחת**, רק אחרי שכל ה-callbacks של `lstat` הסתיימו (רמז: מונה של כמה callbacks עוד לא חזרו).

**פלט לדוגמה:**
```
Total size: 2345 bytes
```

## תרגיל 12: בדיקת סיומת של קובץ - `ex12.js`

**המטרה:** לבדוק אם `notes.txt` קיים ולהדפיס אם הוא קובץ `.txt`.

**פונקציות חובה:**
- `fs.access(filePath, fs.constants.F_OK, callback)` - לבדוק אם `notes.txt` קיים.
- `path.extname(filePath)` - לבדוק את הסיומת.
- אפשר גם `path.basename(filePath)` - כדי להדפיס את שם הקובץ.

**פלט לדוגמה:**
```
notes.txt is a .txt file.
```
אם הקובץ לא נמצא:
```
File not found.
```

## תרגיל 13: כמה זמן המחשב פועל - `ex13.js`

**המטרה:** להדפיס כמה שניות המערכת פועלת.

**פונקציות חובה:** `os.uptime()` - מחזירה את זמן הפעולה בשניות.

גם כאן זו קריאה סינכרונית למידע על המערכת, אבל כותבים את הקוד בסגנון callback (למשל פונקציה ראשית שמקבלת callback).

**פלט לדוגמה:**
```
System uptime: 52300 seconds
```

## תרגיל 14: ספירה לאחור עם השהיות אקראיות - `ex14.js`

**המטרה:** ספירה לאחור מ-3 עד 0, עם השהיה אקראית בין 500ms ל-1500ms לפני כל מספר.

**פונקציות חובה:** `setTimeout(callback, delay)`, `Math.random()`

צריך:
- רקורסיה או callbacks מקוננים עם `setTimeout` (בלי לולאות).
- בכל צעד לחשב השהיה **חדשה**:
  ```js
  const delay = 500 + Math.random() * 1000;
  ```

**פלט לדוגמה:**
```
3
(wait random time)
2
(wait random time)
1
(wait random time)
0
Done!
```

## תרגיל 15: יצירה וכתיבה של קובץ - `ex15.js`

**המטרה:** ליצור קובץ חדש `data.txt` ולכתוב בו `"Hello Node.js"`, אבל רק אם הקובץ עוד לא קיים.

**פונקציות חובה:**
- `fs.access(filePath, fs.constants.F_OK, callback)` - לבדוק אם `data.txt` קיים.
- `fs.writeFile(filePath, data, callback)` - ליצור ולכתוב לקובץ אם הוא לא קיים.

**פלט לדוגמה:**
```
File created successfully.
```
אם הקובץ כבר קיים:
```
File already exists.
```

---

## בדיקה עצמית

- [ ] כל 15 התרגילים עברו את הטסטים, כל אחד ב-branch שלו, ויש להם `commit`.
- [ ] אין בקוד אף פונקציה עם `Sync`, אין `fs.promises`, אין `.then` ואין `async/await`.
- [ ] כל ה-branches מוזגו ל-`main`, ו-`npm test` ב-`main` מדפיס **✅ המשימה אושרה**.
- [ ] `git push origin main` ואז `git push --all origin` בוצעו, ובלשונית Actions ב-GitHub יש וי ירוק ליד ה-commit של `main`.
