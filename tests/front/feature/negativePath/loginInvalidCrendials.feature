Feature: Login with Invalid Credentials

  @tag4
  Scenario: User attempts to log in with invalid credentials
    Given I am on the homepage
    When I click on the "Log in" link
    Then the login page should be displayed
    When I enter invalid credentials
    Then the fields should accept input
    Then an error message about invalid login should be displayed