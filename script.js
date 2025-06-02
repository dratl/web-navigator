const Stack = require('./Stack.js');
const prompt = require('prompt-sync')();
// ------------------------------
// Initialization
// ------------------------------
const backPages = new Stack();
const nextPages = new Stack();
let currentPage = 'Home Page';
let finish = false; // Controls termination of while loop for user input
let showBack = false; // Controls when back navigation is enabled
let showNext = false; // Controls when front navigation is enabled

// ------------------------------
// Helper Functions
// ------------------------------
const showCurrentPage = (action) => {
  console.log(`\n${action}`);
  console.log(`Current page = ${currentPage}`);
  console.log('Back page = ', backPages.peek());
  console.log('Next page = ', nextPages.peek());
}

showCurrentPage("START: "); // Display default page on program start

const newPage = (page) => {
  backPages.push(currentPage);
  currentPage = page;
  while (!nextPages.isEmpty()) {
    nextPages.pop();
  }
  showCurrentPage("NEW: ");
}

const backPage = () => {
  nextPages.push(currentPage);
  currentPage = backPages.pop();
  showCurrentPage("BACK: ")
}

const nextPage = () => {
  backPages.push(currentPage);
  currentPage = nextPages.pop();
  showCurrentPage("NEXT: ");
}

/*
 * The following strings are used to prompt the user
 */
const baseInfo = '\nEnter a url';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'How are you today? ';

/*
 * User Interface Part 1
 */
while (!finish) {
  let instructions = baseInfo; // Initialize instructions with baseInfo
  if (!backPages.isEmpty()) {
    instructions += `, ${backInfo}`; // Append backInfo if backPages is not empty
    showBack = true; // Enable backward navigation
  } else {
    showBack = false; // Disable backward navigation
  }
  if (!nextPages.isEmpty()) {
    instructions += `, ${nextInfo}`; // Append nextInfo if nextPages is not empty
    showNext = true; // Enable forward navigation
  } else {
    showNext = false; // Disable forward navigation
  }
  instructions += `, ${quitInfo}`; // Append quitInfo to enable quitting
  console.log(instructions); // Display final format of instructions
  // Prompt user for input
  const answer = prompt('How are you today?');
  // Convert input to lower case without overriding original
  const lowerCaseAnswer = answer.toLowerCase();
  // Process URL string input
  if (lowerCaseAnswer !== 'b' && lowerCaseAnswer !== 'n' && lowerCaseAnswer !== 'q') {
    newPage(answer);
  } else if ((showNext === true) && (lowerCaseAnswer === 'n')) {
    // we navigate forward a page
    nextPage();
  } else if ((showBack === true) && (lowerCaseAnswer === 'b')) {
    // we navigate back a page
    backPage();
  } else if (lowerCaseAnswer === 'b') {
    // invalid input to a non-available option
    console.log('Cannot go back a page. Stack is empty.');
  } else if (lowerCaseAnswer === 'n') {
    // invalid input to a non-available option
    console.log('Cannot go to the next page. Stack is empty.');
  } else if (lowerCaseAnswer === 'q') {
    // we quit the program
    finish = true;
  }
}