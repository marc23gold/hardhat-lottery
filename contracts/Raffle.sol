//Raffle

//Enter the lottery (paying some amount)

//Pick a random winner(verifiably random)

//Winner to be selected every X minutes, completely automated

//Chainlink oracle Randomness and Automated Execution (Chainlink Keepers)

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

error Raffle__NotEnoughETHEntered();

contract Raffle {
    //State Variables
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;

    //Events
    event RaffleEnter(address indexed player);

    constructor(uint256 entranceFee) {
        i_entranceFee = entranceFee;
    }

    function enterRaffle() public payable {
        //require msg.value > i_entranceFee
        //or error code
        if (msg.value < i_entranceFee) {
            revert Raffle__NotEnoughETHEntered();
        }
        s_players.push(payable(msg.sender));
        //Events
        //Name events with the function name revert
        emit RaffleEnter(msg.sender);
    }

    function pickRandomWinner() public {}

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayers(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
