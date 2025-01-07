// 1. Deposit some Money (Complete)
// 2. Determine number of lines to bet on (Complete)
// 3. Collect a bet amount (Complete)
// 4. Spin the slot machine (Complete)
// 5. Check if the user won (Complete)
// 6. Give the user their winnings (Complete)
// 7. Play again (Complete)

// this is already in packge.json and will be imported here into the program
//"prompt-sync" and "inquirer" are similar but the latter is ansynchronus and will allow for more complex interactions and have the ability to ask multiple questions in a non-blocking way.
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2,
}



const deposit = () => {
    //this while statement is a loop and the "true" is the condition to continue said loop. As long as the input is less than zero or a non-numerical answer, the user will be prompt to answer again.
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ");// by default what ever is entered here will be returned as a string. We must now convert that to a number to do acutal math.
        const numberDepositAmount = parseFloat(depositAmount); //pareFloat() will convert a string to its floating point value. eg. "20.2"(string) -> 20.2(number) *non-numerical answers will return a NAN

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.")
        } else {
            return numberDepositAmount; //When a numerical non-zero answer is given, then the "while" loop will end and this "else" line will execute returning the money the user inputed.
        }
    }
};

const getNumberOfLines = () => {
    //
    while (true) {
        const lines = prompt("Enter the number of lines you want to bet on (1-3): ");// 
        const numberOfLines = parseFloat(lines); //

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.")
        } else {
            return numberOfLines; //
        }
    }
};

const getBet = (balance, lines) => {
    //
    while (true) {
        const bet = prompt("Enter the amount you want to bet per line: ");// 
        const numberOfBet = parseFloat(bet); //

        if (isNaN(numberOfBet) || numberOfBet <= 0 || numberOfBet > balance / lines) {
            console.log("Invalid bet amount, try again.")
        } else {
            return numberOfBet; //
        }
    }


};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }

    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);

        }
    }

    return reels;
};

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }

    return rows
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }

    return winnings;
};

const game = () => {
    let balance = deposit();

    while (true) {
        console.log("You have a balance of $" + balance);
        const lines = getNumberOfLines();
        const bet = getBet(balance, lines);
        balance -= bet * lines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, lines);
        balance += winnings;
        console.log("you won, $" + winnings.toString());

        if (balance <= 0) {
            console.log("Out of money");
            break;
        }

        const playAgain = prompt("Play again(y/n)?")

        if (playAgain != "y") break;

    }
}

game();


