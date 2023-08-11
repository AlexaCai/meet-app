import puppeteer from 'puppeteer';

//***Feature 2 of the app.
describe('show/hide an event details', () => {

    //***Since both of tests require the browser to be opened and closed, we can separate these actions by way of a set of beforeAll() and afterAll() functions (we can code this here before instead of coding these patterns inside each test individually - both methods work, but using beforeAll and afterAll save you time and makes code cleaner, as each test will only include code relevant to that test rather than containing redundant code that applies to every test).
    let browser;
    let page;
    beforeAll(async () => {
        //***The test starts by launching the browser using Puppeteer (this require the Puppeteer API, so a line of code at the top of the file is needed to import Puppeteer).
        browser = await puppeteer.launch({
            //***headless: false make the test turn off headless mode to actually watch the tests being conducted within the browser.
            headless: false,
            //***Slow down the test in browser by 250ms.
            slowMo: 250, 
            //***Removes any puppeteer/browser timeout limitations.
            timeout: 0 
          });
        //***Puppeteer API is then used to create a new page and navigate to your locally hosted app.
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        //***localhost:3000 page need some time to load the event list, so to ensure this list is loaded before moving on, we use the API method waitForSelector() to wait until a desired element appears (await page.waitForSelector('.event');). In this case, we want to wait for the 'Event' component to be loaded.
        //***This test’s purpose is to test the show/hide functionality of the event details, so it’s imperative that the Event component be loaded before; otherwise, there would be nothing to test.
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        //***Chromium window is closed, completing the test run.
        browser.close();
    });


    //***Actual tests.


    //***Test for scenario 1 of feature 2.
    test('An event element is collapsed by default', async () => {
        //***Puppeteer checks if 'event details' (const eventDetails = await page.$('.event .details);) is not shown to the user, which is done when the code line 'expect(eventDetails).toBeNull();' is executed.
        //***Using page.$() for selecting an element on the page. In this case, we select the .event .details element, as this is what contains the detailed information of an event.
        const eventDetails = await page.$('.event .details');
        //***expect() function used to verify whether this extra element (event details) exists or not.
        expect(eventDetails).toBeNull();
    });

    //***Test for scenario 2 of feature 2.
    test('User can expand an event to see its details', async () => {
        //***Line which is used to simulate the user clicking on the 'Details' button.
        await page.click('.event .button-details');
        //***Puppeteer checks if 'event details' (const eventDetails = await page.$('.event .details);) is shown to the user, which is done when the code line 'expect(eventDetails).toBeDefined();' is executed (because user would have click on the 'Show details' button).
        //***Using page.$() for selecting an element on the page. In this case, we select the .event .details element, as this is what contains the detailed information of an event.
        const eventDetails = await page.$('.event .details');
        //***The expect() function uses the toBeDefined() matcher (instead of the toBeNull() matcher) because in this test we want the event details to exist this time.
        expect(eventDetails).toBeDefined();
    });

    //***Test for scenario 3 of feature 2.
    test('User can collapse an event to hide details', async () => {
        await page.click('.event .button-details');
        const eventDetails = await page.$('.event .details');
        //***toBeNull() matcher is used to ensure the extra details element no longer exists when user click on 'Hide details' button.
        expect(eventDetails).toBeNull();
      });

}); 
