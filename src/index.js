const player1 = {
  NOME: "Ferrari",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 4,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Red Bull",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 5,
  PODER: 4,
  PONTOS: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA DE MÔNACO";
      break;
    case random < 0.66:
      result = "CURVA FECHADA";
      break;
    default:
      result = "ULTRAPASSAGEM";
  }

  return result;
}

async function logRollResult(teamName, block, diceResult, attribute) {
  console.log(
    `${teamName} 🏎️ acelerou em ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Volta ${round} do GP de Mônaco`);

    // sortear setor da pista
    let block = await getRandomBlock();
    console.log(`Trecho: ${block}`);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA DE MÔNACO") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade máxima",
        diceResult1,
        character1.VELOCIDADE
      );

      await logRollResult(
        character2.NOME,
        "velocidade máxima",
        diceResult2,
        character2.VELOCIDADE
      );
    }

    if (block === "CURVA FECHADA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "controle nas curvas",
        diceResult1,
        character1.MANOBRABILIDADE
      );

      await logRollResult(
        character2.NOME,
        "controle nas curvas",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }

    if (block === "ULTRAPASSAGEM") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(
        `${character1.NOME} tentou ultrapassar ${character2.NOME}! 🏎️💨`
      );

      await logRollResult(
        character1.NOME,
        "potência do motor",
        diceResult1,
        character1.PODER
      );

      await logRollResult(
        character2.NOME,
        "potência do motor",
        diceResult2,
        character2.PODER
      );

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        console.log(
          `${character1.NOME} venceu a disputa! ${character2.NOME} perdeu 1 ponto ⚠️`
        );
        character2.PONTOS--;
      }

      if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        console.log(
          `${character2.NOME} venceu a disputa! ${character1.NOME} perdeu 1 ponto ⚠️`
        );
        character1.PONTOS--;
      }

      console.log(
        powerResult2 === powerResult1
          ? "Disputa empatada! Nenhum ponto foi perdido"
          : ""
      );
    }

    // verificando o vencedor da volta
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} ganhou a volta! 🏆`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} ganhou a volta! 🏆`);
      character2.PONTOS++;
    }

    console.log("-----------------------------------");
  }
}

async function declareWinner(character1, character2) {
  console.log("🏁 Resultado final do GP de Mônaco:");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n🏆 ${character1.NOME} venceu o Grande Prêmio de Mônaco!`);
  else if (character2.PONTOS > character1.PONTOS)
    console.log(`\n🏆 ${character2.NOME} venceu o Grande Prêmio de Mônaco!`);
  else console.log("🤝 O GP terminou em empate!");
}

(async function main() {
  console.log(
    `🏎️🚦 Grande Prêmio de Mônaco começando entre ${player1.NOME} e ${player2.NOME}!\n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
