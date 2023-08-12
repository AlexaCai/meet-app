# In Cucumber scenarios need to be stored in .feature text files, referred to as “Gherkin files.”
# Each Gherkin file should contain exactly one feature, which can then have one or multiple scenarios.

# Feature 1
Feature: Filter events by city
    Scenario: When user hasn’t searched for a specific city, show upcoming events from all cities.
        Given user hasn’t searched for any city
        When user is in the initial default view of the app
        Then user should see a list of upcoming events for all cities.

    Scenario: User should see a list of suggestions when they search for a city.
        Given user is in the initial default view of the app
        When user starts typing in the city search input field
        Then user should receive a list of cities (suggestions) that match what is typed.

    Scenario: User can select a city from the suggested list.
        Given user was typing a specific city (ex: Berlin) in the city search input field
        And the list of suggested cities is showing
        When user selects a city (ex: Berlin, Germany) from the suggestion list
        Then user interface should be changed to that city (ex: Berlin, Germany)
        And user should receive a list of upcoming events in that city.
