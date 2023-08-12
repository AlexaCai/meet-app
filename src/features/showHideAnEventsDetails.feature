# In Cucumber scenarios need to be stored in .feature text files, referred to as “Gherkin files.”
# Each Gherkin file should contain exactly one feature, which can then have one or multiple scenarios.

Feature: Show/Hide Event Details
    Scenario: An event element is collapsed by default.
        Given user hasn’t clicked/expand an event element
        When user is viewing upcoming events for all cities or upcoming events for a specific city
        Then user should see a list of upcoming events all collapsed by default.

    Scenario: User can expand an event to see details.
        Given user hasn’t clicked/expand an event element
        When user is viewing upcoming events for all cities or upcoming events for a specific city
        And user clicks on a show details button for a specific event
        Then user should see the event all details.

    Scenario: User can collapse an event to hide details.
        Given user has clicked/expand an event element
        When user clicks on the hide details button
        Then user event view should collapse.