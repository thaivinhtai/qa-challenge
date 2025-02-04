# **QA Challenge**

## **Introduction**
This document provides a comprehensive Test Plan and Test Cases for the Invite Code System, Web3 Gating Mechanism, and Frontend Implementation. The QA challenge involves reviewing the requirements, defining test scenarios, and ensuring complete test coverage for the features.

---

## **1. Test Plan**
- [Detailed Test Plan](test/document/test-plan/TEST-PLAN.md)

---

## **2. Automation Test**

### **2.1. Start The Mock-system environment in local using docker-compose**
```
cd app
docker-compose up -d --remove
```

### **2.2. Run the automation test**
At this time, due to time constraints, the automation test implementation is **TBD**. The plan is to utilize **GitHub Actions** for automation test execution and **GitHub Issues** as the Test Management System.

### **2.3. Future Plan for Automation Testing**
- Implement automation test scripts using **Playwright** for testing.
- Integrate **GitHub Actions** to run automation tests on every push/PR.
- Use **GitHub Issues** to track test results, automatically updating issues based on test runs.
- Generate test reports and link them to issues for better tracking.

This approach will enable a scalable and automated test management system within the CI/CD pipeline while reducing costs by leveraging GitHub's built-in features.