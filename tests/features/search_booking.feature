Feature: Booking Search on ParkBee

  Scenario: Booking tab shows error when searching with empty location
    Given I am on the ParkBee homepage
    When I click the booking search button
    Then the search field should display an error outline

  Scenario: Selecting autocomplete location navigates to results page automatically
    Given I am on the ParkBee homepage
    When I type "Osdorp" in the search field
    And I select "Osdorp Amsterdam, NL" from suggestions
    Then I should be navigated to the search results page
    Then I should see recommended location
    Then the map should be visible
    Then I should see the auto-filled from and until date/time
    




