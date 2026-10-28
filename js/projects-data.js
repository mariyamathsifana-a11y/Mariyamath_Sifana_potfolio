/**
 * Mariyamath Sifana - Portfolio Projects Data
 * Authentic project details extracted from resume and GitHub repositories:
 * - orangeHrm_antigrativity_project
 * - playwright_automation_testing_project
 * - selenium_Automation_project
 */

window.projectsData = [
  {
    id: "orangehrm-playwright",
    title: "OrangeHRM — Antigravity Playwright Automation",
    subtitle: "End-to-End Automated Testing Suite using Playwright & TypeScript",
    category: "automation",
    type: "Automation Framework",
    github: "https://github.com/mariyamathsifana-a11y/orangeHrm_antigrativity_project",
    statusBadge: "Active Repository",
    statusColor: "emerald",
    highlight: "Page Object Model (POM) with Playwright & Antigravity AI",
    description: "An automated end-to-end test framework built using Playwright, TypeScript, and Google Antigravity. Employs modular Page Object Model (POM) design to validate core OrangeHRM business workflows including authentication, admin management, and directory lookups.",
    technologies: ["Playwright", "TypeScript", "Page Object Model", "Antigravity", "Node.js", "HTML Reporting"],
    coverage: [
      "Modular Page Object Model with dedicated page classes (LoginPage, AdminPage, DashboardPage, DirectoryPage)",
      "Automated test specifications: login.spec.ts, admin.spec.ts, dashboard.spec.ts, directory.spec.ts",
      "Robust locator strategies, dynamic waits, and hard/soft assertions",
      "Playwright HTML test reports and trace viewer artifacts generation",
      "Cross-browser execution configuration in playwright.config.ts"
    ],
    repositoryStructure: [
      "pages/loginpage.ts - Encapsulated login fields, submit action, and error assertions",
      "pages/adminpage.ts - User management search, filters, and role configurations",
      "pages/dashboardpage.ts - Quick launch widgets and metric verifications",
      "pages/directorypage.ts - Employee directory search and contact card validations",
      "tests/login.spec.ts - Positive & negative login workflows",
      "tests/admin.spec.ts - System user search and CRUD validation",
      "playwright.config.ts - Multi-project browser config (Chromium, Firefox, WebKit)"
    ],
    codeSnippet: `// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';

test('Verify OrangeHRM login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');
  await expect(page).toHaveURL(/.*dashboard/);
});`
  },
  {
    id: "playwright-web-automation",
    title: "Playwright Web Automation Suite",
    subtitle: "25+ Comprehensive UI & Interaction Automation Scenarios",
    category: "automation",
    type: "Automation Practice",
    github: "https://github.com/mariyamathsifana-a11y/playwright_automation_testing_project",
    statusBadge: "Active Repository",
    statusColor: "emerald",
    highlight: "Modular POM covering 25+ Web Interaction Patterns",
    description: "Extensive web automation repository practicing modern Playwright features with TypeScript. Features over 25 distinct automation scenarios paired with reusable Page Object classes, dynamic test data handling, and assertions for complex UI components.",
    technologies: ["Playwright", "TypeScript", "POM Architecture", "Test Data", "Web Interactions"],
    coverage: [
      "25+ automated specs: alerts, drag & drop, date picker, file upload, download, iFrames, and sliders",
      "Multi-window tab switching, hover menus, prompt modals, and keyboard actions",
      "Corresponding reusable Page Object Model classes in pages/ directory",
      "Parameterized test datasets in testData/ for data-driven testing",
      "Flaky test mitigation with auto-waiting and resilient Playwright locators"
    ],
    repositoryStructure: [
      "tests/alerts.spec.ts & pages/alertsPage.ts - JS Alert, Confirm, and Prompt handling",
      "tests/dragAndDrop.spec.ts & pages/dragAnddropPage.ts - Drag and drop coordinate actions",
      "tests/fileUpload.spec.ts & pages/FileUploadpage.ts - File input manipulation and validation",
      "tests/downloadTest.spec.ts & pages/DownloadPage.ts - File download stream verification",
      "tests/iFrameTest.spec.ts & pages/iFramePage.ts - Nested iframe frameLocator switching",
      "tests/datePicker.spec.ts & pages/datePickerPage.ts - Calendar date selection logic",
      "tests/multipleWindows.spec.ts & pages/multipleWindow.ts - Multi-tab context management"
    ],
    codeSnippet: `// tests/dragAndDrop.spec.ts
import { test, expect } from '@playwright/test';
import { DragAndDropPage } from '../pages/dragAnddropPage';

test('Verify drag and drop interaction', async ({ page }) => {
  const dndPage = new DragAndDropPage(page);
  await dndPage.goto();
  await dndPage.dragSourceToTarget();
  await expect(dndPage.targetBox).toHaveText('Dropped!');
});`
  },
  {
    id: "selenium-testng-automation",
    title: "Selenium WebDriver & TestNG Framework",
    subtitle: "Java Maven Framework with Page Object Model & TestNG XML Suites",
    category: "automation",
    type: "Automation Framework",
    github: "https://github.com/mariyamathsifana-a11y/selenium_Automation_project",
    statusBadge: "Active Repository",
    statusColor: "emerald",
    highlight: "Maven POM, TestNG XML Suite, & Java BaseTest Architecture",
    description: "Robust automated testing framework built with Selenium WebDriver, Java, TestNG, and Apache Maven. Implements clean Page Object Model separation with reusable base test classes, utilities, and structured TestNG XML test suites.",
    technologies: ["Selenium WebDriver", "Java", "TestNG", "Apache Maven", "Page Object Model", "XML Suites"],
    coverage: [
      "Structured Maven architecture (pom.xml, testng.xml, src/test/java)",
      "Base class with @BeforeMethod / @AfterMethod browser lifecycle management",
      "Automated test suites: AlertTests, DoubleClickTest, DragAndDropTest, FileUploadTest, MouseHoverTest, NewTabTest",
      "Dedicated Page classes: AlertPages, DoubleClickPage, DragAndDropPage, FileUploadPage, MouseHoverPage, NewTabPage",
      "Explicit WebDriverWait synchronization for dynamic element loading"
    ],
    repositoryStructure: [
      "pom.xml - Maven dependencies for Selenium Java, TestNG, and WebDriverManager",
      "testng.xml - Suite and test configurations for parallel or batch test execution",
      "src/test/java/base/ - BaseTest with setup/teardown browser hooks",
      "src/test/java/pages/ - Page Object classes encapsulating WebElements and actions",
      "src/test/java/tests/ - TestNG test classes with @Test annotations and assertions",
      "src/test/java/utils/ - Helper utilities for screenshot capture and explicit waits"
    ],
    codeSnippet: `// src/test/java/tests/AlertTests.java
package tests;
import base.BaseTest;
import pages.AlertPages;
import org.testng.Assert;
import org.testng.annotations.Test;

public class AlertTests extends BaseTest {
    @Test
    public void testSimpleAlertHandling() {
        AlertPages alertPage = new AlertPages(driver);
        alertPage.triggerAlert();
        String alertText = alertPage.getAlertTextAndAccept();
        Assert.assertEquals(alertText, "Expected Alert Text");
    }
}`
  },
  {
    id: "giga-obs-manual-testing",
    title: "GIGA OBS Automobiles — Manual Testing",
    subtitle: "End-to-End Test Case Design, Execution & Defect Lifecycle Management",
    category: "manual",
    type: "Manual QA Suite",
    github: null,
    statusBadge: "Verified Project",
    statusColor: "blue",
    highlight: "Multi-Module Manual Test Suite & Defect Reporting",
    description: "Prepared and executed exhaustive test cases across the GIGA OBS Automobiles platform. Validated Customer, Service Provider, and Admin portals, covering user authentication, OTP verification, service scheduling, order tracking, and payment processing.",
    technologies: ["Manual Testing", "Test Case Design", "Defect Reporting", "Bug Life Cycle", "Regression Testing", "Smoke & Sanity"],
    coverage: [
      "Designed detailed test scenarios and test cases with step-by-step preconditions and test data",
      "Verified Customer, Service Provider, and Admin modules for functional consistency",
      "Tested Registration, Login, OTP verification, Profile management, and Services booking",
      "Validated Order creation, Status tracking, and Payment gateway workflow integration",
      "Documented defects with severity, priority, screenshots, and reproduction steps in bug tracking templates"
    ],
    repositoryStructure: [
      "Test Scenarios & Test Case Specifications (Positive, Negative, Boundary Value)",
      "Functional, UI, Smoke, Sanity, Regression, and Retesting verification runs",
      "Defect Log: Defect ID, Summary, Steps to Reproduce, Severity, Priority, Status"
    ],
    codeSnippet: `/* Sample Test Case Matrix */
Test Case ID: TC_GIGA_AUTH_004
Module: Customer Authentication - OTP Verification
Preconditions: Customer registered with valid mobile number
Test Steps:
  1. Navigate to OTP entry screen
  2. Enter expired 6-digit OTP
  3. Click 'Verify & Proceed'
Expected Result: Error message 'OTP has expired. Please request a new one' is displayed.
Actual Result: Pass | Severity: Major | Priority: High`
  },
  {
    id: "sauce-demo-ecommerce",
    title: "Sauce Demo — E-Commerce Testing",
    subtitle: "Complete E-Commerce Workflow Verification & Defect Analysis",
    category: "manual",
    type: "Functional Testing",
    github: null,
    statusBadge: "Verified Project",
    statusColor: "blue",
    highlight: "End-to-End E-Commerce Workflow & Boundary Testing",
    description: "Conducted in-depth manual and functional testing of the Sauce Demo e-commerce web application. Validated user authentication edge cases, product catalog filtering, cart persistence, and the complete multi-step checkout workflow.",
    technologies: ["Manual Testing", "Functional Testing", "E-Commerce QA", "Regression Testing", "Negative Testing"],
    coverage: [
      "Verified login with standard, locked-out, problem, and performance glitch users",
      "Tested product sorting (name A-Z, Z-A, price low-high, high-low) and visual accuracy",
      "Validated shopping cart addition, removal, badge counters, and item persistence",
      "Tested end-to-end checkout: shipping details validation, order overview calculation, and finish screen",
      "Logged edge cases and unexpected UI behavioral deviations"
    ],
    repositoryStructure: [
      "Authentication Scenarios Matrix (Standard User vs Locked Out User)",
      "Product Catalog Sorting & Filtering Validation Suite",
      "Shopping Cart & Checkout Workflow Test Matrix",
      "Defect Documentation & Severity Classification"
    ],
    codeSnippet: `/* E-Commerce Workflow Test Specification */
Suite: Sauce Demo Checkout Workflow
Test Scenarios:
  - Valid checkout with all required shipping fields
  - Blank First Name / Last Name / Postal Code validation errors
  - Total calculation with tax verification
  - Cart reset on order completion`
  },
  {
    id: "api-performance-practice",
    title: "API & Performance Testing Practice",
    subtitle: "REST API Validation with Postman & Load Testing with Apache JMeter",
    category: "api",
    type: "API & Performance",
    github: null,
    statusBadge: "Skill Practice",
    statusColor: "purple",
    highlight: "Postman Collections, Status Assertions & JMeter Basics",
    description: "Hands-on practice in backend API verification using Postman and baseline performance testing concepts using Apache JMeter. Executed RESTful endpoint validations across HTTP methods and database integrity checks using SQL.",
    technologies: ["Postman", "Apache JMeter", "REST API", "JSON", "SQL", "Status Validation"],
    coverage: [
      "Created Postman collections with parameterized environments and variables",
      "Validated HTTP status codes (200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Error)",
      "Verified response payload schemas, header validations, and JSON key assertions",
      "Practiced Apache JMeter Thread Groups, HTTP Requests, View Results Tree, and response time metrics",
      "Executed SQL queries for backend data verification and database consistency checks"
    ],
    repositoryStructure: [
      "Postman Collections: Authentication, CRUD user endpoints, and error handling",
      "JMeter Test Plan (.jmx): Thread Groups, HTTP Request Defaults, Listeners",
      "SQL Validation Queries: SELECT, INSERT, UPDATE, JOINs for test data verification"
    ],
    codeSnippet: `// Postman Test Script
pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains valid user payload", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("id");
    pm.expect(jsonData.email).to.include("@");
});`
  },
  {
    id: "dormsearch-project",
    title: "DormSearch Accommodation Finder",
    subtitle: "Accommodation Discovery Platform for Students and Professionals",
    category: "web",
    type: "Academic Project",
    github: null,
    statusBadge: "BCA Project",
    statusColor: "indigo",
    highlight: "Student & Professional Accommodation Solution",
    description: "Designed to assist students and working professionals in locating hostels, PG rooms, and accommodation near their universities or workplaces tailored to specific budgets, amenities, and room preferences.",
    technologies: ["Web Technologies", "SQL Database", "System Design", "UI Design", "BCA Capstone"],
    coverage: [
      "User accommodation search by locality, proximity, and budget filters",
      "Hostel and room detail listings with amenities, rent details, and contact options",
      "SQL database schema design for properties, room types, owners, and inquiries",
      "Requirements gathering, system flow modeling, and user journey mapping"
    ],
    repositoryStructure: [
      "System Requirements Specification (SRS) & Architecture Plan",
      "Relational Database Schema (Hostels, Rooms, Bookings, Users)",
      "UI wireframes and responsive web interface design"
    ],
    codeSnippet: `-- Sample Database Schema for Accommodation Listings
CREATE TABLE hostels (
    hostel_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    locality VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    monthly_rent DECIMAL(10,2) NOT NULL,
    room_type ENUM('Single', 'Double', 'Triple', 'Dormitory'),
    amenities TEXT,
    contact_phone VARCHAR(20)
);`
  }
];
