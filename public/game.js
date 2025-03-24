var moneyDom = document.getElementById("money");
var netWorthDom = document.getElementById("net-worth");
var money = Number(moneyDom.innerHTML);
function updateMoney(amount) {
    money = amount;
    moneyDom.innerHTML = Math.round(money);
}
function netWorth() { 
    var net = money
    for (let i = 0; i < stocks.length; i++) {
        net += stocks[i] * stockShares[i]; 
        if (stockShares[i] >= 5) {
            document.getElementById("warning").innerHTML = "You should spread out your money across more stocks";
        }
    }
    netWorthDom.innerHTML = Math.round(net);
}
function updateStock(stock, name, ind) {
    graph = document.getElementById(name + "-canvas");
    
    stock += ((Math.random()-0.5)*10);
    if (stock < 1) { stock = 1; }
    else if (stock > 500) { stock = 500; }
    document.getElementById(name).innerHTML = Math.round(stock);
    document.getElementById(name + "-almount").innerHTML = stockShares[ind];
    return stock;
}
function buyStock(stock, share) {
    if (money < stock) { return share; }
    updateMoney(money - stock);
    return share + 1;
}
function SellAll() {
    for (let i = 0; i < stocks.length; i++) {
        updateMoney(money + stocks[i] * stockShares[i]);
        stockShares[i] = 0;
    }
}

var stockShares = [0, 0, 0, 0, 0, 0];
var stocks = [Math.random()*150+20, Math.random()*150+20, Math.random()*150+20, Math.random()*150+20, Math.random()*150+20, Math.random()*150+20];
var stockNames = ["Tesla", "Nvidia", "Netflix", "Microsoft", "Apple", "Bitcoin"];
var fileExt = ["png", "png", "jpg", "jpg", "jpg", "png"];

stockDom = document.getElementById("stocks");
for (let i = 0; i < stocks.length; i++) {
    let T = document.createElement("div");
    T.className = "stock";
    function temp() {
        stockShares[i] = buyStock(stocks[i], stockShares[i]);
    }
    function temp2() {
        if (stockShares[i] > 0) {
            updateMoney(money + stocks[i]);
            stockShares[i] -= 1;
        }
    }
    T.innerHTML = `<img src="${stockNames[i]}.${fileExt[i]}"><div class="container"><h4><b>${stockNames[i]}</b></h4><p id="${stockNames[i]}"></p><span class="buySsell"><button class="buy" id="buy-${stockNames[i]}">buy</button><button class="sell" id="sell-${stockNames[i]}">sell</button></span><p id="${stockNames[i]}-almount"class="almount"></p></div>`;
    stockDom.appendChild(T);

    document.getElementById("buy-" + stockNames[i]).addEventListener("click", temp);
    document.getElementById("sell-" + stockNames[i]).addEventListener("click", temp2);
}


setInterval(() => {
    for (let i = 0; i < stocks.length; i++) {
        stocks[i] = updateStock(stocks[i], stockNames[i], i);
    }
    netWorth();
}, 500);