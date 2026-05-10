Feature: Search with exact product

@tag5
Scenario: Search product with exact product name
  Given the user is on the home page for search by exact name
  When the user enters "Laptop" in the search bar clicks on the search button for exact name
  Then search results should be displayed for search by exact name
 