Feature: Yahoo Account Signup

  Scenario: User signs up for a new Yahoo account
    Given I am on the Yahoo signup page
    When I fill in the signup form with valid details
    And I submit the signup form
    Then I should see the account creation confirmation or next step
