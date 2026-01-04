const fs = require('fs');
const path = require('path');

// 1. 設定你的卡牌圖片資料夾路徑 (相對於此腳本)
const cardsDir = path.join(__dirname, 'images/BQcards/cards_front');
// 2. 設定輸出的資料檔案名稱
const outputFile = path.join(__dirname, 'cardData.js');

try {
    // 讀取資料夾內所有檔案
    const files = fs.readdirSync(cardsDir);

    // 初始化數據結構
    const bqCardData = {
        "RW": [],
        "JN": [],
        "WP": [],
        "JK": []
    };

    // 過濾出 .png 檔案並進行分類
    files.forEach(file => {
        if (file.toLowerCase().endsWith('.png')) {
            const fileNameNoExt = file.replace(/\.[^/.]+$/, ""); // 去掉 .png 後綴
            
            // 根據檔名前綴 (RW-, JN-, WP-, JK-) 進行分類
            const prefix = fileNameNoExt.split('-')[0].toUpperCase();
            if (bqCardData[prefix]) {
                bqCardData[prefix].push(fileNameNoExt);
            }
        }
    });

    // 將結果轉化為可供網頁讀取的 JS 檔案內容
    // 我們將它存成一個全局變數，這樣 index.html 就能直接用
    const content = `// 自動生成的卡牌數據 - 產生於 ${new Date().toLocaleString()}
const bqCardData = ${JSON.stringify(bqCardData, null, 4)};

// 如果有使用 ES Module，也可以解開下一行
// export default bqCardData;`;

    fs.writeFileSync(outputFile, content, 'utf8');
    console.log('✅ 成功！卡牌數據已更新至 cardData.js');
    console.log(`📊 統計：人物(RW): ${bqCardData.RW.length}, 技能(JN): ${bqCardData.JN.length}, 物品(WP): ${bqCardData.WP.length}, 紀念(JK): ${bqCardData.JK.length}`);

} catch (err) {
    console.error('❌ 出錯了：', err.message);
}