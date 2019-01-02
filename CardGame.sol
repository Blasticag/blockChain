pragma solidity ^0.5.0;

contract CardGame
{
    struct Player {
        uint amount;
        uint bet;
        uint points;
        bool isStart;
        bool isInit;
        uint nAce;
        string msgg;
        uint opponent;
        string card;
    }

    struct Card {
    	string name;
    	uint number;
    }

    mapping (address => Player) players;
    Card[13] cards;
    uint nonce;

    constructor () public {
    	cards[0].name = "A";
    	cards[1].name = "2";
    	cards[2].name = "3";
    	cards[3].name = "4";
    	cards[4].name = "5";
    	cards[5].name = "6";
    	cards[6].name = "7";
    	cards[7].name = "8";
    	cards[8].name = "9";
    	cards[9].name = "10";
    	cards[10].name = "J";
    	cards[11].name = "Q";
    	cards[12].name = "K";
    	for (uint i = 0; i < 13; i++) {
    		cards[i].number = i + 1;
    	}
    	nonce = 0;
    }

    function init () public {
    	if (players[msg.sender].isInit == false) {
    		players[msg.sender].isInit = true;
    		players[msg.sender].amount = 10000;
    		players[msg.sender].isStart = false;
    		players[msg.sender].points = 0;
    		players[msg.sender].nAce = 0;
            players[msg.sender].msgg = "";
            players[msg.sender].opponent = 0;
    	}
    }

    function newGame (uint bet) public {
    	if (!players[msg.sender].isInit) {
    		players[msg.sender].msgg = "You are not ready yet.";
            return;
    	}

    	if (players[msg.sender].isStart) {
    		players[msg.sender].msgg = "You are already in game.";
            return;
    	}

    	if (bet < 10) {
    		players[msg.sender].msgg = "At least 10!";
            return;
    	}

    	if (bet > players[msg.sender].amount) {
    		players[msg.sender].msgg = "You do not have so much money.";
            return;
    	}

    	players[msg.sender].amount -= bet;
    	players[msg.sender].bet = bet;
    	players[msg.sender].isStart = true;
    	players[msg.sender].points = 0;
    	players[msg.sender].nAce = 0;
    	players[msg.sender].msgg = "Game Start!";
    	return;
    }

    function hit () public {
    	if (!players[msg.sender].isStart) {
    		return;
    	}

    	uint random = uint(keccak256(abi.encode(now, msg.sender, nonce))) % 13;
    	nonce++;

    	players[msg.sender].card = cards[random].name;
    	players[msg.sender].msgg = "Not bust yet.";

    	if (random == 0) {
    		players[msg.sender].nAce++;
    		players[msg.sender].points += 1;
    	} else if (random > 0 && random < 10) {
    		players[msg.sender].points += random + 1;
    	} else {
    		players[msg.sender].points += 10;
    	}

    	uint points = players[msg.sender].points;

    	//Bust
    	if (points > 21) {
    		lose();
    		gameSet();
    		return;
    	}


    }

    function stand () public {
    	if (!players[msg.sender].isStart) {
    		return;
    	}

    	uint random = uint(keccak256(abi.encode(now, msg.sender, nonce))) % 21;
    	players[msg.sender].opponent = random + 1;
    	nonce++;

    	uint points = players[msg.sender].points;
    	uint nAce = players[msg.sender].nAce;

    	bool canWin = false;
    	bool canDraw = false;

    	for (uint i = 0; i < nAce; i++) {
    		if (points + i * 10 > random + 1 && points + i * 10 <= 21) {
    			canWin = true;
    		}

    		if (points + i * 10 == random + 1 && points + i * 10 <= 21) {
    			canDraw = true;
    		}
    	}

    	if (points > random + 1 && points <= 21) {
    		canWin = true;
    	}

    	if (points == random + 1 && points <= 21) {
    		canDraw = true;
    	}

    	if (canWin) {
    		win();
    	} else if (canDraw) {
    		draw();
    	} else {
    		lose();
    	}
    	gameSet();
    }

    function surrender () public {
    	if (!players[msg.sender].isStart) {
    		return;
    	}

    	players[msg.sender].bet /= 2;
    	players[msg.sender].amount += players[msg.sender].bet;
    	lose();
    	gameSet();
    }

    function draw () private {
    	players[msg.sender].amount += players[msg.sender].bet;
        players[msg.sender].msgg = "Draw game.";
    }

    function win () private {
    	players[msg.sender].amount += players[msg.sender].bet * 2;
        players[msg.sender].msgg = "You win.";
    }

    function lose () private {
        players[msg.sender].msgg = "You lose.";
    }

    function gameSet () private {
    	players[msg.sender].bet = 0;
    	players[msg.sender].points = 0;
    	players[msg.sender].isStart = false;
    	players[msg.sender].nAce = 0;
    }


    function isInit () view public returns(bool res) {
    	res = players[msg.sender].isInit;
    }

    function isStart () view public returns(bool res) {
    	res = players[msg.sender].isStart;
    }

    function getAmount () view public returns(uint res) {
    	res = players[msg.sender].amount;
    }

    function getPoints () view public returns(uint res) {
    	res = players[msg.sender].points;
    }

    function getNAce () view public returns(uint res) {
    	res = players[msg.sender].nAce;
    }

    function getOpponent () view public returns (uint res) {
        res = players[msg.sender].opponent;
    }

    function getMsg () view public returns (string memory res) {
        res = players[msg.sender].msgg;
    }

    function getCard () view public returns (string memory res) {
        res = players[msg.sender].card;
    }

}
