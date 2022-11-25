import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import { deployments, ethers, network } from "hardhat"
import { Lottery, LotteryTokenClassic } from "../../typechain-types/"
import {
    PURCHASE_RATIO,
    BET_PRICE,
    BET_FEE,
} from "../../deploy/01-deploy-Lottery"

network.config.chainId !== 31337
    ? describe.skip
    : describe("lottery unit test", function () {
          let lottery: Lottery,
              paymentToken: LotteryTokenClassic,
              deployer: SignerWithAddress,
              attacker: SignerWithAddress,
              better: SignerWithAddress

          beforeEach(async () => {
              const accounts = await ethers.getSigners()
              deployer = accounts[0]
              attacker = accounts[1]
              better = accounts[2]

              await deployments.fixture(["all"])
              lottery = await ethers.getContract("Lottery", deployer)
              const paymentTokenAddress = await lottery.getPaymentToken()
              paymentToken = await ethers.getContractAt(
                  "LotteryTokenClassic",
                  paymentTokenAddress,
                  deployer
              )
          })

          describe("Constructor", function () {
              it("Sets purchase ratio correctly", async () => {
                  const purchaseRatio = await lottery.getPurchaseRatio()
                  expect(PURCHASE_RATIO).to.eq(purchaseRatio)
              })

              it("Sets bet price correctly", async () => {
                  const betPrice = await lottery.getBetPrice()
                  expect(BET_PRICE).to.eq(betPrice)
              })

              it("Sets bet fee correctly", async () => {
                  const betFee = await lottery.getBetFee()
                  expect(BET_FEE).to.eq(betFee)
              })

              it("Deploy payment token correctly", async () => {
                  const name = await paymentToken.name()
                  const symbol = await paymentToken.symbol()
                  expect("LotteryTokenClassic").to.eq(name)
                  expect("LTC").to.eq(symbol)
              })
          })

          describe("OpenBets function", function () {
              let expectedClosingTime: number
              beforeEach(async () => {
                  const closingTime = (
                      await deployer.provider?.getBlock("latest")
                  )?.timestamp
                  expectedClosingTime = closingTime! + 10
              })

              it("Changes the bets to open", async () => {
                  const txbetsOpen = await lottery.openBets(expectedClosingTime)
                  const betsOpen = await lottery.getBetsOpen()
                  expect(betsOpen).to.eq(true)
              })

              it("Sets closing time correctly", async () => {
                  const txbetsOpen = await lottery.openBets(expectedClosingTime)
                  const closingTime = await lottery.getBetsClosingTime()
                  expect(closingTime.toString()).to.eq(closingTime.toString())
              })

              it("Reverts if called by non owner address", async () => {
                  await expect(
                      lottery.connect(attacker).openBets(expectedClosingTime)
                  ).to.revertedWith("Ownable: caller is not the owner")
              })

              it("Reverts if closing time is not in future", async () => {
                  const closingTime = (
                      await deployer.provider?.getBlock("latest")
                  )?.timestamp
                  const expectedClosingTime = closingTime! - 10
                  await expect(
                      lottery.openBets(expectedClosingTime)
                  ).to.revertedWithCustomError(lottery, "TimestampPassed")
              })
          })

          describe("PurchaseTokens function", function () {
              it("Mint the expected tokens for token buyer", async () => {
                  await lottery.purchaseTokens({
                      value: ethers.utils.parseEther("1"),
                  })
                  const tokenBalance = await paymentToken.balanceOf(
                      deployer.address
                  )
                  expect(ethers.utils.parseEther("5")).to.eq(tokenBalance)
              })
          })

          describe("Bet function", function () {
              beforeEach(async () => {
                  await paymentToken
                      .connect(better)
                      .approve(lottery.address, ethers.utils.parseEther("1.2"))
                  await lottery
                      .connect(better)
                      .purchaseTokens({ value: ethers.utils.parseEther("1") })
                  const closingTime = (
                      await deployer.provider?.getBlock("latest")
                  )?.timestamp
                  const expectedClosingTime = closingTime! + 10
                  await lottery.openBets(expectedClosingTime)
                  await lottery.connect(better).bet()
              })

              it("Correctly transfer token from better account to contract account", async () => {
                  const betterTokenBalance = await paymentToken.balanceOf(
                      better.address
                  )
                  const contractTokenBalance = await paymentToken.balanceOf(
                      lottery.address
                  )
                  expect(betterTokenBalance).to.eq(
                      ethers.utils.parseEther("3.8")
                  )
                  expect(contractTokenBalance).to.eq(
                      ethers.utils.parseEther("1.2")
                  )
              })

              it("Correctly updates pools", async () => {
                  const ownerPoolBalance = await lottery.getOwnerPool()
                  const prizePoolBalance = await lottery.getPrizePool()

                  expect(ownerPoolBalance).to.eq(ethers.utils.parseEther("0.2"))
                  expect(prizePoolBalance).to.eq(ethers.utils.parseEther("1"))
              })
          })

          describe("Correcty run bet 10 times", function () {
              beforeEach(async () => {
                  await paymentToken
                      .connect(better)
                      .approve(lottery.address, ethers.utils.parseEther("12"))
                  await lottery
                      .connect(better)
                      .purchaseTokens({ value: ethers.utils.parseEther("10") })
                  const closingTime = (
                      await deployer.provider?.getBlock("latest")
                  )?.timestamp
                  const expectedClosingTime = closingTime! + 10
                  await lottery.openBets(expectedClosingTime)
                  await lottery.connect(better).betMany(10)
              })

              it("Correctly run bet funstion 10 times", async () => {
                  const betterTokenBalance = await paymentToken.balanceOf(
                      better.address
                  )
                  const contractTokenBalance = await paymentToken.balanceOf(
                      lottery.address
                  )
                  expect(betterTokenBalance).to.eq(
                      ethers.utils.parseEther("38")
                  )
                  expect(contractTokenBalance).to.eq(
                      ethers.utils.parseEther("12")
                  )
              })

              it("Correctly updates pools", async () => {
                  const ownerPoolBalance = await lottery.getOwnerPool()
                  const prizePoolBalance = await lottery.getPrizePool()

                  expect(ownerPoolBalance).to.eq(ethers.utils.parseEther("2"))
                  expect(prizePoolBalance).to.eq(ethers.utils.parseEther("10"))
              })
          })

          describe("CloseLottery function", function () {
              let expectedClosingTime: number
              beforeEach(async () => {
                  await paymentToken
                      .connect(better)
                      .approve(lottery.address, ethers.utils.parseEther("12"))
                  await lottery.connect(better).purchaseTokens({
                      value: ethers.utils.parseEther("10"),
                  })
                  const closingTime = (
                      await deployer.provider?.getBlock("latest")
                  )?.timestamp
                  expectedClosingTime = closingTime! + 15
                  console.log(expectedClosingTime)

                  await lottery.openBets(expectedClosingTime)
                  await lottery.connect(better).betMany(10)
              })

              it("Revert if closing time is not passed", async () => {
                  expect(
                      await lottery.closeLottery()
                  ).to.revertedWithCustomError(lottery, "TooSoonToClose")
              })

              it("Revert if the betting is already close", async () => {

                  expect(
                      await lottery.closeLottery()
                  ).to.revertedWithCustomError(lottery, "LotteryIsClose")
                  console.log(await deployer.provider?.getBlock("latest"))
              })
          })
      })
