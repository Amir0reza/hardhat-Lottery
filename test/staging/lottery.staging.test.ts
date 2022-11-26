import { network, ethers } from "hardhat"
import { Lottery, LotteryTokenClassic } from "../../typechain-types/"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"

network.config.chainId === 31337
    ? describe.skip
    : describe("lottery staging test", function () {
          let lottery: Lottery,
              paymentToken: LotteryTokenClassic,
              deployer: SignerWithAddress

          beforeEach(async () => {
              const accounts = await ethers.getSigners()
              deployer = accounts[0]

              lottery = await ethers.getContract("Lottery", deployer)
              const paymentTokenAddress = await lottery.getPaymentToken()
              paymentToken = await ethers.getContractAt(
                  "LotteryTokenClassic",
                  paymentTokenAddress
              )
          })

          describe("Close the lottery after the required time is passed", function () {
              it("Works with chailink upkeep network and they will call the closeLottery function when needed", async () => {
                  const closingTime = (
                      await deployer.provider?.getBlock("latest")
                  )?.timestamp
                  const expectedClosingTime = closingTime! + 120

                  console.log(
                      `Considering close time equal to ${expectedClosingTime}`
                  )

                  // setup listener
                  await new Promise<void>(async (resolve, reject) => {
                      lottery.once("LotteryClosed", async () => {
                          console.log("Lottery is closed and the event fired!")
                          try {
                              // add our assert here
                              const prizePool = await lottery.getPrizePool()
                              const betsOpen = await lottery.getBetsOpen()

                              expect(prizePool.toString()).to.eq("0")
                              expect(betsOpen).to.eq(false)
                              resolve()
                          } catch (e) {
                              console.log(e)
                              reject(e)
                          }
                      })

                      // opening the lottery
                      const tx = await lottery.openBets(expectedClosingTime)
                      console.log(`Lottery is open with tx: ${tx.hash}`)
                      console.log("Waiting for chainlink to close it ...")
                  })
              })
          })
      })
