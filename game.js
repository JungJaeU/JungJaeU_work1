import chalk from 'chalk';
import readlineSync from 'readline-sync';

class Player {
  constructor(stage) {
    const hp = Math.floor((Math.random)*100);
    const dmg = Math.floor((Math.random)*30);
    const maxDmg =  dmg + (Math.floor((Math.random)*10) + stage);
    const minDmg =  dmg - (Math.floor((Math.random)*10) - stage);
    const pDmg = Math.floor((Math.random) * (this.maxDmg - this.minDmg + 1)) + this.minDmg;
  }

  attack(){
    return this.pDmg;
  }

  stageClearAbility(stage){
    const addHp = Math.floor((Math.random)*100);
    this.hp += addHp;
    const addDmg = Math.floor((Math.random)*(10+stage));
    this.maxDmg += addDmg;
    this.minDmg += addDmg;
  }
}

class Monster {
  constructor(stage) {
    const hp = Math.floor((Math.random)*(20*stage));
    const mDmg = Math.floor((Math.random)*(5*stage));
  }

  attack() {
    return this.mDmg;
  }
}

function displayStatus(stage, player, monster) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) +
    chalk.blueBright(
      `| 플레이어 정보 | HP: ${player.hp}, Attack: ${player.damage} `,

    ) +
    chalk.redBright(
      `| 몬스터 정보 | HP: ${monster.hp}, Attack: ${monster.damage} |`,
    ),
  );
  console.log(chalk.magentaBright(`=====================\n`));
}

const battle = async (stage, player, monster) => {
  let logs = [];

  while (player.hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);

    logs.forEach((log) => console.log(log));

    console.log(
      chalk.green(
        `\n1. 공격한다 2. 연속 공격한다. 3. 방어한다 4. 도망간다`,
      ),
    );
    const choice = readlineSync.question('당신의 선택은? ');

    // 플레이어의 선택에 따라 다음 행동 처리
    logs.push(chalk.green(`${choice}를 선택하셨습니다.`));
    switch (choice) {
      case '1':
        const pAtt = player.attack();
        const mAtt = monster.attack();
        monster.hp -= pAtt;
        logs.push(chalk.green(`몬스터에게 공격으로${pAtt}의 피해를 입혔습니다.`));
        player.hp -= mAtt;
        logs.push(chalk.green(`몬스터가 플레이어에게 ${mAtt}의 피해를 입혔습니다.`));

        // logs.push(chalk.green(`몬스터에게 공격으로${player.damage}의 피해를 입혔습니다.`));
        // monster.hp -= player.damage;
        // logs.push(chalk.green(`몬스터가 플레이어에게 ${player.damage}의 피해를 입혔습니다.`));
        // player.hp -= monster.damage;

        // if (monster.hp <= 0) {
        //   logs.push(chalk.white(`몬스터를 물리쳤습니다!`));
        //   player.heal();
        //   player.hp += Math.floor(Math.random() * 30);
        //   player.damage += Math.floor(Math.random() * 10);
        //   monster.heal();
        //   monster.hp *= 1.2;
        //   monster.damage *= 1.2;
        //   stage++;
          
        // }
        break;
        

      case '2':
        // logs.push(chalk.green(`몬스터에게 연속 공격으로 ${player.damage * 2}의 피해를 입혔습니다.`));
        // monster.hp -= player.damage * 2;
        // logs.push(chalk.green(`몬스터가 플레이어에게 ${monster.damage}의 피해를 입혔습니다.`));
        // player.hp -= monster.damage;

        // if (monster.hp <= 0) {
        //   logs.push(chalk.white(`몬스터를 물리쳤습니다!`));
        //   player.heal();
        //   player.hp += Math.floor(Math.random() * 30);
        //   player.damage += Math.floor(Math.random() * 10);
        //   monster.heal();
        //   monster.hp += Math.floor(Math.random() * 20);
        //   monster.damage += Math.floor(Math.random() * 20);
        //   stage++;
          
        // }
        
        

      case '3':

        break;

      case '4':
        logs.push(chalk.white(`도망쳤습니다!`));
        // stage = 1;
        // player.hp = 100;
        // player.damage = 5;
        // monster.hp = 100;
        // monster.damage = 2;
        break;

      default:
        logs.push(chalk.white(`잘못 입력했습니다. 다시 입력해주세요!`));
        break;
    }


  }
};

export async function startGame() {
  console.clear();
  const player = new Player();
  let stage = 1;

  while (stage <= 10) {
    const monster = new Monster(stage);
    await battle(stage, player, monster);
    // 스테이지 클리어 및 게임 종료 조건
    if (stage >= 11) {
      break;
    }

    stage++;
  }
}
