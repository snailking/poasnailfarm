//var contractAddress="0x388bDA6EeFCaD8A30C0656490834bdC829682DD7" // Sokol (POA)
//var contractAddress="0xc866Df99469E9744c1652A0FC19E059b8Ff2753E" // Sokol 2
//var contractAddress="0xB9D95fE3EFDA5A8f42926332De896Ad083440CA9" // Sokol 3
//var contractAddress="0x159C608D39852bdaEDA85a16A55654D60DBc2422" // Sokol 4
//var contractAddress="0xe8826d573d2Bfb04458CABeB3EA703A109113843" // Sokol 5
var contractAddress="0xA1C8Cc49f38D0546dA099F4249F0756bAAB4646d" // Sokol 6

/* WEB3 DETECTION */

var web3;

/* OLD
window.addEventListener("load", function() {
	if (typeof web3 !== "undefined") {
        web3 = new Web3(web3.currentProvider);
        web3.version.getNetwork(function(error, result) {
            if (!error) {
                if (result == "77") {
					////console.log("Sokol successfully loaded!");
                } else {
                    ////console.log("You must be on the Sokol network to try the POA version of SnailFarm 3!");
					//web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/f423492af8504d94979d522c3fbf3794"));
                }
            }
        });
    } else {
        ////console.log("Web3 library not found.");
        //web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/f423492af8504d94979d522c3fbf3794"));
    }
});
*/

/* NEW */

window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            //web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        //web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        //console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

/* MODAL */

// Get the modal
var quest_modal = document.getElementById("questmodal");
var downtime_modal = document.getElementById("downtimemodal");
var wrongRound_modal = document.getElementById("wrongroundmodal");

// Close modal on game info
function CloseModal() {
	quest_modal.style.display = "none";
	downtime_modal.style.display = "none";
	wrongRound_modal.style.display = "none";
}

// Show quest modal
function QuestModal() {
	quest_modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == downtime_modal || event.target == wrongRound_modal || event.target == quest_modal) {
		quest_modal.style.display = "none";
        downtime_modal.style.display = "none";
		wrongRound_modal.style.display = "none";
    }
}

/* PAST EVENT LOG */

var timeLaunch = 1548855450; //Sokol
var launchBlock = 6903779; //Sokol

var twoDaysBlock = 0;
var ranLog = false;

function checkBlock(){
	web3.eth.getBlockNumber(function (error, result){
		////console.log("block number is " + result);
		twoDaysBlock = result - 10000; //~half a day
	});
}

checkBlock();

//Get timestamp for log
function dateLog(_blockNumber) {
	d = new Date((timeLaunch + ((_blockNumber - launchBlock) * 6.5)) * 1000); //change to 5 for POA core
	////console.log(d);
	datetext = d.toTimeString();
	datetext = datetext.split(' ')[0];
}

/* UTILITIES */

//Truncates ETH value to 3 decimals
function formatEthValue(ethstr){
    return parseFloat(parseFloat(ethstr).toFixed(3));
}

//Truncates ETH value to 6 decimals
function formatEthValue2(ethstr){
	return parseFloat(parseFloat(ethstr).toFixed(6));
}

//Truncates ETH address to first 8 numbers
function formatEthAdr(adr){
	var _smallAdr = adr.substring(0, 10);
	var _stringLink = '<a href="https://etherscan.io/address/' + adr + '" target="_blank" style="text-decoration:none; color:inherit;">' + _smallAdr + '</a>';
	return _stringLink;
}

//Conversion of Date to hh:mm:ss
var datetext;

function date24() {
	d = new Date();
	datetext = d.toTimeString();
	datetext = datetext.split(' ')[0];
}


/* VARIABLES */

var a_gameActive = false;
var a_downtime = 0;
var a_round = 0;
var a_contractBalance = 0;
var a_nextRound = 0;

var a_joinCost = 0;
var a_carrotCost = 0;
var a_hatchCost = 0;

var playereggdoc;

var c_spiderowner = "";
var c_squirrelowner = "";
var c_tadpoleowner = "";

var a_marketEgg = 0; 
var a_tokenPrice = 0;
var a_tokenSellPrice = 0;
var a_maxAcorn = 0;
var a_acornCost = 0; 

var a_roundPot = 0; 
var a_eggPot = 0; 
var a_snailPot = 0; 

var a_leaderSnail = 0;

var a_harvestCost = 0;
var a_lettuceReq = 0;
var a_tadpoleReq = 0; 

var a_playerRound = 0;
var a_playerSnail = 0; 
var a_playerEgg = 0; 
var a_playerBoost = 0; 
var a_playerProd = 0;
var a_playerRed = 0; 
var a_playerAcorn = 0;

var o_playerEgg = 0;
var s_playerEgg = 0;
var z_playerEgg = 0;

var f_buy = 0;
var f_prince = 0;
var f_tree = 0;
var f_redhatch = 0;

var m_account = "waiting for web3";
var l_account;

//Leaderboard Array

var d_leaderboard = [
	{ address: "0x0000000022223333444455556666777788889999", hatchery: 0, egg: 0, red: 0, boost1: false, boost2: false, boost3: false, boost4: false, boost5: false, boost6: false },
	{ address: "0x0000111122223333444455556666777788889999", hatchery: 0, egg: 0, red: 0, boost1: false, boost2: false, boost3: false, boost4: false, boost5: false, boost6: false },
	{ address: "0x0000222222223333444455556666777788889999", hatchery: 0, egg: 0, red: 0, boost1: false, boost2: false, boost3: false, boost4: false, boost5: false, boost6: false },
	{ address: "0x0000333322223333444455556666777788889999", hatchery: 0, egg: 0, red: 0, boost1: false, boost2: false, boost3: false, boost4: false, boost5: false, boost6: false },
	{ address: "0x0000444422223333444455556666777788889999", hatchery: 0, egg: 0, red: 0, boost1: false, boost2: false, boost3: false, boost4: false, boost5: false, boost6: false }
];	

/* GLOBAL LOOP */

//Initiates loops
function main(){
    //////console.log('Main loop started.');
    controlLoop();
	controlLoopFast();
	controlLoopSlow();
	controlLoopEgg();
}

//Main loop on 4 seconds
function controlLoop(){
    refreshData();
    setTimeout(controlLoop,4000);
}

//Secondary loop on 200ms for actions that need faster refresh
function controlLoopFast(){
	refreshDataFast();
	setTimeout(controlLoopFast,200);
}

//Another loop on 1 minute for a slow, heavy leaderboard update
function controlLoopSlow(){
	refreshDataSlow();
	//////////console.log("slow loop");
	setTimeout(controlLoopSlow,60000);
}

//Super fast 100ms loop for eggs approximation
function controlLoopEgg(){
	fastPlayerEgg();
	setTimeout(controlLoopEgg,100);
}

/* STATE UPDATES */

//Refreshes game data
function refreshData(){
	
	updateEthAccount();
	updateContractBalance();
	updateGameActive();
	updateRound();
	
	updateEggPot();
	updateRoundPot();
	updateSnailPot();
	
	updateMarketEgg();
	updateMaxEggBuy();
	updateMaxSaleReward();
	updateMaxAcorn();
	updateAcornCost();
	
	updateHarvestCost();
	
	updateProportionalCost();
	
	updateLeader();
	updateLeaderSnail();
	
	updatePlayerStatus();
	updatePlayerRound();
	
	updatePlayerSnail();
	updatePlayerEgg();
	updatePlayerRed();
	updatePlayerProd();
	updatePlayerBoost();
	
	updatePlayerNextRed();
	
	updatePlayerBalance();
	updatePlayerAcorn();
	updatePlayerShare();

	checkPotato();
	checkSpiderOwner();
	checkSquirrelOwner();
	checkTadpoleOwner();
	checkOwnsLettuce();
	checkOwnsCarrot();
	checkOwnsSlug();
	
	updateSpiderReq();
	updateSquirrelReq();
	updateTadpoleReq();
	updateLettuceReq();
	
	updateHatchEstimate();
	//runLog();
}

//Refreshes some game data faster
function refreshDataFast(){
	updateFieldBuy2();
	updateBuyEstimate();
	updateFieldPrince2();
	updateSellEstimate();
	updateFieldTree2();
	updateTreeEstimate();
	updateRedHatch2();
	updateRedEstimate();
	fastupdateDowntime();
}

//Refreshes leaderboard
function refreshDataSlow(){
	
	checkLeaderboard0();
	checkLeaderboard1();
	checkLeaderboard2();
	checkLeaderboard3();
	checkLeaderboard4();
	
	checkLeaderEgg0();
	checkLeaderEgg1();
	checkLeaderEgg2();
	checkLeaderEgg3();
	checkLeaderEgg4();
	
	checkLeaderRed0();
	checkLeaderRed1();
	checkLeaderRed2();
	checkLeaderRed3();
	checkLeaderRed4();
	
	checkLeaderLettuce0();
	checkLeaderLettuce1();
	checkLeaderLettuce2();
	checkLeaderLettuce3();
	checkLeaderLettuce4();
	
	checkLeaderCarrot0();
	checkLeaderCarrot1();
	checkLeaderCarrot2();
	checkLeaderCarrot3();
	checkLeaderCarrot4();
	
	checkLeaderSlug0();
	checkLeaderSlug1();
	checkLeaderSlug2();
	checkLeaderSlug3();
	checkLeaderSlug4();
	
	slowupdateLeaderboard();
	showLeaderboard();
	
	slowupdatePlayerEgg();
	
	updateLog();
	//////////console.log("refreshed leaderboard fully");
}
	

var gameactivedoc = document.getElementById('gameactive');
var gameactive2doc = document.getElementById('gameactive2');

//Update log if player pressed button to load past events
//This is to avoid autoupdating on phones, where it might lag out
function updateLog(){
	if(ranLog == true){
		runLog();
	}
}

//Current state of the game
function updateGameActive(){
	gameActive(function(result) {
		if(result == true) {
			a_gameActive = true;
			gameactivedoc.innerHTML = "The game is active!";
		} else {
			a_gameActive = false;
			nextRoundStart(function(result2) {
				var blocktime = Math.round((new Date()).getTime() / 1000); //current blocktime should be Unix timestamp
				a_nextRound = parseFloat(result2);
				a_downtime = parseFloat(result2) - parseFloat(blocktime);
				if(a_downtime < 0) {
					a_downtime = 0;
				}
			});
		}
	});
}

//Player status (if game is active, get starting snails if needed, else join round if needed, else nothing)
function updatePlayerStatus(){
	var playerstatusdoc = document.getElementById('playerstatus')
	if(a_gameActive == true){
		if(a_playerRound == 0){
			playerstatusdoc.innerHTML = '<button class="btn btn-lg btn-success" onclick="webGetStarter()">Get Starting Snails!</button><br><p class="black-shadow">(' + a_joinCost + ' POA, will let you play every round)</p>';
		} else if(a_playerRound != a_round){
			playerstatusdoc.innerHTML = '<button class="btn btn-lg btn-success" onclick="webJoinRound()">Join New Round!</button><br><p class="black-shadow">(' + a_joinCost + ' POA, will give you red eggs for your previous performance)</p>';
		} else {
			playerstatusdoc.innerHTML = '<img height="64" src="img/snail.png">';
		}
	} else {
		playerstatusdoc.innerHTML = '<button class="btn btn-lg btn-success" onclick="webBeginRound()">Begin New Round!</button><br><p class="black-shadow">(will only work if countdown timer is at 0)</p>';
	}
}
		

//Check player round
function updatePlayerRound() {
	GetMyRound( function(result) {
		a_playerRound = result;	
	});
}

//Update join, hatch and carrot costs
function updateProportionalCost() {
	var carrotcostdoc = document.getElementById('carrotcost');
	var hatchcostdoc = document.getElementById('hatchcost');
	a_joinCost = (formatEthValue2(a_snailPot / 2000) + parseFloat(0.001)).toFixed(3);
	a_hatchCost = (formatEthValue2(a_snailPot / 5000) + parseFloat(0.001)).toFixed(3);
	a_carrotCost = (formatEthValue2(a_snailPot / 200) + parseFloat(0.001)).toFixed(3);
	carrotcostdoc.innerHTML = a_carrotCost;
	hatchcostdoc.innerHTML = a_hatchCost;
}
	
//Fast update for Downtime if round is unactive
function fastupdateDowntime(){
	if(a_gameActive != true) {
		var blocktime = Math.round((new Date()).getTime() / 1000); //current blocktime should be Unix timestamp
		a_downtime = parseFloat(a_nextRound) - parseFloat(blocktime);
		
		downtime_hours = Math.floor(a_downtime / 3600);
		if(downtime_hours < 10) { downtime_hours = "0" + downtime_hours }
		downtime_minutes = Math.floor((a_downtime % 3600) / 60);
		if(downtime_minutes < 10) { downtime_minutes = "0" + downtime_minutes }
		downtime_seconds = parseFloat((a_downtime % 3600) % 60).toFixed(0);
		if(downtime_seconds < 10) { downtime_seconds = "0" + downtime_seconds }
		
		if(a_downtime > 0) {
			gameactivedoc.innerHTML = "Next round starts in " + downtime_hours + ":" + downtime_minutes + ":" + downtime_seconds;
			gameactive2doc.innerHTML = downtime_hours + ":" + downtime_minutes + ":" + downtime_seconds;
		} else {
			gameactivedoc.innerHTML = "The next round is ready to start!";
		}
	}	
}


//Show Leaderboard
function showLeaderboard() {
	var leaderboarddoc = document.getElementById('leaderboard');
	leaderboarddoc.innerHTML = "";
	for(i = 0; i < 5; i++) {
		leaderboarddoc.innerHTML += "#" + parseInt(i + 1) + " | " + formatEthAdr(d_leaderboard[i].address) + " | " + d_leaderboard[i].hatchery + " Snails | " + d_leaderboard[i].egg + " Eggs | " + d_leaderboard[i].red + " Reds | ";
		//console.log("updated rank " + i + " with index " + j);
		if(d_leaderboard[i].boost1 == true) {
			leaderboarddoc.innerHTML += "<img src='img/spider.png' height='32'>";
			//console.log(d_leaderboard[j] + " has spidersqueen");
		}
		if(d_leaderboard[i].boost2 == true) {
			leaderboarddoc.innerHTML += "<img src='img/squirrel.png' height='32'>";
			//console.log(d_leaderboard[j] + " has squirrel");
		}
		if(d_leaderboard[i].boost3 == true) {
			leaderboarddoc.innerHTML += "<img src='img/tadpole.png' height='32'>";
			//////////console.log(d_leaderboard[j] + " has tadpole");
		}
		if(d_leaderboard[i].boost4 == true) {
			leaderboarddoc.innerHTML += "<img src='img/lettuce.png' height='32'>";
			//console.log(d_leaderboard[j] + " has lettuce");
		}
		if(d_leaderboard[i].boost5 == true) {
			leaderboarddoc.innerHTML += "<img src='img/carrot.png' height='32'>";
			//////////console.log(d_leaderboard[j] + " has carrot");
		}
		if(d_leaderboard[i].boost6 == true) {
			leaderboarddoc.innerHTML += "<img src='img/slug.png' height='32'>";
			//////////console.log(d_leaderboard[j] + " has slug");
		}
		leaderboarddoc.innerHTML += "<br>";
	}
}

//Update for Leaderboard checking every address
function slowupdateLeaderboard() {
	for(i = 0; i < 5; i++) {
		var lead = d_leaderboard[i];
		//////////console.log(lead);
		var _boost4 = false;
		var _boost5 = false;
		var _boost6 = false;
		var _hatchery = 0;
		if(lead.address == c_spiderowner) {
			d_leaderboard[i].boost1 = true;
		} else {
			d_leaderboard[i].boost1 = false;
		}
		//////////console.log("checked spiderowner for " + i);
		if(lead.address == c_squirrelowner) {
			d_leaderboard[i].boost2 = true;
		}  else {
			d_leaderboard[i].boost2 = false;
		}
		//////////console.log("checked squirrelowner for " + i);
		if(lead.address == c_tadpoleowner) {
			d_leaderboard[i].boost3 = true;
		}  else {
			d_leaderboard[i].boost3 = false;
		}
	}
	
	//sort leaderboard
	d_leaderboard.sort(function (a, b) {
		return b.hatchery - a.hatchery;
	});
	
	showLeaderboard();
}

//Ugly Leaderboard updates. Can't seem to get a loop working for these web3 calls due to delays
function checkLeaderboard0(){
	GetSnail(d_leaderboard[0].address, function(result) {
		d_leaderboard[0].hatchery = result;
		////////console.log(result);
		////////console.log("hatchery of " + d_leaderboard[0].address + " = " + d_leaderboard[0].hatchery);
	});
}

function checkLeaderboard1(){
	GetSnail(d_leaderboard[1].address, function(result) {
		d_leaderboard[1].hatchery = result;
	});
}

function checkLeaderboard2(){
	GetSnail(d_leaderboard[2].address, function(result) {
		d_leaderboard[2].hatchery = result;
	});
}

function checkLeaderboard3(){
	GetSnail(d_leaderboard[3].address, function(result) {
		d_leaderboard[3].hatchery = result;
	});
}

function checkLeaderboard4(){
	GetSnail(d_leaderboard[4].address, function(result) {
		d_leaderboard[4].hatchery = result;
	});
}

function checkLeaderEgg0(){
	ComputeMyEgg(d_leaderboard[0].address, function(result) {
		d_leaderboard[0].egg = result;
	});
}

function checkLeaderEgg1(){
	ComputeMyEgg(d_leaderboard[1].address, function(result) {
		d_leaderboard[1].egg = result;
	});
}

function checkLeaderEgg2(){
	ComputeMyEgg(d_leaderboard[2].address, function(result) {
		d_leaderboard[2].egg = result;
	});
}

function checkLeaderEgg3(){
	ComputeMyEgg(d_leaderboard[3].address, function(result) {
		d_leaderboard[3].egg = result;
	});
}

function checkLeaderEgg4(){
	ComputeMyEgg(d_leaderboard[4].address, function(result) {
		d_leaderboard[4].egg = result;
	});
}

function checkLeaderRed0(){
	GetRed(d_leaderboard[0].address, function(result) {
		d_leaderboard[0].red = result;
	});
}

function checkLeaderRed1(){
	GetRed(d_leaderboard[1].address, function(result) {
		d_leaderboard[1].red = result;
	});
}

function checkLeaderRed2(){
	GetRed(d_leaderboard[2].address, function(result) {
		d_leaderboard[2].red = result;
	});
}

function checkLeaderRed3(){
	GetRed(d_leaderboard[3].address, function(result) {
		d_leaderboard[3].red = result;
	});
}

function checkLeaderRed4(){
	GetRed(d_leaderboard[4].address, function(result) {
		d_leaderboard[4].red = result;
	});
}

function checkLeaderLettuce0(){
	GetLettuce(d_leaderboard[0].address, function(result) {
		////////console.log(d_leaderboard[0].address + " lettuce result is " + result);
		if(result > 0) {
			d_leaderboard[0].boost4 = true;
			////////console.log("We have a lettuce!");
		} else {
			d_leaderboard[0].boost4 = false;
			////////console.log("No lettuce here.");
		}
	});
}

function checkLeaderLettuce1(){
	GetLettuce(d_leaderboard[1].address, function(result) {
		if(result > 0) {
			d_leaderboard[1].boost4 = true;
		} else {
			d_leaderboard[1].boost4 = false;
		}
	});
}

function checkLeaderLettuce2(){
	GetLettuce(d_leaderboard[2].address, function(result) {
		if(result > 0) {
			d_leaderboard[2].boost4 = true;
		} else {
			d_leaderboard[2].boost4 = false;
		}
	});
}

function checkLeaderLettuce3(){
	GetLettuce(d_leaderboard[3].address, function(result) {
		if(result > 0) {
			d_leaderboard[3].boost4 = true;
		} else {
			d_leaderboard[3].boost4 = false;
		}
	});
}

function checkLeaderLettuce4(){
	GetLettuce(d_leaderboard[4].address, function(result) {
		if(result > 0) {
			d_leaderboard[4].boost4 = true;
		} else {
			d_leaderboard[4].boost4 = false;
		}
	});
}

function checkLeaderCarrot0(){
	GetCarrot(d_leaderboard[0].address, function(result) {
		if(result > 0) {
			d_leaderboard[0].boost5 = true;
		} else {
			d_leaderboard[0].boost5 = false;
		}
	});
}

function checkLeaderCarrot1(){
	GetCarrot(d_leaderboard[1].address, function(result) {
		if(result > 0) {
			d_leaderboard[1].boost5 = true;
		} else {
			d_leaderboard[1].boost5 = false;
		}
	});
}

function checkLeaderCarrot2(){
	GetCarrot(d_leaderboard[2].address, function(result) {
		if(result > 0) {
			d_leaderboard[2].boost5 = true;
		} else {
			d_leaderboard[2].boost5 = false;
		}
	});
}

function checkLeaderCarrot3(){
	GetCarrot(d_leaderboard[3].address, function(result) {
		if(result > 0) {
			d_leaderboard[3].boost5 = true;
		} else {
			d_leaderboard[3].boost5 = false;
		}
	});
}

function checkLeaderCarrot4(){
	GetCarrot(d_leaderboard[4].address, function(result) {
		if(result > 0) {
			d_leaderboard[4].boost5 = true;
		} else {
			d_leaderboard[4].boost5 = false;
		}
	});
}

function checkLeaderSlug0(){
	GetSlug(d_leaderboard[0].address, function(result) {
		if(result > 0) {
			d_leaderboard[0].boost6 = true;
		} else {
			d_leaderboard[0].boost6 = false;
		}
	});
}

function checkLeaderSlug1(){
	GetSlug(d_leaderboard[1].address, function(result) {
		if(result > 0) {
			d_leaderboard[1].boost6 = true;
		} else {
			d_leaderboard[1].boost6 = false;
		}
	});
}

function checkLeaderSlug2(){
	GetSlug(d_leaderboard[2].address, function(result) {
		if(result > 0) {
			d_leaderboard[2].boost6 = true;
		} else {
			d_leaderboard[2].boost6 = false;
		}
	});
}

function checkLeaderSlug3(){
	GetSlug(d_leaderboard[3].address, function(result) {
		if(result > 0) {
			d_leaderboard[3].boost6 = true;
		} else {
			d_leaderboard[3].boost6 = false;
		}
	});
}

function checkLeaderSlug4(){
	GetSlug(d_leaderboard[4].address, function(result) {
		if(result > 0) {
			d_leaderboard[4].boost6 = true;
		} else {
			d_leaderboard[4].boost6 = false;
		}
	});
}
	
//Check SpiderQueen owner
function checkSpiderOwner(){
	var spiderownerdoc = document.getElementById('spiderowner');
	currentSpiderOwner(function(req) {
		c_spiderowner = "0x" + req.substring(26, 66);
		if(c_spiderowner == m_account) {
			spiderownerdoc.innerHTML = "YOU!";
		} else {
		spiderownerdoc.innerHTML = formatEthAdr(c_spiderowner);
		}
	});
}

//Current SpiderQueen req
function updateSpiderReq(){
	var spiderreqdoc = document.getElementById('spiderreq');
	spiderReq(function(req) {
		spiderreqdoc.innerHTML = req;
	});
}

//Check SquirrelDuke owner
function checkSquirrelOwner(){
	var squirrelownerdoc = document.getElementById('squirrelowner');
	currentSquirrelOwner(function(req) {
		c_squirrelowner = "0x" + req.substring(26, 66);
		if(c_squirrelowner == m_account) {
			squirrelownerdoc.innerHTML = "YOU!";
		} else {
		squirrelownerdoc.innerHTML = formatEthAdr(c_squirrelowner);
		}
	});
}

//Current SquirrelDuke req
function updateSquirrelReq(){
	var squirrelreqdoc = document.getElementById('squirrelreq');
	squirrelReq(function(req) {
		squirrelreqdoc.innerHTML = req;
	});
}

//Check TadpolePrince owner
function checkTadpoleOwner(){
	var tadpoleownerdoc = document.getElementById('tadpoleowner');
	currentTadpoleOwner(function(req) {
		c_tadpoleowner = "0x" + req.substring(26, 66);
		if(c_tadpoleowner == m_account) {
			tadpoleownerdoc.innerHTML = "YOU!";
		} else {
			tadpoleownerdoc.innerHTML = formatEthAdr(c_tadpoleowner);
		}
	});
}

//Current TadpolePrince req
function updateTadpoleReq(){
	var tadpolereqdoc = document.getElementById('tadpolereq');
	tadpoleReq(function(req) {
		a_tadpoleReq = formatEthValue2(web3.fromWei(req, 'ether'));
		a_tadpoleReq = (parseFloat(a_tadpoleReq) + parseFloat(0.001)).toFixed(3);
		tadpolereqdoc.innerHTML = a_tadpoleReq;
	});
}

//If player owns hot potatoes, display appropriate boosts
function checkPotato(){
	if(c_spiderowner == m_account){
		document.getElementById('spider_yes').style.display = 'inline';
		document.getElementById('spider_no').style.display = 'none';
	} else {
		document.getElementById('spider_yes').style.display = 'none';
		document.getElementById('spider_no').style.display = 'inline';
	}
	if(c_squirrelowner == m_account){
		document.getElementById('squirrel_yes').style.display = 'inline';
		document.getElementById('squirrel_no').style.display = 'none';
	} else {
		document.getElementById('squirrel_yes').style.display = 'none';
		document.getElementById('squirrel_no').style.display = 'inline';
	}
	if(c_tadpoleowner == m_account){
		document.getElementById('tadpole_yes').style.display = 'inline';
		document.getElementById('tadpole_no').style.display = 'none';
	} else {
		document.getElementById('tadpole_yes').style.display = 'none';
		document.getElementById('tadpole_no').style.display = 'inline';
	}
}

//Current harvest cost
function updateHarvestCost(){
	var harvestcostdoc = document.getElementById('harvestcost');
	ComputeHarvest(function(req) {
		a_harvestCost = formatEthValue2(web3.fromWei(req,'ether'));
		a_harvestCost = (parseFloat(a_harvestCost) + parseFloat(0.0001)).toFixed(6);
		harvestcostdoc.innerHTML = a_harvestCost;
	});
}

//Current lettuce req
function updateLettuceReq(){
	var lettucereqdoc = document.getElementById('lettucereq');
	lettuceReq(function(result) {
		a_lettuceReq = result;
		lettucereqdoc.innerHTML = a_lettuceReq;
	});
}

//Check if player owns lettuce
function checkOwnsLettuce(){
	var haslettucedoc = document.getElementById('haslettuce');
	GetLettuce(m_account, function(req) {
		if(req > 0) {
			haslettuce.innerHTML = "You already own a Lettuce.";
			document.getElementById('lettuce_yes').style.display = 'inline';
			document.getElementById('lettuce_no').style.display = 'none';
			document.getElementById('yeslettuce').style.display = 'inline';
			document.getElementById('nolettuce').style.display = 'none';
		} else {
			haslettuce.innerHTML = "Lettuces last 1 Round.";
			document.getElementById('lettuce_no').style.display = 'inline';
			document.getElementById('lettuce_yes').style.display = 'none';
			document.getElementById('nolettuce').style.display = 'inline';
			document.getElementById('yeslettuce').style.display = 'none';
		}
	});
}

//Check if player owns carrot
function checkOwnsCarrot(){
	var hascarrotdoc = document.getElementById('hascarrot');
	GetCarrot(m_account, function(req) {
		if(req > 0) {
			hascarrot.innerHTML = "You already own a Carrot.";
			document.getElementById('carrot_yes').style.display = 'inline';
			document.getElementById('carrot_no').style.display = 'none';
			document.getElementById('yescarrot').style.display = 'inline';
			document.getElementById('nocarrot').style.display = 'none';
			carrottime.innerHTML = req + " more round(s)";
		} else {
			hascarrot.innerHTML = "Carrots last 3 Rounds.";
			document.getElementById('carrot_no').style.display = 'inline';
			document.getElementById('carrot_yes').style.display = 'none';
			document.getElementById('nocarrot').style.display = 'inline';
			document.getElementById('yescarrot').style.display = 'none';
		}
	});
}

//Check if player owns slug
function checkOwnsSlug(){
	var hasslugdoc = document.getElementById('hasslug');
	GetSlug(m_account, function(req) {
		if(req > 0) {
			hasslug.innerHTML = "You already own a Slug.";
			document.getElementById('slug_yes').style.display = 'inline';
			document.getElementById('slug_no').style.display = 'none';
			document.getElementById('yesslug').style.display = 'inline';
			document.getElementById('noslug').style.display = 'none';
		} else {
			hasslug.innerHTML = "Slugs are permanent.";
			document.getElementById('slug_no').style.display = 'inline';
			document.getElementById('slug_yes').style.display = 'none';
			document.getElementById('noslug').style.display = 'inline';
			document.getElementById('yesslug').style.display = 'none';
		}
	});
}

//Current ETH address in use
function updateEthAccount(){
	m_account = web3.eth.accounts[0];
}

//Current leader
function updateLeader(){
	var leaderdoc = document.getElementById('leader');
	var leader2doc = document.getElementById('leader2');
	currentLeader(function(result) {
		l_account = "0x" + result.substring(26,66);
		if(l_account != m_account) {
			leaderdoc.innerHTML = formatEthAdr(l_account) + " is ";
			leader2doc.innerHTML = formatEthAdr(l_account);
		}
		else {
			leaderdoc.innerHTML = "YOU are ";
		}
	});
}

//Current leader snail count
function updateLeaderSnail(){
	var leadersnaildoc = document.getElementById('leadersnail');
	GetSnail(l_account, function(result) {
		a_leaderSnail = result;
		leadersnaildoc.innerHTML = a_leaderSnail;		
	});
}

//Current player snail count
function updatePlayerSnail(){
	var playersnaildoc = document.getElementById('playersnail');
	GetSnail(m_account, function(req) {
		a_playerSnail = req;
		playersnaildoc.innerHTML = a_playerSnail;
	});
}

//Current ETH balance in contract
function updateContractBalance(){
	var contractbalancedoc = document.getElementById('contractbalance');
	web3.eth.getBalance(contractAddress, function(error, result) {
		if(!error) {
			//////console.log(result);
			a_contractBalance = formatEthValue(web3.fromWei(result, 'ether'))
			contractbalancedoc.innerHTML = a_contractBalance; 
		} else {
			//////console.log("didn't work");
		}
	});
}

//Current round
function updateRound(){
	var rounddoc = document.getElementById('round');
	var round2doc = document.getElementById('round2');
	round(function(req) {
		a_round = req;
		rounddoc.innerHTML = a_round;
		round2doc.innerHTML = a_round;
	});
}

//Current snail pot
function updateSnailPot(){
	var snailpotdoc = document.getElementById('snailpot');
	snailPot(function(req) {
		a_snailPot = formatEthValue(web3.fromWei(req,'ether'));
		snailpotdoc.innerHTML = a_snailPot;
	});
}

//Current round pot (10% of snailpot at start of round)
function updateRoundPot(){
	var roundpotdoc = document.getElementById('roundpot');
	if(a_gameActive == true){
		roundPot(function(req) {
			a_roundPot = formatEthValue2(web3.fromWei(req,'ether'));
			roundpotdoc.innerHTML = a_roundPot;
		});
	} else {
		a_roundPot = 0;
		roundpotdoc.innerHTML = a_roundPot;
	}
}

//Current eggpot
function updateEggPot(){
	var eggpotdoc = document.getElementById('eggpot');
	eggPot(function(req) {
		a_eggPot = formatEthValue(web3.fromWei(req,'ether'));
		eggpotdoc.innerHTML = a_eggPot;
	});
}

//Current number of eggs on the market
function updateMarketEgg(){
	var marketeggdoc = document.getElementById('marketegg');
	marketEgg(function(req) {
		a_marketEgg = req;
		marketeggdoc.innerHTML = a_marketEgg;
	});
}

//Maximum eggs that can be bought
function updateMaxEggBuy(){
	var maxeggbuydoc = document.getElementById('maxeggbuy');
	maxeggbuydoc.innerHTML = a_marketEgg / 10;
}

//Maximum ETH in one sale
function updateMaxSaleReward(){
	var maxsalerewarddoc = document.getElementById('maxsalereward');
	maxsalerewarddoc.innerHTML = parseFloat(a_eggPot / 20).toFixed(4);
}

//Current number of acorns
function updateMaxAcorn(){
	var maxacorndoc = document.getElementById('maxacorn');
	maxAcorn(function(req) {
		a_maxAcorn = req;
		maxacorndoc.innerHTML = a_maxAcorn;
	});
}

//Current acorn cost
function updateAcornCost(){
	var acorncostdoc = document.getElementById('acorncost');
	ComputeAcornCost(function(req) {
		a_acornCost = formatEthValue2(web3.fromWei(req,'ether'));
		acorncostdoc.innerHTML = a_acornCost;
	});
}

//Eggs
var playereggdoc = document.getElementById('playeregg');

//Check if player eggs are above player snails, and stop local timer if needed
function slowupdatePlayerEgg(){
	if(a_gameActive == true){
		if(a_playerEgg >= a_playerSnail) {
			ComputeMyEgg(m_account, function(result) {
				if(result == s_playerEgg) {
					z_playerEgg += 1;
				} else {
					z_playerEgg = 0;
				}
				s_playerEgg = formatEthValue(result);
				a_playerEgg = s_playerEgg;
				playereggdoc.innerHTML = a_playerEgg + ".000";
			});
		}
		else {
			z_playerEgg = 0;
		}
	} else {
		playereggdoc.innerHTML = "Round is over!"
	}
}

//Current player eggs
function updatePlayerEgg(){
	if(a_gameActive == true){
		ComputeMyEgg(m_account, function(result) {
			_result = formatEthValue(result);
			if(_result != o_playerEgg) {
				a_playerEgg = _result;
				o_playerEgg = _result;
				playereggdoc.innerHTML = a_playerEgg + ".000";
			}
		});
	} else {
		playereggdoc.innerHTML = "Round is over!"
	}
}

//Fast player egg update
function fastPlayerEgg(){
	if(a_gameActive == true){
		if(z_playerEgg < 2) {
			_prod = parseFloat(a_playerProd / 36000).toFixed(6); //hour prod divided to 100ms intervals
			a_playerEgg = (parseFloat(a_playerEgg) + parseFloat(_prod)).toFixed(4);
			_egg = parseFloat(a_playerEgg).toFixed(3);
			playereggdoc.innerHTML = _egg;
		}
	} else {
		playereggdoc.innerHTML = "Round is over!"
	}
}

//Current player red eggs
function updatePlayerRed(){
	var playerreddoc = document.getElementById('playerred');
	GetRed(m_account, function(req) {
		a_playerRed = req;
		playerreddoc.innerHTML = a_playerRed;
	});
}

//Planned red eggs next round
function updatePlayerNextRed(){
	var nextreddoc = document.getElementById('nextred');
	nextreddoc.innerHTML = Math.floor(Math.sqrt(a_playerSnail));
}

//Current player hatch size
function updatePlayerBoost(){
	var hatchboostdoc = document.getElementById('hatchboost');
	GetProd(m_account, function(req) {
		a_playerBoost = req;
		hatchboostdoc.innerHTML = a_playerBoost;
	});
}

//Current player prod
function updatePlayerProd(){
	var playerproddoc = document.getElementById('playerprod');
	a_playerProd = parseFloat(a_playerSnail / 24).toFixed(3); //100% per day, divided by 24 hours
	playerproddoc.innerHTML = a_playerProd;
}

//Current balance for player
function updatePlayerBalance(){
	var playerbalancedoc = document.getElementById('playerbalance');
	GetMyBalance(function(req) {
		playerbalancedoc.innerHTML = formatEthValue2(web3.fromWei(req,'ether'));
	});
}	

//Current acorns for player
function updatePlayerAcorn(){
	var playeracorndoc = document.getElementById('playeracorn');
	GetAcorn(m_account, function(result) {
		a_playerAcorn = result;
		playeracorndoc.innerHTML = a_playerAcorn;
	});
}

//Current unclaimed share for player
function updatePlayerShare(){
	var playersharedoc = document.getElementById('playershare');
	ComputeMyShare(function(req) {
		playersharedoc.innerHTML = formatEthValue2(web3.fromWei(req,'ether'));
	});
}

/* LOCAL FIELD INPUT */

//Player input on buy
function updateFieldBuy2(){
	f_buy = document.getElementById('fieldBuy').value;
	var fieldbuy2doc = document.getElementById('fieldBuy2');
	fieldbuy2doc.innerHTML = f_buy;
}

//Player input on TadpolePrince
function updateFieldPrince2(){
	var fieldprincedoc = document.getElementById('fieldPrince');
	f_prince = fieldprincedoc.value;
	if(f_prince < a_tadpoleReq) {
		fieldprincedoc.value = a_tadpoleReq; 
	}	
}

//Player input on Acorn buy
function updateFieldTree2(){
	f_tree = document.getElementById('fieldTree').value;
	var fieldtree2doc = document.getElementById('fieldTree2');
	fieldtree2doc.innerHTML = f_tree;
}

//Player input on Red Egg Hatch
function updateRedHatch2(){
	f_redhatch = document.getElementById('fieldRed').value;
	if(f_redhatch > a_playerRed) {
		f_redhatch = a_playerRed;
	}
	var fieldred2doc = document.getElementById('fieldRed2');
	fieldred2doc.innerHTML = f_redhatch;
}

//Buy estimate
function updateBuyEstimate(){
	var buyEstimatedoc = document.getElementById('buyestimate');
	var weitospend = web3.toWei(f_buy,'ether');
	ComputeBuy(weitospend, function(req) {
		buyEstimatedoc.innerHTML = req;
	});	
}

//Sell estimate
function updateSellEstimate(){
	var sellEstimatedoc = document.getElementById('sellestimate');
	ComputeSell(a_playerEgg, function(req) {
		sellEstimatedoc.innerHTML = formatEthValue2(web3.fromWei(req,'ether'));
	});
}

//Acorn estimate
function updateTreeEstimate(){
	var treeEstimatedoc = document.getElementById('treeestimate');
	treeEstimatedoc.innerHTML = (f_tree / a_acornCost).toFixed(0);
}

//Hatch estimate
function updateHatchEstimate(){
	var hatchEstimatedoc = document.getElementById('hatchestimate');
	hatchEstimatedoc.innerHTML = (a_playerEgg * a_playerBoost).toFixed(0);
}

//Red estimate
function updateRedEstimate(){
	var redEstimatedoc = document.getElementById('redestimate');
	redEstimatedoc.innerHTML = f_redhatch * a_playerBoost;
}

/* WEB3 TRANSACTIONS */

//Begin round
function webBeginRound(){
	BeginRound(function(){
	});
}

//Join round
function webJoinRound(){
	var weitospend = web3.toWei(a_joinCost,'ether');
	JoinRound(weitospend, function(){
	});
}

//Fund tree
function webFundTree(){
    var weitospend = web3.toWei(f_tree,'ether');
    FundTree(weitospend, function(){
    });
}

//Claim share
function webClaimShare(){
	ClaimAcornShare(function(){
	});
}

//Buy starting snails
function webGetStarter(){
    var weitospend = web3.toWei(a_joinCost,'ether');
	BuyStartingSnail(weitospend, function(){
	});
}

//Withdraw balance
function webWithdrawBalance(){
	WithdrawBalance(function(){
	});
}

//Pay Thronepot to SnailThrone
function webPayThrone(){
	PayThrone(function(){
	});
}

//Generic check for game/player state
function webCheck(_func){
	if(a_gameActive == false){
		downtime_modal.style.display = "block";
	} else if(a_playerRound != a_round){
		wrongRound_modal.style.display = "block";
	} else {
		_func();
	}
}

//Hatch eggs
function webHatchEgg(){
	var weitospend = web3.toWei(a_hatchCost,'ether');
	HatchEgg(weitospend, function(){
	});
}

//Buy eggs
function webBuyEgg(){
	var weitospend = web3.toWei(f_buy,'ether');
	BuyEgg(weitospend, function(){
	});
}	

//Sell eggs
function webSellEgg(){
	SellEgg(function(){
	});
}

//Become SpiderQueen
function webBecomeSpiderQueen(){
	BecomeSpiderQueen(function(){
	});	
}

//Become SquirrelDuke
function webBecomeSquirrelDuke(){
	BecomeSquirrelDuke(function(){
	});
}

//Become TadpolePrince
function webBecomeTadpolePrince(){
	var weitospend = web3.toWei(f_prince,'ether');
	BecomeTadpolePrince(weitospend, function(){
	});
}

//Claim Red Harvest
function webClaimRedHarvest(){
	var weitospend = web3.toWei(a_harvestCost,'ether');
	GrabRedHarvest(weitospend, function(){
	});
}

//Hatch Red Eggs
function webHatchRed(){
	UseRedEgg(f_redhatch, function(){
	});
}
	
//Find Lettuce
function webFindLettuce(){
		FindLettuce(function(){
		});
}

//Find Carrot
function webFindCarrot(){
	var weitospend = web3.toWei(a_carrotCost,'ether');
	FindCarrot(weitospend, function(){
	});
}

//Find Slug
function webFindSlug(){
	FindSlug(function(){
	});
}

/* CONTRACT ABI */

abiDefinition=[{"constant": true,"inputs": [],"name": "ACORN_PRICE","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyBalance","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "LETTUCE_BASE_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "SPIDER_BASE_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "GetAcorn","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "gotCarrot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeHarvest","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "playerRound","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "round","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "GetRed","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "ClaimAcornShare","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "JoinRound","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [],"name": "BuyStartingSnail","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hatcherySnail","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hasSlug","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "divPerAcorn","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_redAmount","type": "uint256"}],"name": "UseRedEgg","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hasStartingSnail","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "base","type": "uint256"}],"name": "ComputeSquare","outputs": [{"name": "squareRoot","type": "uint256"}],"payable": false,"stateMutability": "pure","type": "function"},{"constant": false,"inputs": [],"name": "FundTree","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [{"name": "_ether","type": "uint256"}],"name": "ComputeAcornBuy","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "redEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeAcornCost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "TADPOLE_BASE_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "roundPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_eggspent","type": "uint256"}],"name": "ComputeSell","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "GetSnail","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "lastHatch","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "playerBalance","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ACORN_MULT","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "ComputeMyEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "acorn","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "FindLettuce","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "SellEgg","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "GetLettuce","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "BecomeSpiderQueen","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "snailPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "BuyEgg","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "GetProd","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "SQUIRREL_BASE_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "GrabRedHarvest","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "HATCHING_COST","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "GetSlug","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "harvestStartTime","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "currentSpiderOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "SLUG_MIN_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "eggPot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "HatchEgg","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "FROGKING_REQ","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "BeginRound","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "marketEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "BecomeTadpolePrince","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "dev","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "prodBoost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "FindCarrot","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [],"name": "harvestStartCost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "WithdrawBalance","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "STARTING_SNAIL","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "harvestEndCost","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "ComputeMyShare","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "currentLeader","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "currentSnailmaster","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "HARVEST_COUNT","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "tadpoleReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "claimedShare","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "thronePot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "ethspent","type": "uint256"}],"name": "ComputeBuy","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "maxAcorn","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "spiderReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "TIME_TO_HATCH_1SNAIL","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "CARROT_COST","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "BecomeSquirrelDuke","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "adr","type": "address"}],"name": "GetCarrot","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "hasLettuce","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "nextRoundStart","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "HARVEST_DURATION","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "JOINING_ROUND_COST","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "GetMyRound","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "claimedEgg","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "HARVEST_DUR_ROOT","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "lettuceReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "FindSlug","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "squirrelReq","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "gameActive","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "currentSquirrelOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "currentTadpoleOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"payable": true,"stateMutability": "payable","type": "fallback"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "acorns","type": "uint256"}],"name": "FundedTree","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "acorns","type": "uint256"}],"name": "ClaimedShare","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "WithdrewBalance","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eggs","type": "uint256"},{"indexed": false,"name": "snails","type": "uint256"},{"indexed": false,"name": "hatchery","type": "uint256"}],"name": "Hatched","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eggs","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "SoldEgg","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eggs","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "playereggs","type": "uint256"}],"name": "BoughtEgg","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"}],"name": "StartedSnailing","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "spiderreq","type": "uint256"},{"indexed": false,"name": "hatchery","type": "uint256"}],"name": "BecameQueen","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "squirrelreq","type": "uint256"},{"indexed": false,"name": "playerreds","type": "uint256"}],"name": "BecameDuke","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "tadpolereq","type": "uint256"}],"name": "BecamePrince","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "roundwinner","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "WonRound","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "round","type": "uint256"}],"name": "BeganRound","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "playerreds","type": "uint256"}],"name": "JoinedRound","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"},{"indexed": false,"name": "playerreds","type": "uint256"}],"name": "GrabbedHarvest","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eggs","type": "uint256"},{"indexed": false,"name": "snails","type": "uint256"},{"indexed": false,"name": "hatchery","type": "uint256"}],"name": "UsedRed","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "snails","type": "uint256"}],"name": "FoundSlug","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "lettucereq","type": "uint256"},{"indexed": false,"name": "playerreds","type": "uint256"}],"name": "FoundLettuce","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": true,"name": "round","type": "uint256"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "FoundCarrot","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "player","type": "address"},{"indexed": false,"name": "eth","type": "uint256"}],"name": "BoostedPot","type": "event"}]

var contractAbi = web3.eth.contract(abiDefinition);
var myContract = contractAbi.at(contractAddress);

function ACORN_PRICE(callback){
    
    
    var outputData = myContract.ACORN_PRICE.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ACORN_PRICE ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetMyBalance(callback){
    
    
    var outputData = myContract.GetMyBalance.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetMyBalance ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function LETTUCE_BASE_REQ(callback){
    
    
    var outputData = myContract.LETTUCE_BASE_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('LETTUCE_BASE_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function SPIDER_BASE_REQ(callback){
    
    
    var outputData = myContract.SPIDER_BASE_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('SPIDER_BASE_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetAcorn(adr,callback){
    
    
    var outputData = myContract.GetAcorn.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetAcorn ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function gotCarrot(callback){
    
    
    var outputData = myContract.gotCarrot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('gotCarrot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeHarvest(callback){
    
    
    var outputData = myContract.ComputeHarvest.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeHarvest ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function playerRound(callback){
    
    
    var outputData = myContract.playerRound.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('playerRound ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function round(callback){
    
    
    var outputData = myContract.round.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('round ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetRed(adr,callback){
    
    
    var outputData = myContract.GetRed.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetRed ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ClaimAcornShare(callback){
    
    
    var outputData = myContract.ClaimAcornShare.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ClaimAcornShare ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function JoinRound(eth,callback){
    
    
    var outputData = myContract.JoinRound.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            //console.log('JoinRound ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function BuyStartingSnail(eth,callback){
    
    
    var outputData = myContract.BuyStartingSnail.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            //console.log('BuyStartingSnail ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function hatcherySnail(callback){
    
    
    var outputData = myContract.hatcherySnail.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('hatcherySnail ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function hasSlug(callback){
    
    
    var outputData = myContract.hasSlug.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('hasSlug ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function divPerAcorn(callback){
    
    
    var outputData = myContract.divPerAcorn.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('divPerAcorn ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function UseRedEgg(_redAmount,callback){
    
    
    var outputData = myContract.UseRedEgg.getData(_redAmount);
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('UseRedEgg ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function hasStartingSnail(callback){
    
    
    var outputData = myContract.hasStartingSnail.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('hasStartingSnail ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeSquare(base,callback){
    
    
    var outputData = myContract.ComputeSquare.getData(base);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeSquare ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function FundTree(eth,callback){
    
    
    var outputData = myContract.FundTree.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            //console.log('FundTree ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeAcornBuy(_ether,callback){
    
    
    var outputData = myContract.ComputeAcornBuy.getData(_ether);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeAcornBuy ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function redEgg(callback){
    
    
    var outputData = myContract.redEgg.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('redEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeAcornCost(callback){
    
    
    var outputData = myContract.ComputeAcornCost.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeAcornCost ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function TADPOLE_BASE_REQ(callback){
    
    
    var outputData = myContract.TADPOLE_BASE_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('TADPOLE_BASE_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function roundPot(callback){
    
    
    var outputData = myContract.roundPot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('roundPot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeSell(_eggspent,callback){
    
    
    var outputData = myContract.ComputeSell.getData(_eggspent);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeSell ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetSnail(adr,callback){
    
    
    var outputData = myContract.GetSnail.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetSnail ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function lastHatch(callback){
    
    
    var outputData = myContract.lastHatch.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('lastHatch ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function playerBalance(callback){
    
    
    var outputData = myContract.playerBalance.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('playerBalance ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ACORN_MULT(callback){
    
    
    var outputData = myContract.ACORN_MULT.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ACORN_MULT ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeMyEgg(adr,callback){
    
    
    var outputData = myContract.ComputeMyEgg.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeMyEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function acorn(callback){
    
    
    var outputData = myContract.acorn.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('acorn ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function FindLettuce(callback){
    
    
    var outputData = myContract.FindLettuce.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('FindLettuce ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function SellEgg(callback){
    
    
    var outputData = myContract.SellEgg.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('SellEgg ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetLettuce(adr,callback){
    
    
    var outputData = myContract.GetLettuce.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetLettuce ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function BecomeSpiderQueen(callback){
    
    
    var outputData = myContract.BecomeSpiderQueen.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('BecomeSpiderQueen ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function snailPot(callback){
    
    
    var outputData = myContract.snailPot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('snailPot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function BuyEgg(eth,callback){
    
    
    var outputData = myContract.BuyEgg.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            //console.log('BuyEgg ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetProd(adr,callback){
    
    
    var outputData = myContract.GetProd.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetProd ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function SQUIRREL_BASE_REQ(callback){
    
    
    var outputData = myContract.SQUIRREL_BASE_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('SQUIRREL_BASE_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetMyEgg(callback){
    
    
    var outputData = myContract.GetMyEgg.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetMyEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GrabRedHarvest(eth,callback){
    
    
    var outputData = myContract.GrabRedHarvest.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            //console.log('GrabRedHarvest ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function HATCHING_COST(callback){
    
    
    var outputData = myContract.HATCHING_COST.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('HATCHING_COST ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetSlug(adr,callback){
    
    
    var outputData = myContract.GetSlug.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetSlug ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function harvestStartTime(callback){
    
    
    var outputData = myContract.harvestStartTime.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('harvestStartTime ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function currentSpiderOwner(callback){
    
    
    var outputData = myContract.currentSpiderOwner.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('currentSpiderOwner ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function SLUG_MIN_REQ(callback){
    
    
    var outputData = myContract.SLUG_MIN_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('SLUG_MIN_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function eggPot(callback){
    
    
    var outputData = myContract.eggPot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('eggPot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function HatchEgg(eth,callback){
    
    
    var outputData = myContract.HatchEgg.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            //console.log('HatchEgg ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function FROGKING_REQ(callback){
    
    
    var outputData = myContract.FROGKING_REQ.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('FROGKING_REQ ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function BeginRound(callback){
    
    
    var outputData = myContract.BeginRound.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('BeginRound ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function marketEgg(callback){
    
    
    var outputData = myContract.marketEgg.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('marketEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function BecomeTadpolePrince(eth,callback){
    
    
    var outputData = myContract.BecomeTadpolePrince.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            //console.log('BecomeTadpolePrince ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function dev(callback){
    
    
    var outputData = myContract.dev.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('dev ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function prodBoost(callback){
    
    
    var outputData = myContract.prodBoost.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('prodBoost ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function FindCarrot(eth,callback){
    
    
    var outputData = myContract.FindCarrot.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData,value: eth},
    function(error,result){
        if(!error){
            //console.log('FindCarrot ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function harvestStartCost(callback){
    
    
    var outputData = myContract.harvestStartCost.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('harvestStartCost ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function WithdrawBalance(callback){
    
    
    var outputData = myContract.WithdrawBalance.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('WithdrawBalance ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function STARTING_SNAIL(callback){
    
    
    var outputData = myContract.STARTING_SNAIL.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('STARTING_SNAIL ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function harvestEndCost(callback){
    
    
    var outputData = myContract.harvestEndCost.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('harvestEndCost ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeMyShare(callback){
    
    
    var outputData = myContract.ComputeMyShare.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeMyShare ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function currentLeader(callback){
    
    
    var outputData = myContract.currentLeader.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('currentLeader ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function currentSnailmaster(callback){
    
    
    var outputData = myContract.currentSnailmaster.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('currentSnailmaster ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function HARVEST_COUNT(callback){
    
    
    var outputData = myContract.HARVEST_COUNT.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('HARVEST_COUNT ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function tadpoleReq(callback){
    
    
    var outputData = myContract.tadpoleReq.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('tadpoleReq ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function claimedShare(callback){
    
    
    var outputData = myContract.claimedShare.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('claimedShare ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function thronePot(callback){
    
    
    var outputData = myContract.thronePot.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('thronePot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function ComputeBuy(ethspent,callback){
    
    
    var outputData = myContract.ComputeBuy.getData(ethspent);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('ComputeBuy ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function maxAcorn(callback){
    
    
    var outputData = myContract.maxAcorn.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('maxAcorn ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function spiderReq(callback){
    
    
    var outputData = myContract.spiderReq.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('spiderReq ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function TIME_TO_HATCH_1SNAIL(callback){
    
    
    var outputData = myContract.TIME_TO_HATCH_1SNAIL.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('TIME_TO_HATCH_1SNAIL ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function CARROT_COST(callback){
    
    
    var outputData = myContract.CARROT_COST.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('CARROT_COST ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function BecomeSquirrelDuke(callback){
    
    
    var outputData = myContract.BecomeSquirrelDuke.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('BecomeSquirrelDuke ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetCarrot(adr,callback){
    
    
    var outputData = myContract.GetCarrot.getData(adr);
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetCarrot ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function hasLettuce(callback){
    
    
    var outputData = myContract.hasLettuce.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('hasLettuce ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function nextRoundStart(callback){
    
    
    var outputData = myContract.nextRoundStart.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('nextRoundStart ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function HARVEST_DURATION(callback){
    
    
    var outputData = myContract.HARVEST_DURATION.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('HARVEST_DURATION ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function JOINING_ROUND_COST(callback){
    
    
    var outputData = myContract.JOINING_ROUND_COST.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('JOINING_ROUND_COST ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function GetMyRound(callback){
    
    
    var outputData = myContract.GetMyRound.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('GetMyRound ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function claimedEgg(callback){
    
    
    var outputData = myContract.claimedEgg.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('claimedEgg ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function HARVEST_DUR_ROOT(callback){
    
    
    var outputData = myContract.HARVEST_DUR_ROOT.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('HARVEST_DUR_ROOT ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function lettuceReq(callback){
    
    
    var outputData = myContract.lettuceReq.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('lettuceReq ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function FindSlug(callback){
    
    
    var outputData = myContract.FindSlug.getData();
    var endstr=web3.eth.sendTransaction({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('FindSlug ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function squirrelReq(callback){
    
    
    var outputData = myContract.squirrelReq.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('squirrelReq ',web3.toDecimal(result));
            callback(web3.toDecimal(result))
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function gameActive(callback){
    
    
    var outputData = myContract.gameActive.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('gameActive ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function currentSquirrelOwner(callback){
    
    
    var outputData = myContract.currentSquirrelOwner.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('currentSquirrelOwner ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}


function currentTadpoleOwner(callback){
    
    
    var outputData = myContract.currentTadpoleOwner.getData();
    var endstr=web3.eth.call({to:contractAddress, from:null, data: outputData},
    function(error,result){
        if(!error){
            //console.log('currentTadpoleOwner ',result);
            callback(result)
        }
        else{
            //console.log('transaction failed with ',error.message)
        }
    });
}

/* LEADERBOARD COMPUTE */

//Compute Leaderboard 2
function computeLeaderboard() {
	
	//check address isn't already on leaderboard
	for(k = 0; k < d_leaderboard.length; k++){
		if(e_hatched.address == d_leaderboard[k].address){
			d_leaderboard[k].hatchery = e_hatched.hatchery;
			break; //to save computation
		}
	}
	
	//else, push new leader
	d_leaderboard.push(e_hatched);
	//sort leaderboard
	d_leaderboard.sort(function (a, b) {
		return b.hatchery - a.hatchery;
	});
	//remove lowest leader
	d_leaderboard.pop();
}

/*
//Compute Leaderboard
function computeLeaderboard() {
	var lowest = d_leaderboard[0].hatchery;
	var position = 0; 
	
	//Check lowest leader
	var i = 0;
	for(i = 0; i < 5; i++) {
		if(d_leaderboard[i].hatchery < lowest) {
			lowest = d_leaderboard[i].hatchery;
			position = i;
		}
	}
	
	//Check if hatcher is already on leaderboard, then check if hatcher can replace lowest
	var notLeader = true;
	for(k = 0; k < 5; k++) {
		if(e_hatched.address == d_leaderboard[k].address) {
			d_leaderboard[k].address = e_hatched.address;
			d_leaderboard[k].hatchery = e_hatched.hatchery;
			notLeader = false;
		}
	}

	var newEntry = false;
	if(notLeader == true && e_hatched.hatchery > lowest) {
		d_leaderboard[position].address = e_hatched.address;
		d_leaderboard[position].hatchery = e_hatched.hatchery;
		newEntry = true;
	}
	showLeaderboard();
}
*/
/* EVENT WATCH */

//Store transaction hash for each event, and check before executing result, as web3 events fire twice
var storetxhash = [];

//Check equivalency
function checkHash(txarray, txhash) {
	var i = 0;
	do {
		if(txarray[i] == txhash) {
			return 0;
		}
		i++;
	}
	while(i < txarray.length);
	//Add new tx hash
	txarray.push(txhash);
	//Remove first tx hash if there's more than 16 hashes saved
	if(txarray.length > 16) {
		txarray.shift();
	}
}

/* EVENTS */

var logboxscroll = document.getElementById('logboxscroll');
var eventlogdoc = document.getElementById("eventlog");

var e_hatched = { address: "", hatchery: 0 };

startBlock = twoDaysBlock;

function runLog(){
	ranLog = true;
	myContract.allEvents({ fromBlock: startBlock, toBlock: 'latest' }).get(function(error, result){
		if(!error){
			console.log(result);
			var i = 0;
			for(i = 0; i < result.length; i++){
				if(checkHash(storetxhash, result[i].transactionHash) != 0) {
					if(i == (result.length - 1)){
						startBlock = result[i].blockNumber;
					}
					dateLog(result[i].blockNumber);
					if(result[i].event == "Hatched"){
						eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " hatched " + result[i].args.eggs + " Eggs into " + result[i].args.snails + " Snails, and has " + result[i].args.hatchery + " Snails in total.";
						e_hatched.address = result[i].args.player;
						e_hatched.hatchery = parseInt(result[i].args.hatchery);
						computeLeaderboard();
							
					} else if(result[i].event == "UsedRed"){
						eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " hatched " + result[i].args.eggs + " Reds into " + result[i].args.snails + " Snails, and has a total of " + result[i].args.hatchery + " Snails.";
						e_hatched.address = result[i].args.player;
						e_hatched.hatchery = result[i].args.hatchery;
						computeLeaderboard();
							
					} else if(result[i].event == "FundedTree"){
						eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " funded the PoaTree with " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " POA and receives " + result[i].args.acorns + " Acorns.";

					} else if(result[i].event == "ClaimedShare"){
						eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " claimed " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " POA thanks to their " + result[i].args.acorns + " Acorns.";
	
					} else if(result[i].event == "WithdrewBalance"){
						eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " withdrew " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " POA from their balance.";

					} else if(result[i].event == "SoldEgg"){
						eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " sold " + result[i].args.eggs + " Eggs for " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " POA.";

					} else if(result[i].event == "BoughtEgg"){
						eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " bought " + result[i].args.eggs + " Eggs for " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " POA.";

					} else if(result[i].event == "StartedSnailing"){
						eventlogdoc.innerHTML += "<br>[~" + datetext + "] Welcome to our newest SnailFarmer, " + formatEthAdr(result[i].args.player) + "!";

					} else if(result[i].event == "BecameQueen"){
						eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " becomes the SpiderQueen!";
							
					} else if(result[i].event == "BecameDuke"){
						eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " becomes the SquirrelDuke!";
							
					} else if(result[i].event == "BecamePrince"){
						eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " becomes the TadpolePrince!";
							
					} else if(result[i].event == "WonRound"){
						eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.roundwinner) + " WINS ROUND " + result[i].args.round + " AND EARNS " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " POA!";
							
					} else if(result[i].event == "BeganRound"){
						eventlogdoc.innerHTML += "<br>[~" + datetext + "] Round " + result[i].args.round + " has started!";
							
					} else if(result[i].event == "JoinedRound"){
						eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " joins the fray, with " + result[i].args.playerreds + " Red Eggs.";
							
					} else if(result[i].event == "GrabbedHarvest"){
						eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " grabbed the Red Harvest by spending " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " POA.";
							
					} else if(result[i].event == "FoundSlug"){
						eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " sacrifices a colossal " + result[i].args.snails + " Snails and finds the Slug.";
							
					} else if(result[i].event == "FoundLettuce"){
						eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " spent " + result[i].args.lettucereq + " Red Eggs to find a Lettuce.";
							
					} else if(result[i].event == "FoundCarrot"){
						eventlogdoc.innerHTML += "<br>[~" + datetext + "] " + formatEthAdr(result[i].args.player) + " found a Carrot for " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " POA.";
							
					} else if(result[i].event == "BoostedPot"){
						eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result[i].args.player) + " makes a generous " + formatEthValue2(web3.fromWei(result[i].args.eth,'ether')) + " POA donation to the SnailPot. Can't wait for next round!";
	
					}
					logboxscroll.scrollTop = logboxscroll.scrollHeight;
				}
			}
		}
		else{
			////console.log("problem!");
		}
	});
}
/*
var hatchEvent = myContract.Hatched();

hatchEvent.watch(function(error, result){
    if(!error){
		////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " hatched " + result.args.eggs + " Eggs into " + result.args.snails + " Snails, and has " + result.args.hatchery + " Snails in total.";
			e_hatched.address = result.args.player;
			e_hatched.hatchery = parseInt(result.args.hatchery); //seems to return an array/object
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
			computeLeaderboard();
		}
	}
});

var usedredEvent = myContract.UsedRed();

usedredEvent.watch(function(error, result){
    if(!error){
		////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " hatched " + result.args.eggs + " Reds into " + result.args.snails + " Snails, and has a total of " + result.args.hatchery + " Snails.";
			e_hatched.address = result.args.player;
			e_hatched.hatchery = result.args.hatchery; //seems to return an array/object
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
			computeLeaderboard();
		}
	}
});

var fundedtreeEvent = myContract.FundedTree();

fundedtreeEvent.watch(function(error, result){
    if(!error){
		////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " funded the EtherTree with " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " POA and receives " + result.args.acorns + " Acorns.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});


var claimedshareEvent = myContract.ClaimedShare();
claimedshareEvent.watch(function(error, result){
    if(!error){
		////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " claimed " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " POA thanks to their " + result.args.acorns + " Acorns.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var withdrewbalanceEvent = myContract.WithdrewBalance();
withdrewbalanceEvent.watch(function(error, result){
    if(!error){
		////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " withdrew " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " POA from their balance.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var soldeggEvent = myContract.SoldEgg();
soldeggEvent.watch(function(error, result){
    if(!error){
		////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " sold " + result.args.eggs + " Eggs for " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " POA.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var boughteggEvent = myContract.BoughtEgg();
boughteggEvent.watch(function(error, result){
    if(!error){
		////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " bought " + result.args.eggs + " Eggs for " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " POA.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var startedsnailingEvent = myContract.StartedSnailing();
startedsnailingEvent.watch(function(error, result){
    if(!error){
		////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] Welcome to our newest SnailFarmer, " + formatEthAdr(result.args.player) + "!";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var becamequeenEvent = myContract.BecameQueen();
becamequeenEvent.watch(function(error, result){
    if(!error){
		////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " becomes the SpiderQueen!";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var becamedukeEvent = myContract.BecameDuke();
becamequeenEvent.watch(function(error, result){
    if(!error){
		////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " becomes the SquirrelDuke!";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var becameprinceEvent = myContract.BecamePrince();
becameprinceEvent.watch(function(error, result){
    if(!error){
		////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " becomes the TadpolePrince!";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var wonroundEvent = myContract.WonRound();
wonroundEvent.watch(function(error, result){
    if(!error){
		////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.roundwinner) + " WINS ROUND " + result.args.round + " AND EARNS " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " POA!";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var beganroundEvent = myContract.BeganRound();
beganroundEvent.watch(function(error, result){
    if(!error){
		////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] Round " + result.args.round + " has started!";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var joinedroundEvent = myContract.JoinedRound();
joinedroundEvent.watch(function(error, result){
    if(!error){
		////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " joins the fray, with " + result.args.playerreds + " Red Eggs.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var grabbedharvestEvent = myContract.GrabbedHarvest();
grabbedharvestEvent.watch(function(error, result){
    if(!error){
		////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " grabbed the Red Harvest by spending " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " ETH.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var foundslugEvent = myContract.FoundSlug();
foundslugEvent.watch(function(error, result){
    if(!error){
		////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " sacrifices a colossal " + result.args.snails + " Snails and finds the Slug.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var foundlettuceEvent = myContract.FoundLettuce();
foundlettuceEvent.watch(function(error, result){
    if(!error){
		////////////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " spent " + result.args.lettucereq + " Red Eggs to find a Lettuce.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var foundcarrotEvent = myContract.FoundCarrot();
foundcarrotEvent.watch(function(error, result){
    if(!error){
		////////////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " found a Carrot for " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " POA.";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});

var boostedpotEvent = myContract.BoostedPot();
boostedpotEvent.watch(function(error, result){
    if(!error){
		////////////console.log(result);
		if(checkHash(storetxhash, result.transactionHash) != 0) {
			date24();
			eventlogdoc.innerHTML += "<br>[" + datetext + "] " + formatEthAdr(result.args.player) + " makes a generous " + formatEthValue2(web3.fromWei(result.args.eth,'ether')) + " POA donation to the SnailPot. Can't wait for next round!";
			logboxscroll.scrollTop = logboxscroll.scrollHeight;
		}
	}
});
*/
//--


