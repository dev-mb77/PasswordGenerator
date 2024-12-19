const resultEle = document.getElementById('result');
const lengthEle = document.getElementById('length');
const uppercase1 = document.getElementById('uppercase');
const lowercase1 = document.getElementById('lowercase');
const number1 = document.getElementById('number');
const symbol1 = document.getElementById('symbol');
const generate1 = document.getElementById('generate');
const clipboard1 = document.getElementById('clipboard');

const randomFun = {
    
        lower: getRandomLowercase,
        upper: getRandomUppercase,
        symbol: getRandomSymbols,
        number: getRandomNumber

}

generate1.addEventListener("click", () => {
    const length = lengthEle.value;
    const hasLower = lowercase1.checked;
    const hasUpper = uppercase1.checked;
    const hasSymbol = symbol1.checked;
    const hasNumber = number1.checked;
    resultEle.innerText = generatePassword(hasLower, hasUpper, hasSymbol, hasNumber, length)
});

function generatePassword(lower, upper, symbol, number, length) {
    let generatedPassword = '';
    let typecount = lower + upper + number + symbol;
    const typeArr = [{ lower }, { upper }, { symbol }, { number }].filter((item) => Object.values(item)[0]);

    if (typecount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typecount) {
        typeArr.forEach((type) => {
            const keyfromrandomFun = Object.keys(type)[0];
            generatedPassword += randomFun[keyfromrandomFun]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

clipboard1.addEventListener("click", ()=>{
    const copyText = resultEle.innerText;
     const textarea = document.createElement("textarea");
     textarea.value = copyText; 
     document.body.appendChild(textarea); 
     textarea.select();
     document.execCommand("copy");
     //navigator.clipboard.writeText(copyText.value);
     document.body.removeChild(textarea);
     alert("Password copied to clipboard!:");
  });
 
function getRandomLowercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUppercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbols() {
    const symbols = "!@#%^&*()-+{}[]<>=.";
    return symbols[Math.floor(Math.random() * symbols.length)];
}
