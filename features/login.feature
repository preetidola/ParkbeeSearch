Feature: Login functionality

  Scenario: Successful login
    Given I am on the login page
    When I login with "standard_user" and "secret_sauce"
    Then I should see the dashboard
