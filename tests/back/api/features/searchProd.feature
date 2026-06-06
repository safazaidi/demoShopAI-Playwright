Feature: Product Search via API

@tag10
Scenario: Search existing product by exact name
  Given a product named "Apple iPhone 13" exists in the system
  When the client sends a GET request to the product search API with query "Apple iPhone 13"
  Then the API response status code should equal  200
  And the response should include at least one product with name "Apple iPhone 13"
  And the API response time should be less than 2 seconds