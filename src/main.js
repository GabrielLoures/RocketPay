import "./css/index.css";

import IMask from "imask"; // instala com 'npm install imask' -> biblioteca serve para 

const ccBgColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path');
const ccBgColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path');

const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img');


function setCardType(type) {

  const colors = {
    visa: ["#436D99","#2D57F2"],
    mastercard: ["#C69347", "#DF6F29"],
    default: ["black", "gray"]
  }

  ccBgColor01.setAttribute("fill", colors[type][0]); // setAttribute pega o elemento selecionado pela DOM e muda ele (primeiro argumento vem o que queremos mudar e no segundo colocamos o que queremos setar)
  ccBgColor02.setAttribute("fill", colors[type][1]);

  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setCardType = setCardType; // colocamos a função no globalThis do navegador, para podermos utilizar no console do dev.tools => para executar no browser bastaria digitarmos no 'console' globalThis.setCardType("default") ou globalThis.setCardType("visa") ou globalThis.setCardType("mastercard")

