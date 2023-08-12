import puppeteer from 'puppeteer';



//***End-to-end test for Feature 1.



describe('Filter events by city', () => {

    let browser;
    let page;
    beforeAll(async () => {
        //***Each test starts by launching the browser using Puppeteer (this require the Puppeteer API, so a line of code at the top of the file is needed to import Puppeteer).
        browser = await puppeteer.launch(
            //     {
            //     //***headless: false make the test turn off headless mode to actually watch the tests being conducted within the browser.
            //     headless: false,
            //     //***Slow down the test in browser by 250ms.
            //     slowMo: 450, 
            //     //***Removes any puppeteer/browser timeout limitations.
            //     timeout: 0 
            //   }
        );
        //***Puppeteer API is then used to create a new page and navigate to locally hosted app.
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('#city-search');
    });

    afterAll(() => {
        //***Chromium window is closed, completing the test run.
        browser.close();
    });


    //***Actual tests for Feature 1 - 3 scenarios.


    //***Test for scenario 1 of feature 1.
    test('When user hasn’t searched for a city, show upcoming events from all cities', async () => {
        //***Using page.$$ to select ALL elements rendered the page that have the class name .event. The $$ function returns an array of elements that match the given selector (.event).
        //***Using const page.$('.event') would only select the first element with the class name .event on the page. That cant therefore be used to count the only 32 event elements supposed to be shown be default.
        //***This checks that by default, when user hasn't search for a city, the 32 default events from all cities are initialy shown.
        const eventElements = await page.$$('.event');
        //***Using the Jest expect function to make an assertion. eventElements.length gets the number of elements in the eventElements array, which represents the count of event items on the page. toBe(32) is checking if the length of the eventElements array is equal to 32. 
        expect(eventElements.length).toBe(32);
    });

    //***Test for scenario 2 of feature 1.
    test('User should see a list of suggestions when they search for a city', async () => {
        await page.click('.city')
        //***Using page.$() for selecting an element on the page. In this case, we select the .suggestions element.
        const showSuggestions = await page.$('.suggestions');
        //***expect() function used to verify whether suggestions list appear or not after clicking on city search input field.
        expect(showSuggestions).toBeTruthy();
    });

    //***Test for scenario 3 of feature 1.
    test('User can select a city from the suggested list', async () => {
        //***Click on the city input seach field to show suggestions.
        await page.click('.city');
        //***Wait for city suggestions to appear.
        await page.waitForSelector('.suggestions');
        //***Click on the first city suggestion.
        await page.click('li');
        //***Wait for the UI to update.
        await page.waitForTimeout(500);
        //***Select an event element in the UI after user have selected a city suggestion.
        const clickedSuggestion = await page.$('.event');
        //***Checks if the clickedSuggestion variable (representing the selected city suggestion) is truthy, meaning that the selected city by the user is indeed present in the UI.
        expect(clickedSuggestion).toBeTruthy();
    });
});



//***End-to-end test for Feature 2.



describe('Show/hide an event details', () => {

    let browser;
    let page;
    beforeAll(async () => {
        //***Each test starts by launching the browser using Puppeteer (this require the Puppeteer API, so a line of code at the top of the file is needed to import Puppeteer).
        browser = await puppeteer.launch(
            // {
            //     //***headless: false make the test turn off headless mode to actually watch the tests being conducted within the browser.
            //     headless: false,
            //     //***Slow down the test in browser by 250ms.
            //     slowMo: 450,
            //     //***Removes any puppeteer/browser timeout limitations.
            //     timeout: 0
            // }
        );
        //***Puppeteer API is then used to create a new page and navigate to your locally hosted app.
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        //***Chromium window is closed, completing the test run.
        browser.close();
    });


    //***Actual tests for Feature 2 - 3 scenarios.


    //***Test for scenario 1 of feature 2.
    test('An event element is collapsed by default', async () => {
        //***Using page.$() for selecting an element on the page. In this case, we select the .event .details element, as this is what contains the detailed information of an event.
        const eventDetails = await page.$('.event .details');
        //***expect() function used to verify whether event details exists or not (if not exist, it means its collapsed as it should).
        expect(eventDetails).toBeNull();
    });

    //***Test for scenario 2 of feature 2.
    test('User can expand an event to see its details', async () => {
        //***Simulate the user clicking on the 'Show details' button.
        await page.click('.event .button-details');
        //***Using page.$() for selecting an element on the page. In this case, we select the .event .details element, as this is what contains the detailed information of an event.
        const eventDetails = await page.$('.event .details');
        //***expect() function used to verify whether event details exists or not (if exist, it means its not collapsed as it should after user has clicks on 'Show details' button).
        expect(eventDetails).toBeDefined();
    });

    //***Test for scenario 3 of feature 2.
    test('User can collapse an event to hide details', async () => {
        //***Simulate the user clicking on the 'Show details' button at first.
        await page.click('.event .button-details');
        //***Simulate the user clicking on the 'Hide details' button after.
        await page.click('.event .button-details');
        //***Using page.$() for selecting an element on the page. In this case, we select the .event .details element, as this is what contains the detailed information of an event.
        const eventDetails = await page.$('.event .details');
        //***expect() function used to verify whether event details exists or not (if not exist, it means its collapsed as it should).
        expect(eventDetails).toBeNull();
    });
});



//***End-to-end test for Feature 3.



describe('Specify number of events', () => {

    // ***Since both of tests require the browser to be opened and closed, we can separate these actions by way of a set of beforeAll() and afterAll() functions (we can code this here before instead of coding these patterns inside each test individually - both methods work, but using beforeAll and afterAll save you time and makes code cleaner, as each test will only include code relevant to that test rather than containing redundant code that applies to every test).
    let browser;
    let page;
    beforeAll(async () => {
        // ***The test starts by launching the browser using Puppeteer (this require the Puppeteer API, so a line of code at the top of the file is needed to import Puppeteer).
        browser = await puppeteer.launch(
            // {
            //     //***headless: false make the test turn off headless mode to actually watch the tests being conducted within the browser.
            //     headless: false,
            //     //***Slow down the test in browser by 250ms.
            //     slowMo: 450,
            //     //***Removes any puppeteer/browser timeout limitations.
            //     timeout: 0
            // }
        );
        // ***Puppeteer API is then used to create a new page and navigate to your locally hosted app.
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        // ***Chromium window is closed, completing the test run.
        browser.close();
    });


    // ***Actual tests for Feature 3 - 2 scenarios.


    //***Test for scenario 1 of feature 3.
    test('When user hasn’t specified a number, 32 events are shown by default', async () => {
        //***Using page.$$ to select ALL elements rendered in the page that have the classname .event. The $$ function returns an array of elements that match the given selector (.event).
        //***Using const page.$('.event') would only select the first element with the classname .event on the page. That cannot therefore be used to count the 32 event elements supposed to be shown be default.
        const eventElements = await page.$$('.event');
        //***Using the Jest expect function to make an assertion. eventElements.length gets the number of elements in the eventElements array, which represents the count of event elements on the page. toBe(32) is checking if the length of the eventElements array is equal to 32. 
        expect(eventElements.length).toBe(32);
    });

    //***Test for scenario 2 of feature 3.
    test('User can change the number of events displayed', async () => {
        //***Simulating user clicking on Number of events input field.
        await page.click('.numberEvents')
        //***Simulating user typing 3 in the input field.
        await page.type('.numberEvents', '3');
        //***Using page.$$ to select ALL elements rendered in the page after user has typed 3. The $$ function returns an array of elements, instead of only the first one element.
        const eventElements = await page.$$('.event');
        //***Using the Jest expect function to make an assertion. eventElements.length gets the number of elements in the eventElements array, which represents the count of event items on the page. toBe(32) is checking if the length of the eventElements array is equal to 32. 
        expect(eventElements.length).toBe(3);
    });
});