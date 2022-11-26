import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@typechain/hardhat"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-ethers"
import "hardhat-gas-reporter"
import "dotenv/config"
import "hardhat-deploy"
import "solidity-coverage"
import { ethers } from "ethers"
import fs from "fs-extra"

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL!.toString()
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

const encryptedJson =
  fs.readFileSync("./encrypted-publicTest.json", "utf8") || "emptry"

let PRIVATE_KEY: string
if (process.env.WAL_PASS) {
    PRIVATE_KEY = new ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.WAL_PASS)
        .privateKey
} else if (process.env.PRIVATE_KEY !== "empty")  {
    PRIVATE_KEY = process.env.PRIVATE_KEY!
} else {
    PRIVATE_KEY = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
}

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.8.17",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000000,
                    },
                },
            },
        ],
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {},
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    gasReporter: {
        // enabled: true,
        // outputFile: "gas-report.txt",
        // noColors: true,
        currency: "USD",
        // coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH",
    },
    namedAccounts: {
        deployer: {
            default: 0,
            5: 0, // ==> for example for goerli chainId it's second account
        },
        voter: {
            default: 1,
            5: 1, // ==> for example for goerli chainId it's second account
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    mocha: {
        timeout: 300000,
    },
}

export default config
