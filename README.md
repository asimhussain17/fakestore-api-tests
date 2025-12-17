# FakeStore API Automation Tests

## Overview
This project contains API automation tests for the FakeStore API, covering key user workflows using Playwright.

## Tech Stack
- JavaScript
- Playwright (API testing)
- GitHub Actions for CI

## User Stories Covered
1. View products and identify the cheapest in-stock electronics item
2. Add three new clothing products to the catalogue
3. Delete the product with the lowest customer rating

## Notes
- The FakeStore API is a mock service and does not fully enforce data persistence or validation.
- Some behaviours (e.g. duplicate rejection, delete persistence) are dependent on the API implementation.
- Tests focus on validating expected contracts and business logic.

## How to Run
```bash
npm install
npx playwright test
