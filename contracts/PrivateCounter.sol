// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title PrivateCounter
 * @dev A simple counter contract with owner-based access control
 * This serves as a foundation for future FHE (Fully Homomorphic Encryption) integration
 */
contract PrivateCounter {
  // State variables
  address public owner;
  uint256 private _counter; // Will be replaced with FHE encrypted value in future versions

  // Events
  event Incremented(address indexed by, uint256 newValue);
  event Decremented(address indexed by, uint256 newValue);
  event Reset(uint256 oldValue);
  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  // Modifiers
  modifier onlyOwner() {
    require(msg.sender == owner, "PrivateCounter: caller is not the owner");
    _;
  }

  modifier validStep(uint256 step) {
    require(step > 0, "PrivateCounter: step must be greater than zero");
    _;
  }

  /**
   * @dev Constructor sets the deployer as the initial owner
   */
  constructor() {
    owner = msg.sender;
    emit OwnershipTransferred(address(0), msg.sender);
  }

  /**
   * @dev Increments the counter by a specified step
   * @param step The amount to increment by
   */
  function increment(uint256 step) external onlyOwner validStep(step) {
    _counter += step;
    emit Incremented(msg.sender, _counter);
  }

  /**
   * @dev Decrements the counter by a specified step
   * @param step The amount to decrement by
   */
  function decrement(uint256 step) external onlyOwner validStep(step) {
    require(_counter >= step, "PrivateCounter: cannot decrement below zero");
    _counter -= step;
    emit Decremented(msg.sender, _counter);
  }

  /**
   * @dev Resets the counter to zero
   */
  function reset() external onlyOwner {
    uint256 oldValue = _counter;
    _counter = 0;
    emit Reset(oldValue);
  }

  /**
   * @dev Returns the current counter value
   * @return The current counter value
   */
  function current() external view returns (uint256) {
    return _counter;
  }

  /**
   * @dev Transfers ownership of the contract to a new account
   * @param newOwner The address of the new owner
   */
  function transferOwnership(address newOwner) external onlyOwner {
    require(newOwner != address(0), "PrivateCounter: new owner is the zero address");
    require(newOwner != owner, "PrivateCounter: new owner is the same as current owner");

    address previousOwner = owner;
    owner = newOwner;
    emit OwnershipTransferred(previousOwner, newOwner);
  }
}
