# se3350_project-group-3
se3350_project-group-3 created by GitHub Classroom

*This document covers the Deployment and Execution of the Sort-Of Application, Where to find the deployed application after execution and how to test applications features*

 How To Deploy and Execute Sort-Of
 1. Clone the master branch of the github repo to your local code editor (using Github Desktop or "git clone -b master https://github.com/ShaimaaAliECE/se3350_project-group-3.git")
 2. Run the "npm install" command in the terminal to install all the required dependencies
 3. Next enter "expo start" in the terminal to execute and deploy the server
 4. Follow the link in the terminal "Developer tools running on http://localhost:xxxx" or scan the QR code to run the application on a mobile device (You need the expo app on your mobile phone to run Sort-Of on it)
 5. On the Developer tools page select "Run in web browser" or an alternative method if you want to test it on another device. This should start the application!
 6. It may be wise to clear your cache before running this since we attempted to use asych storage for passwords.
 
 How To Test the Sort-Of Application (Release 2)
 1. Once the Application is open the sign up page should be visible. Please enter a username and password and click submit.
 2. You will be redirected to the login page, you must re-enter your credentials and you will be taken to the home screen with the merge sort level, quick sort level, and user data buttons.
    As of right now, only one user can be stored at a time, so if at any point you go back to sign in and create a new user, that old user's information will be removed and you may only login with the new user's information
 3. The quick sort button will take you to a list of levels but this page has no other effects, just to show how other algorithms could be implemented. User data shows history for the merge sort levels 2-5
    Select the merge sort levels button to actually begin testing
 4. A list of levels should appear. The levels avaliable to test include levels 1, 2 3, 4, and 5. You may only test one level after completing the ones before it (you can't do level 3 unless you have done levels 1 and 2)
 5. On the level 1 page a few options are available: one to return to the home page, one to go to the next step in the tutorial and another to go straight to level 2.
 6. The second level has similar options to level 1 except the user is to enter the values for the next step in the algorithm by selecting an empty circle followed by a circle above it with a value.
    Additionally 2 more menu options are avaliable, one to check for feedback on the answer and another depicted as a question mark which repeats the instructions for the current step.
    Starting from this level, the user will be shown their time spent on the level, the 5 minute inactivity timer will be implemented, and the three mistakes and resulting options are implemented.
    Once you have completed the level the time will stop. Select the Return to Home button and level 3 will be unlocked.
 7. The third level has different options from the previous two. Here the user is also required to fill in the empty circles to show how the list is split or merged before entering values.
    A space of any number of dotted circles between solid circles indicates a split in the array. The number selection is similar to that of level 2. As for the menu options the check answer button is used to check both the split/merge as well as the number inputs.
 8. Levels 4 and 5 are of the exact same functionality as level 3 except there are now 20 and 50 numbers.
 9. The user may see the data on levels 2-5 by clicking on the User Data button and selecting a level from the dropdown menu. The user can see the total time spent doing a level, the total number of mistakes on each level, and the number of times a level is attempted.
    This data is cumulative for all users since the application is first run, so changing the user will not overwrite the data, only when the application is closed will it be removed.