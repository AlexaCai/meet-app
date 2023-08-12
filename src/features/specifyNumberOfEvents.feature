# In Cucumber scenarios need to be stored in .feature text files, referred to as “Gherkin files.”
# Each Gherkin file should contain exactly one feature, which can then have one or multiple scenarios.

# Feature 3
Feature:  Specify Number of Events
    Scenario: When user hasn’t specified a number, 32 events are shown by default
        Given user hasn’t specified a specific number of events to be shown
        When  user is on initial default view (upcoming events for all cities) or has searched for a specific city
        Then user should see 32 events shown by default.

    Scenario: User can change the number of events displayed
        Given user specified a specific number of events to be shown (ex: 3)
        When user is on initial default view (upcoming events for all cities) or has searched for a specific city
        Then user should be able to see the specified number of events on screen (ex: 3).
