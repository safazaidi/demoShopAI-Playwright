
Feature: User Authentication via Login API
  @tag9
  Scenario: Successful authentication with valid credentials
    Given a registered user exists in the system
    And the user provides valid email and password
    When the client sends a POST request to the login API
    Then the API response status code should be 200
    And the authentication should be successful
    And the response should contain an authentication token or session ID
    And the API response time should be less than 2 seconds
    

