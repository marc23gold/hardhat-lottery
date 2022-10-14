const { ethers } = require("hardhat");
const { fs } = require("fs");

const FRONT_END_ADDRESSES_FILE =
  "../lottery-frontend/constants/contractAddresses.json";
const FRONT_END_ABI_FILE = "../lottery-frontend/constants/abi.json";

module.exports = async () => {
  if (process.env.UPDATE_FRONT_END) {
    console.log("Updating front end");
    updateContractAddresses();
  }
};

async function updateContractAddresses() {
  const raffle = await ethers.getContract("Raffle");
  const chainId = network.config.chainId.toString();
  const currentAddresses = JSON.parse(
    fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8")
  );
  if (chainId in contractAddress) {
    if (!contractAddress[chainId.includes(raffle.address)]) {
      contractAddress[chainId].push(raffle.address);
    }
    currentAddresses[chainId] = [raffle.address];
  }
  fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses));
}
