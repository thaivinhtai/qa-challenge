| TC ID | Test Scenario | Steps | Expected Result | Requirements                                      |
|-------|--------------|-------|----------------|---------------------------------------------------|
| TC-25 | Require NFT staking for at least one week | 1. Stake NFT for less than 1 week <br> 2. Attempt registration | Registration should not be allowed | [REQ-08](../system-requirements/gating-system.md) |
| TC-26 | Allow registration only if NFT staking is sufficient | 1. Stake NFT for more than 1 week <br> 2. Attempt registration | Registration should be successful | [REQ-08](../system-requirements/gating-system.md) |
| TC-27 | Support delegated wallets for ownership verification | 1. Use a delegated wallet to verify ownership | Registration should be successful if the wallet delegation is valid | [REQ-09](../system-requirements/gating-system.md) |
| TC-28 | Prevent multiple email registrations using delegated wallets | 1. Use different emails but the same delegated wallet <br> 2. Attempt registration multiple times | Registration should be allowed for only one email | [REQ-10](../system-requirements/gating-system.md)                                          |
