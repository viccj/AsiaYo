# AsiaYo
收到request後先檢查進來的參數
檢查的項目有傳進的參數是否為空，是否是數字，以及是否< 0
再來檢查傳進來的code是否是在我們內建的currencies 匯率表內
都沒問題後經過換算的function計算出最後的結果並返回結果