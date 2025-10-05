// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TACTStaking
 * @dev Staking contract for TACT tokens with game entry logic
 */
contract TACTStaking is ReentrancyGuard, Ownable {
    IERC20 public tactToken;
    
    uint256 public constant REWARD_RATE = 12; // 12% APY
    uint256 public constant YEAR_IN_SECONDS = 365 days;
    uint256 public constant COOLDOWN_PERIOD = 7 days;
    
    struct StakeInfo {
        uint256 amount;
        uint256 startTime;
        uint256 lastClaimTime;
        uint256 cooldownStart;
    }
    
    mapping(address => StakeInfo) public stakes;
    uint256 public totalStaked;
    
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event CooldownInitiated(address indexed user);
    
    constructor(address _tactToken) {
        tactToken = IERC20(_tactToken);
    }
    
    /**
     * @dev Stake TACT tokens
     * @param amount Amount to stake
     */
    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Cannot stake 0");
        
        StakeInfo storage userStake = stakes[msg.sender];
        
        // Claim pending rewards if any
        if (userStake.amount > 0) {
            _claimRewards(msg.sender);
        }
        
        tactToken.transferFrom(msg.sender, address(this), amount);
        
        userStake.amount += amount;
        userStake.startTime = block.timestamp;
        userStake.lastClaimTime = block.timestamp;
        userStake.cooldownStart = 0; // Reset cooldown
        
        totalStaked += amount;
        
        emit Staked(msg.sender, amount);
    }
    
    /**
     * @dev Initiate unstaking cooldown
     */
    function initiateUnstake() external {
        StakeInfo storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No stake to unstake");
        require(userStake.cooldownStart == 0, "Cooldown already initiated");
        
        userStake.cooldownStart = block.timestamp;
        
        emit CooldownInitiated(msg.sender);
    }
    
    /**
     * @dev Unstake tokens after cooldown period
     */
    function unstake() external nonReentrant {
        StakeInfo storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No stake to unstake");
        require(userStake.cooldownStart > 0, "Cooldown not initiated");
        require(
            block.timestamp >= userStake.cooldownStart + COOLDOWN_PERIOD,
            "Cooldown period not finished"
        );
        
        // Claim pending rewards
        _claimRewards(msg.sender);
        
        uint256 amount = userStake.amount;
        totalStaked -= amount;
        
        delete stakes[msg.sender];
        
        tactToken.transfer(msg.sender, amount);
        
        emit Unstaked(msg.sender, amount);
    }
    
    /**
     * @dev Claim staking rewards
     */
    function claimRewards() external nonReentrant {
        _claimRewards(msg.sender);
    }
    
    /**
     * @dev Internal function to claim rewards
     */
    function _claimRewards(address user) internal {
        StakeInfo storage userStake = stakes[user];
        uint256 reward = calculateRewards(user);
        
        if (reward > 0) {
            userStake.lastClaimTime = block.timestamp;
            tactToken.transfer(user, reward);
            emit RewardsClaimed(user, reward);
        }
    }
    
    /**
     * @dev Calculate pending rewards for a user
     * @param user Address of the user
     * @return Pending reward amount
     */
    function calculateRewards(address user) public view returns (uint256) {
        StakeInfo memory userStake = stakes[user];
        if (userStake.amount == 0) return 0;
        
        uint256 timeStaked = block.timestamp - userStake.lastClaimTime;
        uint256 reward = (userStake.amount * REWARD_RATE * timeStaked) / (100 * YEAR_IN_SECONDS);
        
        return reward;
    }
    
    /**
     * @dev Check if user has sufficient stake for game entry
     * @param user Address of the user
     * @param requiredAmount Minimum stake required
     * @return True if user has sufficient stake
     */
    function canEnterGame(address user, uint256 requiredAmount) external view returns (bool) {
        return stakes[user].amount >= requiredAmount && stakes[user].cooldownStart == 0;
    }
    
    /**
     * @dev Get user's stake info
     * @param user Address of the user
     * @return StakeInfo struct
     */
    function getStakeInfo(address user) external view returns (StakeInfo memory) {
        return stakes[user];
    }
}
