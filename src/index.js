const player1 = {
  NOME: "Ferrari",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 4,
  POTENCIA: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Red Bull",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 5,
  POTENCIA: 4,
  PONTOS: 0,
};

// rola dado
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// sorteia setor do circuito de Mônaco
async function getRandomSector() {
  let random = Math.random();

  if (random < 0.33) return "RETA DOS BOXES";
  if (random < 0.66) return "CURVA DA CASINO SQUARE";

  return "DISPUTA POR POSIÇÃO";
}

// sorteia incidente de corrida
async function getRandomIncident() {
  let random = Math.random();

  return random < 0.5
    ? "TOQUE NO GUARD-RAIL"
    : "ACIDENTE NA CHICANE";
}

// exibe resultados
async function logRollResult(teamName, skill, diceResult, attribute) {
  console.log(
    `${teamName} 🎲 rolou ${diceResult} + ${attribute} = ${
      diceResult + attribute
    } em ${skill}`
  );
}

// motor da corrida
async function playRaceEngine(character1, character2) {
  for (let lap = 1; lap <= 5; lap++) {
    console.log(`\n🏁 VOLTA ${lap} - GP DE MÔNACO`);

    let sector = await getRandomSector();
    console.log(`📍 Setor sorteado: ${sector}`);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalSkill1 = 0;
    let totalSkill2 = 0;

    // RETA
    if (sector === "RETA DOS BOXES") {
      totalSkill1 = diceResult1 + character1.VELOCIDADE;
      totalSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "VELOCIDADE FINAL",
        diceResult1,
        character1.VELOCIDADE
      );

      await logRollResult(
        character2.NOME,
        "VELOCIDADE FINAL",
        diceResult2,
        character2.VELOCIDADE
      );
    }

    // CURVA
    if (sector === "CURVA DA CASINO SQUARE") {
      totalSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "CONTROLE DE CURVA",
        diceResult1,
        character1.MANOBRABILIDADE
      );

      await logRollResult(
        character2.NOME,
        "CONTROLE DE CURVA",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }

    // DISPUTA
    if (sector === "DISPUTA POR POSIÇÃO") {
      let powerResult1 = diceResult1 + character1.POTENCIA;
      let powerResult2 = diceResult2 + character2.POTENCIA;

      console.log(
        `🏎️💥 ${character1.NOME} disputa posição com ${character2.NOME}!`
      );

      await logRollResult(
        character1.NOME,
        "POTÊNCIA DO MOTOR",
        diceResult1,
        character1.POTENCIA
      );

      await logRollResult(
        character2.NOME,
        "POTÊNCIA DO MOTOR",
        diceResult2,
        character2.POTENCIA
      );

      let incident = await getRandomIncident();

      // Ferrari vence
      if (powerResult1 > powerResult2) {
        console.log(`🏆 ${character1.NOME} venceu a disputa!`);

        // ativa DRS aleatoriamente
        if (Math.random() < 0.5) {
          console.log(
            `⚡ ${character1.NOME} ativou o DRS e ganhou +1 ponto!`
          );
          character1.PONTOS++;
        }

        if (incident === "TOQUE NO GUARD-RAIL") {
          console.log(
            `🚧 ${character2.NOME} tocou no guard-rail e perdeu -1 ponto`
          );

          character2.PONTOS = Math.max(0, character2.PONTOS - 1);
        } else {
          console.log(
            `💥 ${character2.NOME} sofreu acidente na chicane e perdeu -2 pontos`
          );

          character2.PONTOS = Math.max(0, character2.PONTOS - 2);
        }
      }

      // Red Bull vence
      else if (powerResult2 > powerResult1) {
        console.log(`🏆 ${character2.NOME} venceu a disputa!`);

        // ativa DRS aleatoriamente
        if (Math.random() < 0.5) {
          console.log(
            `⚡ ${character2.NOME} ativou o DRS e ganhou +1 ponto!`
          );

          character2.PONTOS++;
        }

        if (incident === "TOQUE NO GUARD-RAIL") {
          console.log(
            `🚧 ${character1.NOME} tocou no guard-rail e perdeu -1 ponto`
          );

          character1.PONTOS = Math.max(0, character1.PONTOS - 1);
        } else {
          console.log(
            `💥 ${character1.NOME} sofreu acidente na chicane e perdeu -2 pontos`
          );

          character1.PONTOS = Math.max(0, character1.PONTOS - 2);
        }
      }

      // empate
      else {
        console.log("🤝 A disputa terminou empatada!");
      }
    }

    // vencedor da volta
    if (totalSkill1 > totalSkill2) {
      console.log(
        `✅ ${character1.NOME} foi mais rápida na volta e ganhou +1 ponto!`
      );

      character1.PONTOS++;
    }

    else if (totalSkill2 > totalSkill1) {
      console.log(
        `✅ ${character2.NOME} foi mais rápida na volta e ganhou +1 ponto!`
      );

      character2.PONTOS++;
    }

    console.log("------------------------------------------------");
  }
}

// resultado final
async function declareWinner(character1, character2) {
  console.log("\n🏁 RESULTADO FINAL DO GP DE MÔNACO");
  console.log(`🔴 ${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`🔵 ${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`\n🏆 ${character1.NOME} venceu o GP DE MÔNACO!`);
  }

  else if (character2.PONTOS > character1.PONTOS) {
    console.log(`\n🏆 ${character2.NOME} venceu o GP DE MÔNACO!`);
  }

  else {
    console.log("\n🤝 O GP DE MÔNACO terminou empatado!");
  }
}

// corrida
(async function main() {
  console.log(
    `🏎️🚦 LARGADA DO GP DE MÔNACO ENTRE ${player1.NOME} E ${player2.NOME}!\n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
