## FinanSmart Application Documentation

This documentation outlines the structure and functionality of the FinanSmart application, a Next.js application built for intuitive financial management.

### Features

- **Budget Management:** Create and manage multiple budgets, set budget limits, and track spending against each budget.
- **Expense Tracking:** Add expenses to specific budgets, categorize expenses, and view transaction history.
- **Visualizations and Analytics:** Analyze spending patterns with bar charts and other visualizations.
- **AI Chat Assistant:**  Get financial advice and insights from an AI-powered chatbot.
- **User Authentication:** Securely sign in and sign up using Clerk, a user authentication platform.
- **Upgrade Options:** Access premium features for more advanced financial management.

### Technical Overview

- **Framework:** Next.js 14.2.7
- **Styling:** Tailwind CSS 3.4.1
- **Database:** PostgreSQL (Neon)
- **ORM:** Drizzle-ORM 0.33.0
- **UI Library:** Radix UI
- **Authentication:** Clerk
- **Chatbot:** Google Generative AI (Gemini Pro)

### Project Structure

The application is structured using the Next.js App Router and includes the following key directories:

- **app:** Contains the application's pages and components.
    - **globals.css:** Global CSS styles for the application.
    - **layout.js:** Layout component for the entire application.
    - **page.js:** Main landing page of the application.
    - **(auth):**  Authentication related pages.
        - **sign-in:**  Sign-in page.
        - **sign-up:**  Sign-up page.
    - **(routes):** Pages accessible only after authentication.
        - **dashboard:** Dashboard layout and components.
            - **page.jsx:** Main dashboard page.
            - **_components:**  Components used within the dashboard.
                - **BarChartDashboard.jsx:** Component to display a bar chart with budget overview.
                - **CardInfo.jsx:** Component to display budget summary information.
                - **DashboardHeader.jsx:** Header component for the dashboard.
                - **SideNav.jsx:** Side navigation menu for the dashboard.
        - **budgets:** Pages and components related to budgets.
            - **page.jsx:**  Budgets page.
            - **_components:** Components for budgets.
                - **BudgetItem.jsx:**  Component to display an individual budget item.
                - **BudgetList.jsx:** Component to list all budgets.
                - **CreateBudget.jsx:** Component to create a new budget.
        - **expenses:** Pages and components related to expenses.
            - **page.jsx:** Expenses page.
            - **_components:**  Components for expenses.
                - **AddExpense.jsx:** Component to add a new expense.
                - **ExpenseListTable.jsx:**  Component to display a table of expenses.
                - **EditBudget.jsx:** Component to edit a budget.
                - **TourGuide.jsx:** Component to guide users through the dashboard features.

- **components:**  Reusable UI components.
    - **ui:**  UI components for basic elements like buttons, inputs, dialogs, etc.
        - **alert-dialog.jsx:**  Component for creating alert dialogs.
        - **button.jsx:** Component for creating buttons.
        - **dialog.jsx:** Component for creating modal dialogs.
        - **input.jsx:** Component for creating input fields.
        - **sonner.jsx:**  Component for using the Sonner toast library.

- **lib:**  Utility functions.
    - **utils.js:** Utility functions for handling class names and styles.

- **utils:**  Database configuration and schema.
    - **dbConfig.jsx:** Configuration file for connecting to the PostgreSQL database.
    - **schema.jsx:**  Schema definition for database tables.

### Usage

1. **Sign Up/Sign In:** Create an account or sign in using the provided authentication forms.
2. **Navigate the Dashboard:**  Use the side navigation menu or the header menu to access different sections of the dashboard.
3. **Manage Budgets:** Create new budgets, set budget limits, and track expenses within each budget.
4. **Add Expenses:**  Add new expenses to your budgets, categorize them, and view a history of your spending.
5. **Analyze Spending:**  Use the analytics features to understand your spending patterns and track your financial progress.
6. **Chat with the AI:**  Ask the AI assistant financial questions or seek advice on budgeting and saving money. 
7. **Upgrade to Premium:**  Unlock advanced features for more robust financial management.