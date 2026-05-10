Feature: Search By Pressing

@tag6
Scenario: Search product by pressing Enter
  Given the user is on the home page for search by pressing
  When the user enters "Book" in the search bar and presses Enter for search by pressing
  Then search results should be displayed for search by pressing