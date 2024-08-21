# react-bootstrap-test/react-simply

Demo different 2 forms, one controlled and one uncontrolled.

## State lifting

Go to the Controlled Form tab and enter something.

The value entered will be "lifted" to the parent via a reference
to a function. React does not have pass by reference, you pass
a function and then the child calls the function to pass up the 
value to the parent.

Go to another tab.

Go back to Controlled Form.

Note that it's now empty because the form reset.

I will address this in other examples. This one is "simple". 

## Testing

```bash
npm install
npm start
```
