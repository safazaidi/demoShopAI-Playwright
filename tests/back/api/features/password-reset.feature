Feature: Password reset API

  Scenario: Request password reset with a valid email
    Given I have a valid email "test.user@email.com"
    When I send a password reset request
    Then the API response status should be 200
    And the password reset request should be successful
