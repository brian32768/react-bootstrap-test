# react-bootstrap-test/react-context

Demo different 2 forms, one controlled and one uncontrolled.
Uncontrolled not working. Context not working the way I want.

I think context is a good way to store some values at the top
for example "theme" but not a good way to pass values up
from child components.

## Context

Value of the logged in user is stored in a React Context, 
so it can be updated from the controlled form without using state lifting. 

Go to the Controlled Form tab and enter something.

Go to another tab.

Go back to Controlled Form. Note both the input field and logins are cleared. I regard this as a problem, the entire form clears.
So context is not helping me here.

## Testing

```bash
npm install
npm start
```
