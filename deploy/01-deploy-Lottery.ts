import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import verify from "../utils/verify"
import { ethers } from "hardhat"

export const PURCHASE_RATIO = 5
export const BET_PRICE = ethers.utils.parseEther("1")
export const BET_FEE = ethers.utils.parseEther("0.2")

const deployLottery: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, network } = hre
    const { deploy, log } = deployments

    const deployer = (await ethers.getSigners())[0]
    log(`The deployer address is: ${deployer.address}`)

    const chainId = network.config.chainId

    /* int256 _purchaseRatio, uint256 _betPrice, uint256 _betFee */

    let args = [PURCHASE_RATIO, BET_PRICE, BET_FEE]

    log("Deploying Lottery contract and waiting for confirmations...")

    const lottery = await deploy("Lottery", {
        from: deployer.address,
        log: true,
        args: args,
        waitConfirmations: 1,
    })

    log(`Lottery contract deployed at ${lottery.address}`)
    log("__________________________________________________")

    if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
        // verify the code
        await verify(lottery.address, args)
    }
}

export default deployLottery
deployLottery.tags = ["all", "lottery"]
