
Feature: register new user

  @tag1
  Scenario: register new user with valid data
    
    Given I want to navigate to the homePage as a new user
    Then I should see the homePage as a new user
    When I click on the register button as a new user
    Then I should see the registration form as a new user
    When I fill in the registration form with valid data
    Then I should see a confirmation message