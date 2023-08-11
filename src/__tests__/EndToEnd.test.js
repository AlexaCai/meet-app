import puppeteer from 'puppeteer'; 

//***Feature 2 of the app.
describe('show/hide an event details', () => {

    //***Test for scenario 1 of second feature.
    test('An event element is collapsed by default', async () => {
        //***The test starts by launching the browser using Puppeteer (this require the Puppeteer API, so a line of code at the top of the file is needed to import Puppeteer).
        const browser = await puppeteer.launch();
        //***Puppeteer API is then used to create a new page and navigate to your locally hosted app.
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        //***localhost:3000 page need some time to load the event list, so to ensure this list is loaded before moving on, we use the API method waitForSelector() to wait until a desired element appears (await page.waitForSelector('.event');). In this case, we want to wait for the 'Event' component to be loaded.
        //***This test’s purpose is to test the show/hide functionality of the event details, so it’s imperative that the Event component be loaded before; otherwise, there would be nothing to test.
        await page.waitForSelector('.event');
        //***Puppeteer checks if 'event' details (const eventDetails = await page.$('.event .details);) is not shown to the user, which is done when the code line 'expect(eventDetails).toBeNull();' is executed.
        //***Using page.$() for selecting an element on the page. In this case, we select the .event .details element, as this is what contains the detailed information of an event.
        const eventDetails = await page.$('.event .details');
        //***expect() function used to verify whether this extra element (event details) exists or not.
        expect(eventDetails).toBeNull();
        //***Chromium window is closed, completing the test run.
        browser.close();
    });

});
