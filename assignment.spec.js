


describe('Flow aimed at presenting the main page and its elements up to signing up', () => {
    /* notes by Oskar Laskowski: 
    usually it is recommented to put one action under "it" so by the book this 
    should have a few it elements each of them described what particular action is taken
    however here I am putting everything in one it as it presents the whole flow up to signing in
    and test - "it" elements should be created in a manner second it does not depend on first one etc. 
    If needed some refactoring may be useful here at a later time - for now I will provide comments explaining each line of code

    Side note - as this app sits on Heroku free tier from time to time in selected scenarios there might be a situation 
    in which app slows down significantly - what is recommended in this situation is usually applying either longer timeout or 
    waiting for an element to be displayed - however as a quick workaround - I am applying change of viewport (making it slightly 
    different than before as it turn out to force the content to be displayed properly

    Also take into consideration that running this script for multiple times without changing username in selected areas will 
    not end up in successful run (as one user can be loggen in just once in the system by his/her unique username/login)    
    
    */
    it('test one', () => {
        // going to our deployed application URL  
        cy.visit('https://yelpcamp-dem0.herokuapp.com/');

        //checking if the element containing the provided text is visible in the 
        cy.contains('Welcome to YelpCamp!').should('exist');
        // or implicitly: cy.contains('Welcome to YelpCamp!') - which is the same 

        // checking if that element exists plus clicking on it
        cy.contains('View All Campgrounds').should('exist').click();

        // from now on whenever presence of numerous elements are being checked  
        // only implicit approach will be presented - no '.should' - to have as clear view of the methods as possible
        // Now on the newly presented page checking a few elements:
        cy.contains('Welcome to YelpCamp');
        cy.contains('View our handpicked campgrounds from all over the world');
        cy.contains('Add New Campground');
        cy.contains('Home');
        cy.contains('Login');
        cy.contains('Sign Up');


        // here explicit approach required to verify we are on the correct webpage (checking if the URL contains /campgraounds)
        cy.url().should('include', '/campgrounds');

        //clicking on Sign Up button
        cy.contains('Sign Up').click();

        //checking if Sign up page is loaded (URL checking)
        cy.url().should('include', '/register');

        //reloading the webpage as sometimes app gets stuck
        cy.reload();

        // checking elements on that section of the app - need to make timeout longer as heroku on free tier is not the fastest in this section
        cy.contains('Sign Up!', { timeout: 30000 });

        // //reloading the webpage as sometimes app gets stuck
        // cy.reload();

        //messing around with viewport so the elements will be displayed
        cy.viewport(1280, 720);


        // again timeout required as application's performance is questionalble (free tier on Heroku)
        cy.contains('Go Back', { timeout: 35000 }).should('exist').click();

        cy.url().should('include', '/campgrounds');

        //Go directly via link to sign up page
        cy.visit('https://yelpcamp-dem0.herokuapp.com/register');

        // typing in username - important - it has to be a user not yet reqistered in the system as otherwise - this message will be 
        // displayed: A user with the given username is already registered
        cy.get('input').eq(0).type('Testuser008');

        //clicking Sign up with password field empty
        cy.contains('Sign Up!').click();

        //messing around with viewport so the elements will be displayed
        cy.viewport(1200, 700);

        //checking error message
        cy.contains('No password was given').should('exist');

        // typing into password field
        cy.get('input').eq(1).type('123456');

        //clicking on Sign up button without username filled in
        cy.contains('Sign Up!').click();

        //checking error message
        cy.contains('No username was given').should('exist');

        // typing in both username and password 
        // in case an error is shown - especially at 2nd or later consecutive run - please increment the value for username field
        // message expected: 
        // values used: 
        // Testuser001, 
        // Testuser002
        // Testuser003
        // Testuser004
        // Testuser005
        // Testuser006
        // Testuser007
        // Testuser008 --- for your first run - it should work fine - for every next run - all of the values of Testuser00# which are 
        // not commented in the code need to be incremented
        cy.get('input').eq(0).type('Testuser008');

        cy.get('input').eq(1).type('123456');

        //clicking on Sign up button with all required data
        cy.contains('Sign Up!').click();

        // checking if the user is automatically logged in - here use the same login as used in successful sign up scenario
        cy.contains('Welcome to YelpCamp Testuser008!');

        cy.contains('Logout').click();

        cy.visit('https://yelpcamp-dem0.herokuapp.com/register');



        // checking if the user can sign up again with the same username - use the same username as for successful sign up 3 steps earlier
        cy.get('input').eq(0).type('Testuser008');

        cy.get('input').eq(1).type('123456');

        //clicking on Sign up button with all required data
        cy.contains('Sign Up!').click();

        // checking if the message is as expected
        cy.contains('A user with the given username is already registered');


    })
})