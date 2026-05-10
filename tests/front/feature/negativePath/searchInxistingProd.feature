Feature: Search for a non-existing product

@tag7
Scenario: Search for a non-existing product
  Given the user is on the home page
  When the user enters "Samsung S99 Ultra" in the search bar and clicks on the search button
  Then a message "No products were found that matched your criteria." should be displayed