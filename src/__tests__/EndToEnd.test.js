import puppeteer from 'puppeteer';


//***End-to-end test for Feature 1.


describe('Filter events by city', () => {

    let browser;
    let page;
    beforeAll(async () => {
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
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('#city-search');
    });

    afterAll(() => {
        browser.close();
    });


    //***Actual tests for Feature 1 - 3 scenarios.


    //***Test for scenario 1 of feature 1.
    test('When user hasn’t searched for a city, show upcoming events from all cities', async () => {
        //***Using page.$$ to select ALL elements rendered the page that have the class name .event. The $$ function returns an array of elements that match the given selector (.event).
        //***Using const page.$('.event') would only select the first element with the class name .event on the page. That cant therefore be used to count the only 32 event elements supposed to be shown be default.
        const eventElements = await page.$$('.event');
        expect(eventElements.length).toBe(32);
    });


    //***Test for scenario 2 of feature 1.
    test('User should see a list of suggestions when they search for a city', async () => {
        await page.click('.city')
        //***Using page.$() for selecting an element on the page. In this case, we select the .suggestions element.
        const showSuggestions = await page.$('.suggestions');
        expect(showSuggestions).toBeTruthy();
    });


    //***Test for scenario 3 of feature 1.
    test('User can select a city from the suggested list', async () => {
        await page.click('.city');
        await page.waitForSelector('.suggestions');
        await page.click('li');
        //***Wait for the UI to update.
        await page.waitForTimeout(500);
        //***Using page.$() for selecting an element on the page. In this case, we select the .event element after user have selected a city suggestion.
        const clickedSuggestion = await page.$('.event');
        expect(clickedSuggestion).toBeTruthy();
    });
});


//***End-to-end test for Feature 2.


describe('Show/hide an event details', () => {

    let browser;
    let page;
    beforeAll(async () => {
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
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });


    //***Actual tests for Feature 2 - 3 scenarios.


    //***Test for scenario 1 of feature 2.
    test('An event element is collapsed by default', async () => {
        //***Using page.$() for selecting an element on the page. In this case, we select the .event .details element, as this is what contains the detailed information of an event.
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });


    //***Test for scenario 2 of feature 2.
    test('User can expand an event to see its details', async () => {
        await page.click('.event .button-details');
        //***Using page.$() for selecting an element on the page. In this case, we select the .event .details element, as this is what contains the detailed information of an event.
        const eventDetails = await page.$('.event .details');
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
        expect(eventDetails).toBeNull();
    });

});


//***End-to-end test for Feature 3.


describe('Specify number of events', () => {

    let browser;
    let page;
    beforeAll(async () => {
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
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });


    // ***Actual tests for Feature 3 - 2 scenarios.


    //***Test for scenario 1 of feature 3.
    test('When user hasn’t specified a number, 32 events are shown by default', async () => {
        //***Using page.$$ to select ALL elements rendered in the page that have the classname .event. The $$ function returns an array of elements that match the given selector (.event).
        //***Using const page.$('.event') would only select the first element with the classname .event on the page. That cannot therefore be used to count the 32 event elements supposed to be shown be default.
        const eventElements = await page.$$('.event');
        expect(eventElements.length).toBe(32);
    });

    //***Test for scenario 2 of feature 3.
    test('User can change the number of events displayed', async () => {
        await page.click('.numberEvents')
        await page.type('.numberEvents', '3');
        //***Using page.$$ to select ALL elements rendered in the page after user has typed 3. The $$ function returns an array of elements, instead of only the first one element.
        const eventElements = await page.$$('.event');
        expect(eventElements.length).toBe(3);
    });
    
});