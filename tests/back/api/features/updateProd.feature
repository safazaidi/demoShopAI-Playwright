Feature: Update shopping cart quantities via API
  As a customer
  I want to update quantities in my cart
  So that I can manage my purchase

  
@tag11
  Scenario: Quantity updated successfully
    Given a customer has "Apple iPhone 13" with quantity 1 in their cart
    When the client sends a PATCH request to the cart quantity API to update "Apple iPhone 13" quantity to 2
    Then the API response statuscode should be 200
    And the response should confirm the quantity is updated to 2
    And the database cart entry should reflect quantity 2
    And the response should include a recalculated total price

