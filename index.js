const Web3 = require('web3');
var web3;
var account = "0xfe6438c0daa63c028322f2daa1e18a399807884a";
var cardgameContract;
var cardgame;
$(document).ready(function() {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
    // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
    }

    $("#login").click(function() {
        $("#msg").text("Loging...");
        web3.personal.unlockAccount(account, "0xf337afd7ad9f55033100c8fe54fe7fcafd18bfc429df4cdc1a79ebebee22d092", 1200,
            function () {
                $("#msg").text("Login done.");
                $("#deploy").removeAttr("disabled");
        });
    });

    $("#deploy").click(function() {
        $("#deploy").attr("disabled", "disabled");
        $("#msg").text("Deploying...");
        cardgameContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"hit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOpponent","outputs":[{"name":"res","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNAce","outputs":[{"name":"res","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCard","outputs":[{"name":"res","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isStart","outputs":[{"name":"res","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isInit","outputs":[{"name":"res","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMsg","outputs":[{"name":"res","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"surrender","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"stand","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"bet","type":"uint256"}],"name":"newGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAmount","outputs":[{"name":"res","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"init","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPoints","outputs":[{"name":"res","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
        cardgame = cardgameContract.new(
           {
             from: web3.eth.accounts[0],
             data: '0x60806040523480156200001157600080fd5b506040805190810160405280600181526020017f410000000000000000000000000000000000000000000000000000000000000081525060016000600d811015156200005957fe5b6002020160000190805190602001906200007592919062000571565b506040805190810160405280600181526020017f3200000000000000000000000000000000000000000000000000000000000000815250600180600d81101515620000bc57fe5b600202016000019080519060200190620000d892919062000571565b506040805190810160405280600181526020017f330000000000000000000000000000000000000000000000000000000000000081525060016002600d811015156200012057fe5b6002020160000190805190602001906200013c92919062000571565b506040805190810160405280600181526020017f340000000000000000000000000000000000000000000000000000000000000081525060016003600d811015156200018457fe5b600202016000019080519060200190620001a092919062000571565b506040805190810160405280600181526020017f350000000000000000000000000000000000000000000000000000000000000081525060016004600d81101515620001e857fe5b6002020160000190805190602001906200020492919062000571565b506040805190810160405280600181526020017f360000000000000000000000000000000000000000000000000000000000000081525060016005600d811015156200024c57fe5b6002020160000190805190602001906200026892919062000571565b506040805190810160405280600181526020017f370000000000000000000000000000000000000000000000000000000000000081525060016006600d81101515620002b057fe5b600202016000019080519060200190620002cc92919062000571565b506040805190810160405280600181526020017f380000000000000000000000000000000000000000000000000000000000000081525060016007600d811015156200031457fe5b6002020160000190805190602001906200033092919062000571565b506040805190810160405280600181526020017f390000000000000000000000000000000000000000000000000000000000000081525060016008600d811015156200037857fe5b6002020160000190805190602001906200039492919062000571565b506040805190810160405280600281526020017f313000000000000000000000000000000000000000000000000000000000000081525060016009600d81101515620003dc57fe5b600202016000019080519060200190620003f892919062000571565b506040805190810160405280600181526020017f4a000000000000000000000000000000000000000000000000000000000000008152506001600a600d811015156200044057fe5b6002020160000190805190602001906200045c92919062000571565b506040805190810160405280600181526020017f51000000000000000000000000000000000000000000000000000000000000008152506001600b600d81101515620004a457fe5b600202016000019080519060200190620004c092919062000571565b506040805190810160405280600181526020017f4b000000000000000000000000000000000000000000000000000000000000008152506001600c600d811015156200050857fe5b6002020160000190805190602001906200052492919062000571565b5060008090505b600d811015620005625760018101600182600d811015156200054957fe5b600202016001018190555080806001019150506200052b565b506000601b8190555062000620565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620005b457805160ff1916838001178555620005e5565b82800160010185558215620005e5579182015b82811115620005e4578251825591602001919060010190620005c7565b5b509050620005f49190620005f8565b5090565b6200061d91905b8082111562000619576000816000905550600101620005ff565b5090565b90565b611b8780620006306000396000f3fe608060405234801561001057600080fd5b50600436106100ec576000357c010000000000000000000000000000000000000000000000000000000090048063b5fdeb23116100a9578063cde9ef7811610083578063cde9ef7814610295578063d321fe29146102c3578063e1c7392a146102e1578063f4b7095b146102eb576100ec565b8063b5fdeb23146101fe578063b71c47a214610281578063c2897b101461028b576100ec565b80632ae3594a146100f157806339580054146100fb57806341623bc5146101195780635112f02c146101375780638a55d36e146101ba578063b145a5b8146101dc575b600080fd5b6100f9610309565b005b6101036106c8565b6040518082815260200191505060405180910390f35b610121610711565b6040518082815260200191505060405180910390f35b61013f61075a565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561017f578082015181840152602081019050610164565b50505050905090810190601f1680156101ac5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101c261083b565b604051808215151515815260200191505060405180910390f35b6101e4610891565b604051808215151515815260200191505060405180910390f35b6102066108e7565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561024657808201518184015260208101905061022b565b50505050905090810190601f1680156102735780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102896109c8565b005b610293610b1e565b005b6102c1600480360360208110156102ab57600080fd5b8101908080359060200190929190505050610dc6565b005b6102cb61130d565b6040518082815260200191505060405180910390f35b6102e9611356565b005b6102f36115eb565b6040518082815260200191505060405180910390f35b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160009054906101000a900460ff161515610363576106c6565b6000600d4233601b54604051602001808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405160208183030381529060405280519060200120600190048115156103d957fe5b069050601b60008154809291906001019190505550600181600d811015156103fd57fe5b600202016000016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206007019080546001816001161561010002031660029004610464929190611a2f565b506040805190810160405280600d81526020017f4e6f742062757374207965742e000000000000000000000000000000000000008152506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060050190805190602001906104ef929190611ab6565b50600081141561059f576000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206004016000815480929190600101919050555060016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002016000828254019250508190555061065d565b6000811180156105af5750600a81105b1561060b57600181016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002016000828254019250508190555061065c565b600a6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825401925050819055505b5b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154905060158111156106c3576106b4611634565b6106bc6116c1565b50506106c6565b50505b565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060060154905090565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040154905090565b60606000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206007018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108315780601f1061080657610100808354040283529160200191610831565b820191906000526020600020905b81548152906001019060200180831161081457829003601f168201915b5050505050905090565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160009054906101000a900460ff16905090565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160019054906101000a900460ff16905090565b60606000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206005018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109be5780601f10610993576101008083540402835291602001916109be565b820191906000526020600020905b8154815290600101906020018083116109a157829003601f168201915b5050505050905090565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160009054906101000a900460ff161515610a2257610b1c565b60026000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000828254811515610a7357fe5b04925050819055506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101546000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008282540192505081905550610b13611634565b610b1b6116c1565b5b565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160009054906101000a900460ff161515610b7857610dc4565b600060154233601b54604051602001808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200193505050506040516020818303038152906040528051906020012060019004811515610bee57fe5b069050600181016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060060181905550601b6000815480929190600101919050555060008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154905060008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206004015490506000809050600080905060008090505b83811015610d4b5760018601600a82028601118015610d0d57506015600a8202860111155b15610d1757600192505b60018601600a82028601148015610d3457506015600a8202860111155b15610d3e57600191505b8080600101915050610ce8565b506001850184118015610d5f575060158411155b15610d6957600191505b6001850184148015610d7c575060158411155b15610d8657600190505b8115610d9957610d946117f2565b610db6565b8015610dac57610da7611912565b610db5565b610db4611634565b5b5b610dbe6116c1565b50505050505b565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160019054906101000a900460ff161515610eab576040805190810160405280601681526020017f596f7520617265206e6f74207265616479207965742e000000000000000000008152506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206005019080519060200190610ea5929190611ab6565b5061130a565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160009054906101000a900460ff1615610f8f576040805190810160405280601881526020017f596f752061726520616c726561647920696e2067616d652e00000000000000008152506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206005019080519060200190610f89929190611ab6565b5061130a565b600a811015611028576040805190810160405280600c81526020017f4174206c656173742031302100000000000000000000000000000000000000008152506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206005019080519060200190611022929190611ab6565b5061130a565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154811115611101576040805190810160405280601e81526020017f596f7520646f206e6f74206861766520736f206d756368206d6f6e65792e00008152506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060050190805190602001906110fb929190611ab6565b5061130a565b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008282540392505081905550806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001018190555060016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160006101000a81548160ff02191690831515021790555060008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002018190555060008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600401819055506040805190810160405280600b81526020017f47616d65205374617274210000000000000000000000000000000000000000008152506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206005019080519060200190611308929190611ab6565b505b50565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154905090565b600015156000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160019054906101000a900460ff16151514156115e95760016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160016101000a81548160ff0219169083151502179055506127106000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555060008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160006101000a81548160ff02191690831515021790555060008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002018190555060008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206004018190555060206040519081016040528060008152506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060050190805190602001906115a0929190611ab6565b5060008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600601819055505b565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154905090565b6040805190810160405280600981526020017f596f75206c6f73652e00000000000000000000000000000000000000000000008152506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060050190805190602001906116be929190611ab6565b50565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001018190555060008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002018190555060008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160006101000a81548160ff02191690831515021790555060008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040181905550565b60026000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154026000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001600082825401925050819055506040805190810160405280600881526020017f596f752077696e2e0000000000000000000000000000000000000000000000008152506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600501908051906020019061190f929190611ab6565b50565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101546000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001600082825401925050819055506040805190810160405280600a81526020017f447261772067616d652e000000000000000000000000000000000000000000008152506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206005019080519060200190611a2c929190611ab6565b50565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611a685780548555611aa5565b82800160010185558215611aa557600052602060002091601f016020900482015b82811115611aa4578254825591600101919060010190611a89565b5b509050611ab29190611b36565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611af757805160ff1916838001178555611b25565b82800160010185558215611b25579182015b82811115611b24578251825591602001919060010190611b09565b5b509050611b329190611b36565b5090565b611b5891905b80821115611b54576000816000905550600101611b3c565b5090565b9056fea165627a7a72305820d29e3028fe05129212d22a01fd32eed74f15f5e696748a7662d9ad13016675770029',
             gas: '4700000'
           }, function (e, contract){
            console.log(e, contract);
            if (typeof contract.address !== 'undefined') {
                 console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                 $("#state").text("Not in game.");
                 $("#amount").text(cardgame.getAmount());
                 $("#points").text("");
                 $("#opponent").text("");
                 $("#card").text("");
                 $("#nAce").text("");
                 $("#msg").text("Deloyment done.");
                 $(".button").removeAttr("disabled");
            }
        });
    });

    $("#init").click(function() {
        $(".button").attr("disabled", "disabled");
        $("#msg").text("Initting...");
        cardgame.init.sendTransaction({from: account, gas: '1145141'}, function (e, contract) {
                    $("#msg").text("Done initialization.");
                    $(".button").removeAttr("disabled");
                    $("#amount").text(cardgame.getAmount());
        });
    });

    $("#newGame").click(function() {
        $(".button").attr("disabled", "disabled");
        $("#msg").text("starting...");
        cardgame.newGame.sendTransaction(100, {from: account, gas: '1145141'}, function (e, contract) {
                    $("#amount").text(cardgame.getAmount());
                    $("#msg").text(cardgame.getMsg());
                    $("#state").text(cardgame.isStart());
                    $("#points").text(0);
                    $("#opponent").text("");
                    $("#card").text("");
                    $("#nAce").text("");
                    $(".button").removeAttr("disabled");
        });
    });

    $("#hit").click(function() {
        $(".button").attr("disabled", "disabled");
        $("#msg").text("Hitting...");
        cardgame.hit.sendTransaction({from: account, gas: '1145141'}, function (e, contract) {
                    $("#amount").text(cardgame.getAmount());
                    $("#msg").text(cardgame.getMsg());
                    $("#state").text(cardgame.isStart());
                    $("#points").text(cardgame.getPoints());
                    $("#opponent").text("");
                    $("#card").text(cardgame.getCard());
                    $("#nAce").text(cardgame.getNAce());
                    $(".button").removeAttr("disabled");
        });
    });

    $("#stand").click(function() {
        $(".button").attr("disabled", "disabled");
        $("#msg").text("Standing...");
        cardgame.stand.sendTransaction({from: account, gas: '1145141'}, function (e, contract) {
                    $("#amount").text(cardgame.getAmount());
                    $("#msg").text(cardgame.getMsg());
                    $("#state").text(cardgame.isStart());
                    $("#points").text(cardgame.getPoints());
                    $("#opponent").text(cardgame.getOpponent());
                    $("#card").text(cardgame.getCard());
                    $("#nAce").text(cardgame.getNAce());
                    $(".button").removeAttr("disabled");
        });
    });

    $("#surrender").click(function() {
        $(".button").attr("disabled", "disabled");
        $("#msg").text("Surrendering...");
        cardgame.surrender.sendTransaction({from: account, gas: '1145141'}, function (e, contract) {

                    $("#amount").text(cardgame.getAmount());
                    $("#msg").text(cardgame.getMsg());
                    $("#state").text(cardgame.isStart());
                    $("#points").text(cardgame.getPoints());
                    $("#opponent").text(cardgame.getOpponent());
                    $("#card").text(cardgame.getCard());
                    $("#nAce").text(cardgame.getNAce());
                    $(".button").removeAttr("disabled");
        });
    });
});