Feature: E-commerce checkout process

 @tag8
  Scenario: Successful order placement after adding product to cart

    Given the user navigates to the Demo Web Shop homepage
    

    When the user searches for "14.1-inch Laptop"
    And the user selects the product from search results
    And the user clicks on "Add to cart"

    Then the success notification should be displayed

    When the user navigates to the shopping cart
    Then the shopping cart quantity should be updated
    And the selected product should appear in the cart

    When the user agrees to the terms of service
    And the user proceeds to checkout

    And the user completes the billing information
    And the user selects shipping method
    And the user selects payment method
    And the user confirms the order

    Then the order confirmation message should be displayed
