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

// Security Code Mask - Essa estrutura abaixo é uma estrutura padrão do IMask (olhar documentação depois) para definirmos como um input poderá ser digitado pelo usuário (nesse caso, o CVC de um cartão de crédito possui no máximo 4 dígitos, então colocamos "0000" => com isso, o usuário só poderá digitar números e no máximo 4 deles)

const securityCode = document.querySelector('#security-code');

const securityCodePattern = {
  mask: "0000"
}

const securityCodeMask = IMask(securityCode, securityCodePattern)

// Expiration Date

const expirationDate = document.querySelector('#expiration-date')

const expirationDatePattern = {
  mask: 'MM{/}YY', // o que colocamos entre {} é colocado automaticamente quando o input vai sendo digitado pelo usuário
  blocks: { // usamos o blocks (que é um conjunto de objetos) para definir parâmetros para nossas masks
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2), // função JavaScript que pega o ano atual; slice(x) pega os x últimos caracteres de uma string e retorna elas 
      to: String(new Date().getFullYear() + 10).slice(2)
    }
  }
}

const expirationDateMask = IMask(expirationDate, expirationDatePattern)

// Numeração dos cartões Visa e Mastercard

 /* 
  Regra VISA:

    => inicia com dígito 4 seguido de 15 dígitos

  Regra Mastercard

    => inicia com dígito 5, seguido de um dígito entre 1 e 5, seguido de mais 2 dígitos

    OU

    => inicia com dígito 22, seguido de um dígito entre 2 e 9, seguido de mais 1 dígito

    OU

    => inicia com dígito 2, seguido de um dígito entre 3 e 7, seguido de mais 2 dígitos

    => todas as condições acima são seguidas por 12 dígitos
     
 */