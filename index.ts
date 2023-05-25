#!/usr/bin/env node
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import chalk from 'chalk'



const sleep = () => new Promise(resolve => setTimeout((resolve), 1500))

async function welcomeScreen() {

    let title = chalkAnimation.rainbow(`
===================================================================
>>>>>>>>>>>>>>>>>>>>>>>>>>>> CLI ATM <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
===================================================================
`);
    await sleep();
    title.stop();

}
await welcomeScreen();


async function main() {
    const question = await inquirer.prompt([
        {
            type: "string",
            name: "ID",
            message: "please enter your ID:",
            validate:(val)=>{
                if(isNaN(val)){
                    return true;
                }else{
                    return 'enter right ID:';
                }
            }
        },
        {
            type: "number",
            name: "Pin",
            message: "please enter your Pin:",
            validate:(val)=>{
                if(isNaN(val)){
                    return 'enter a right pin-number:'
                }else{
                    return true;
                }
            },
        },
        {
            type: "list",
            name: "option",
            message: "select your:",
            choices: ['Check Balance', "Withdraw", "Deposit", "Exit"],
        },
    ]);
    const { ID, Pin, option } = question;

    if (ID && Pin) {

        let currentBalance = Math.ceil(Math.random() * 100000 + 1); 

        if (option === "Check Balance") {
            console.log(`Current balance:${chalk.green(currentBalance)}`);
          

        } else if (option === "Withdraw") {
            const enterAmount = await inquirer.prompt([
                { name: "amount", type: "number", message: "please withdraw amount:" }
            ]);
            if (enterAmount.amount > currentBalance) {
                console.log('suffiecent balance');
            } else {
                console.log(`Remaining Balance:${chalk.green(currentBalance - enterAmount.amount)}`)
            }
        } else if (option === 'Deposit') {
            const enterAmount = await inquirer.prompt([{ name: "value", type: "number", message: "please your amount:" }]);
            let previousamount = currentBalance;
            currentBalance = currentBalance + enterAmount.value;
            console.log(`previous balance:${chalk.red(previousamount)} now total balance:${chalk.green(currentBalance)}`)
        } else if (option === "Exit") {
            console.log(chalk.whiteBright('GOOD LUCK'));
        };
    };
};

await main();