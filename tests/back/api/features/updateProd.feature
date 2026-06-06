Feature: Update shopping cart quantities via API
  As a customer
  I want to update quantities in my cart
  So that I can manage my purchase

  Background:
    Given the test database is initialized using dbManager.js
    And the database contains a user with email "customer@example.com"
    And the database contains a product "Apple iPhone 13" priced at 999.99
    And the user's cart contains 1 unit of "Apple iPhone 13" with unit price 999.99
@tag11
  Scenario: Quantity updated successfully
    When the client sends a PATCH request to the cart quantity API to update "Apple iPhone 13" quantity to 2
    Then the API response statuscode should be 200
    And the response should confirm the quantity is updated to 2
    And the database cart entry should reflect quantity 2
@tag12
  Scenario: Total price recalculated after quantity update
    When the client sends a PATCH request to the cart quantity API to update "Apple iPhone 13" quantity to 3
    Then the API response statuscode should be 200
    And the response should include a recalculated total price of 2999.97
    And the database cart entry total should equal 2999.97
@tag13
  Scenario: Invalid cart quantities rejected
    When the client sends a PATCH request to the cart quantity API to update "Apple iPhone 13" quantity to 0
    Then the API response statuscode should be 400
    And the response should contain "Invalid quantity"
    And the database cart entry should remain unchanged with quantity 1