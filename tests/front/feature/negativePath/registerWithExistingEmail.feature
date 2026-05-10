Feature: register with existing email
 @tag2
 Scenario: register new user with existing email
 
  Given I want to navigate to the homePage as an existing user
  Then I should see the homePage as an existing user
  When I click on the register button as an existing user
  Then I should see the registration form as an existing user
   When I fill in the registration form with an existing email
   Then I should see an error message indicating that the email is already in use