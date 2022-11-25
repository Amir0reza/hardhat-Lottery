// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {LotteryTokenClassic} from "./Token.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

/* Custom errors */
error LotteryIsOpen();
error LotteryIsClose();
error NotEnoughMoney();
error TimestampPassed(uint256 closingTime, uint256 currentTime);
error TooSoonToClose(uint256 closingTime, uint256 currentTime);

/**
 @title An example of a lottery contract
 @author Amirreza
 @notice You can use this contract for running an automated lottery
        using chainlink which will close the lottery when the target
        timestamp is reached
*/
contract Lottery is Ownable, KeeperCompatibleInterface {
    /* State variables */
    uint256 private prizePool;
    uint256 private ownerPool;
    bool private betsOpen;
    uint256 private betsClosingTime;
    mapping(address => uint256) private prize;
    address[] private _slots;

    /* Lottery Variables */
    uint256 private immutable i_purchaseRatio;
    uint256 private immutable i_betPrice;
    uint256 private immutable i_betFee;
    LotteryTokenClassic private immutable i_paymentToken;

    /* Events */
    event LotteryOpened(uint256 indexed closingTimeStamp);
    event LotteryClosed(address indexed winner, uint256 prize);

    /* Modifiers */

    modifier whenBetsClosed() {
        if (betsOpen) revert LotteryIsOpen();
        _;
    }

    modifier whenBetsOpen() {
        if (!betsOpen && block.timestamp >= betsClosingTime)
            revert LotteryIsClose();
        _;
    }

    /* Functions */

    constructor(uint256 _purchaseRatio, uint256 _betPrice, uint256 _betFee) {
        i_purchaseRatio = _purchaseRatio;
        i_betPrice = _betPrice;
        i_betFee = _betFee;
        i_paymentToken = new LotteryTokenClassic();
    }

    /* functions */

    function openBets(uint256 closingTime) public onlyOwner whenBetsClosed {
        if (closingTime <= block.timestamp)
            revert TimestampPassed(closingTime, block.timestamp);
        betsOpen = true;
        betsClosingTime = closingTime;
    }

    function purchaseTokens() public payable {
        i_paymentToken.mint(msg.sender, msg.value * i_purchaseRatio);
    }

    function bet() public whenBetsOpen {
        i_paymentToken.transferFrom(
            msg.sender,
            address(this),
            i_betPrice + i_betFee
        );
        prizePool += i_betPrice;
        ownerPool += i_betFee;
        _slots.push(msg.sender);
    }

    function betMany(uint8 times) public {
        require(times > 1);
        while (times > 0) {
            bet();
            times--;
        }
    }

    function closeLottery() public {
        if (betsClosingTime <= block.timestamp) {
            revert TooSoonToClose(betsClosingTime, block.timestamp);
        }
        if (!betsOpen) revert LotteryIsClose();
        if (_slots.length > 0) {
            address[] memory slot_ = _slots;
            uint256 winnerIndex = getRandomNumber() % slot_.length;
            address winner = slot_[winnerIndex];
            prize[winner] += prizePool;
            prizePool = 0;
            delete (_slots);
        }
        betsOpen = false;
    }

    function prizeWithdraw(uint256 amount) public {
        if (amount > prize[msg.sender]) revert NotEnoughMoney();
        prize[msg.sender] -= amount;
        i_paymentToken.transfer(msg.sender, amount);
    }

    function ownerWithdraw(uint256 amount) public onlyOwner {
        if (amount > ownerPool) revert NotEnoughMoney();
        ownerPool -= amount;
        i_paymentToken.transfer(msg.sender, amount);
    }

    function returnTokens(uint256 amount) public {
        i_paymentToken.burnFrom(msg.sender, amount);
        payable(msg.sender).transfer(amount / i_purchaseRatio);
    }

    function getRandomNumber() private view returns (uint256) {
        return block.difficulty;
    }

    /**
     * @dev This is the function that the chainlink keeper node call
     * they look for the 'upkeepNeeded' to return true
     * The following should be true in order to return true
     * 1. The bets closing time should have passed
     * 2. Lottery should be in an 'Open' state
     */
    function checkUpkeep(
        bytes memory /*checkData*/
    )
        public
        view
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        bool isOpen = (betsOpen == true);
        bool timePassed = (betsClosingTime <= block.timestamp);
        upkeepNeeded = (isOpen && timePassed);
    }

    function performUpkeep(bytes calldata /*checkData*/) external override {
        closeLottery();
    }

    /* pure - View functions */

    function getPrizePool() public view returns (uint256) {
        return prizePool;
    }

    function getOwnerPool() public view returns (uint256) {
        return ownerPool;
    }

    function getBetsOpen() public view returns (bool) {
        return betsOpen;
    }

    function getBetsClosingTime() public view returns (uint256) {
        return betsClosingTime;
    }

    function getPrize(address _winner) public view returns (uint256) {
        return prize[_winner];
    }

    function getPurchaseRatio() public view returns (uint256) {
        return i_purchaseRatio;
    }

    function getBetPrice() public view returns (uint256) {
        return i_betPrice;
    }

    function getBetFee() public view returns (uint256) {
        return i_betFee;
    }

    function getPaymentToken() public view returns (address) {
        return address(i_paymentToken);
    }
}
