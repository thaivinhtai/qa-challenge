| TC ID | Test Scenario | Steps | Expected Result | Requirements                                      |
|-------|--------------|-------|----------------|---------------------------------------------------|
| TC-29 | Enter a valid invite code | 1. Enter a valid invite code <br> 2. Click Submit | The system should proceed to the next step | [REQ-11](../system-requirements/gating-system.md) |
| TC-30 | Enter an invalid invite code | 1. Enter a non-existing invite code <br> 2. Click Submit | The system should display an error: "Invalid invite code" | [REQ-11](../system-requirements/gating-system.md) |
| TC-31 | Check if the email has already been used | 1. Enter an already registered email <br> 2. Click Submit | The system should display an error: "Email has already been used" | [REQ-12](../system-requirements/gating-system.md) |
| TC-32 | Check if the wallet has already been used | 1. Enter a wallet address that has already been used <br> 2. Click Submit | The system should display an error: "Wallet has already been used" | [REQ-12](../system-requirements/gating-system.md) |
| TC-33 | Handle API error responses | 1. Simulate API returning 400 or 429 errors <br> 2. Verify frontend error messages | The system should display appropriate error messages | [REQ-13](../system-requirements/gating-system.md) |
| TC-34 | Prevent multiple form submissions | 1. Click Submit multiple times in quick succession | The system should only send one request | [REQ-14](../system-requirements/gating-system.md)                                          |
