document.getElementById("life-expectancy").onsubmit = function(event) {
    event.preventDefault(); 
    // フォームの値を取得する
    const gender = document.getElementById("gender").value;
    const dob = new Date(document.getElementById("dob").value);
    const smoking = document.getElementById("smoking").value;
    const drinking = document.getElementById("drinking").value;
    // HTML要素を取得する
    const timeLeft = document.getElementById("timeLeft");
    const endTime = document.getElementById("endTime");
    // 予想寿命を計算する 
    const lifeExpectancy = calculate(gender, smoking, drinking);
    // カウントダウンをする
    countdown(lifeExpectancy, dob);
    // フォームを隠す
    document.getElementById("life-expectancy").classList.add("hidden");
    // ヒントを表示する
    if (smoking == "yes") {
        document.getElementById("smoking-tip").classList.remove("hidden");
        document.getElementById("smoking-tip").classList.add("show");
    }
    if (drinking == "yes") {
        document.getElementById("drinking-tip").classList.remove("hidden");
        document.getElementById("smoking-tip").classList.add("show");
    }
}
// 予想寿命を計算する関数
function calculate(gender, smoking, drinking) {
    // 厚生労働省　令和３年簡易生命表の概況　主な年齢の平均余命 
    // https://www.mhlw.go.jp/toukei/saikin/hw/life/life21/dl/life18-02.pdf
    let result = 0;
    if (gender == "male") {result = 81.47;}
    else if (gender == "female") {result = 87.57;}
    //　喫煙の影響
    // Center for Disease Control and Prevention (CDC)
    //https://www.cdc.gov/tobacco/data_statistics/fact_sheets/health_effects/tobacco_related_mortality/index.htm#:~:text=Cigarette%20smoking%20causes%20premature%20death,years%20shorter%20than%20for%20nonsmokers.&text=Quitting%20smoking%20before%20the%20age,related%20disease%20by%20about%2090%25.
    if (smoking == "yes") {result -= 10.0;}
    // 飲酒の影響
    // Scientific Reports
    //https://www.nature.com/articles/s41598-022-11427-x#:~:text=In%20conclusions%2C%20modest%20drinkers%2C%20no,65%E2%80%9380%25)%20of%20drinkers.
    if (drinking == "negative") {result -= 7.0;}
    else if (drinking == "positive") {result += 1.0;}
    return result;
}
// カウントダウンをする関数
function countdown(year,dob) {
    //「終わる日」を計算する
    const milli = year * 365 * 24 * 60 * 60 * 1000;
    const now = new Date().valueOf();
    const end = dob.valueOf() + milli;
    // 「終わる日」の表示も可能
    /*endTime.textContent = new Date(end).toLocaleString();*/
    const secondsLeft = Math.round((end - Date.now()) / 1000);
    displayTimeLeft(secondsLeft);
    // カウントダウンをする
    setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);
        displayTimeLeft(secondsLeft);
    },1000);
}
// 残り時間を表示する関数
function displayTimeLeft(secondsLeft) {
    const days = Math.floor(secondsLeft / 24 / 60 / 60);
    secondsLeft = secondsLeft % 86400;
    const hours = Math.floor(secondsLeft / 60 / 60);
    secondsLeft = secondsLeft % 3600;
    const minutes = Math.floor(secondsLeft / 60);
    secondsLeft = secondsLeft % 60;
    const seconds = secondsLeft;
    //数字を2桁にする
    const display = `${days}日${hours < 10 ? "0" : ""}${hours}時間${minutes < 10 ? "0" : ""}${minutes}分${seconds < 10 ? "0" : ""}${seconds}秒`;
    timeLeft.textContent = display;
}
