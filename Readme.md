#Web Navigator

Web Navigator is a project that simulates basic web browser navigation operations, including:

- Opening a new web page
- Navigating back to a previous page
- Moving forward to a next page

The navigation history is managed using two stacks:

- **backPages**: Stores the history of previously visited pages.
- **nextPages**: Stores pages that can be revisited by moving forward.

**How it works:**

- When a new page is opened, the current page is pushed onto the `backPages` stack. If you navigate to a new page after going back, the `nextPages` stack is cleared.
- Navigating back pushes the current page onto the `nextPages` stack and pops the most recent page from `backPages` to become the current page.
- Navigating forward pops a page from `nextPages` and makes it the current page, pushing the previous current page onto `backPages`.

The availability of back and forward navigation depends on whether the respective stacks are empty.

**User actions:**

- Enter a new page to visit
- Navigate backward or forward
- Quit the program

At each step (except quitting), the program displays the current page and the top elements of both stacks to show navigation history.