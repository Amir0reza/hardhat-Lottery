// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import {LotteryTokenClassic} from "./Token.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

/* Custom errors */
error LotteryIsOpen();
error LotteryIsClose();
error NotEnoughMoney();
error TimestampPassed(uint256 closingTime, uint256 currentTime);
error TooSoonToClose(uint256 closingTime, uint256 currentTime);

/**
* @title An example of a lottery contract
* @author Amirreza
* @notice You can use this contract for running an automated lottery
        using chainlink which will close the lottery when the target
        timestamp is reached
*/
contract Lottery is AccessControl, KeeperCompatibleInterface {
    /* State variables */
    uint256 private prizePool;
    uint256 private ownerPool;
    bool private betsOpen;
    uint256 private betsClosingTime;
    mapping(address => uint256) private prize;
    address[] private _slots;

    /* access control variables */
    bytes32 public constant LOTTERY_ADMIN_ROLE =
        keccak256("LOTTERY_ADMIN_ROLE");

    /* Lottery Variables */
    uint256 private immutable i_purchaseRatio;
    uint256 private immutable i_betPrice;
    uint256 private immutable i_betFee;
    LotteryTokenClassic private immutable i_paymentToken;

    /* Events */
    event LotteryOpened(uint256 indexed closingTimeStamp);
    event LotteryClosed(address indexed winner, uint256 prize);

    /* Modifiers */
    /**
     * @notice Revert when the lottery is at open state
     */
    modifier whenBetsClosed() {
        if (betsOpen) revert LotteryIsOpen();
        _;
    }

    /**
     * @notice Revert when the lottery is at close state
     */
    modifier whenBetsOpen() {
        if (!betsOpen && block.timestamp >= betsClosingTime)
            revert LotteryIsClose();
        _;
    }

    /* Functions */
    /**
     * @notice Constructor function
     * @param _purchaseRatio Amount of tokens given per ETH paid
     * @param _betPrice Amount of tokens required for placing a bet that goes for the prize pool
     * @param _betFee Amount of tokens required for placing a bet that goes for the owner pool
     */
    constructor(uint256 _purchaseRatio, uint256 _betPrice, uint256 _betFee) {
        i_purchaseRatio = _purchaseRatio;
        i_betPrice = _betPrice;
        i_betFee = _betFee;
        i_paymentToken = new LotteryTokenClassic();
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(LOTTERY_ADMIN_ROLE, msg.sender);
        _grantRole(
            LOTTERY_ADMIN_ROLE,
            0x9E3F993EcF58eea03EcA17A37BAcE4E94700A45D
        );
    }

    /* functions */
    /**
     * @notice Open the lottery for receiving bets
     * @param closingTime The closing timestap of the lottery
     * @dev The timestamp should be smaller than current timestamp otherwise it will revert
     */
    function openBets(
        uint256 closingTime
    ) public onlyRole(LOTTERY_ADMIN_ROLE) whenBetsClosed {
        if (closingTime <= block.timestamp)
            revert TimestampPassed(closingTime, block.timestamp);
        betsOpen = true;
        betsClosingTime = closingTime;
        emit LotteryOpened(closingTime);
    }

    /**
     * @notice Give tokens based on the amount of ETH sent
     */
    function purchaseTokens() public payable {
        i_paymentToken.mint(msg.sender, msg.value * i_purchaseRatio);
    }

    /**
     * @notice Charge the bet price and create a new bet slot with the sender address.
     *         Before calling this function the pool should be approved with the
     *         the amount of tokens
     */
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

    /**
     * @notice Call the bet function `times` times
     *         Before calling this function the pool should be approved with the
     *         the amount of tokens
     * @param times times that the bet function will be called
     */
    function betMany(uint8 times) public {
        require(times > 1);
        while (times > 0) {
            bet();
            times--;
        }
    }

    /**
     * @notice Close the lottery and calculates the prize, if any
     */
    function closeLottery() public {
        if (betsClosingTime >= block.timestamp)
            revert TooSoonToClose(betsClosingTime, block.timestamp);
        if (!betsOpen) revert LotteryIsClose();
        if (_slots.length > 0) {
            address[] memory slot_ = _slots;
            uint256 winnerIndex = getRandomNumber() % slot_.length;
            address winner = slot_[winnerIndex];
            prize[winner] += prizePool;
            emit LotteryClosed(winner, prizePool);
            prizePool = 0;
            delete (_slots);
        } else {
            emit LotteryClosed(address(0), prizePool);
        }
        betsOpen = false;
    }

    /**
     * @notice Withdraw `amount` from that accounts prize pool
     * @param amount amount to be withdrawn
     */
    function prizeWithdraw(uint256 amount) public {
        if (amount > prize[msg.sender]) revert NotEnoughMoney();
        prize[msg.sender] -= amount;
        i_paymentToken.transfer(msg.sender, amount);
    }

    /**
     * @notice Withdraw `amount` from the owner pool
     * @param amount amount to be withdrawn
     */
    function ownerWithdraw(uint256 amount) public onlyRole(LOTTERY_ADMIN_ROLE) {
        if (amount > ownerPool) revert NotEnoughMoney();
        ownerPool -= amount;
        i_paymentToken.transfer(msg.sender, amount);
    }

    /**
     * Burn `amount` tokens and give the equivalent ETH back to user
     * @param amount amount to be burned
     */
    function returnTokens(uint256 amount) public {
        i_paymentToken.burnFrom(msg.sender, amount);
        payable(msg.sender).transfer(amount / i_purchaseRatio);
    }

    /**
     * @notice Get a random number calculated from the previous block randao
     * @dev This only works after The Merge
     */
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

    /**
     * @dev This is the function that the chainlink keeper node call
     * they look for the 'upkeepNeeded' to return true
     * If true this function would be called
     */
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
