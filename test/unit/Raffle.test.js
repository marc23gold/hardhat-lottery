//verbose unit test
const { inputToConfig } = require("@ethereum-waffle/compiler");
const { assert, expect } = require("chai");
const { getNamedAccounts, deployments, ethers } = require("hardhat");
const {
  developmentChains,
  networkConfig,
} = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Raffle", async () => {
      let raffle;
      let vrfCoordinatorV2Mock;
      let raffleEntranceFee;
      let deployer;
      const chainId = network.config.chainId;
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);
        raffle = await ethers.getContract("Raffle", deployer);
        vrfCoordinatorV2Mock = await ethers.getContract(
          "VRFCoordinatorV2Mock",
          deployer
        );
        raffleEntranceFee = await raffle.getEntranceFee();
      });

      describe("constructor", async () => {
        it("Initializes the raffle correctly", async () => {
          //Ideally we make our tests have just one assert per it
          const raffleState = await raffle.getRaffleState();
          const interval = await raffle.getInterval();
          assert.equal(raffleState.toString(), "0");
          assert.equal(interval.toString(), networkConfig[chainId]["interval"]);
        });
      });
      describe("enterRaffle", async () => {
        it("Reverts when you don't pay enough", async () => {
          await expect(raffle.enterRaffle()).to.be.revertedWith(
            "Raffle__NotEnoughETHEntered"
          );
        });
        it("records players when they enter", async () => {
          await raffle.enterRaffle({ value: raffleEntranceFee });
          const playerFromContract = await raffle.getPlayers(0);
          assert.equal(playerFromContract, deployer);
        });
      });
    });
