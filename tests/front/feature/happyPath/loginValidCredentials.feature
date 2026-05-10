Feature: Login With Valid Credials

  @tag3
  Scenario: The user should login with valid credials
    
    Given I want to navigate to the homePage as a valid user
    Then Homepage loads successfully for valid user
    When User want to click on 'Log in' link as a valid user
    Then Login page is displayed for valid user
    When User want to Enter valid credentials as a valid user
    Then Fields accept input for valid user
    When User want to Submit the login form as a valid user
    Then User is logged in as a valid user
    And Account links are visible for valid user