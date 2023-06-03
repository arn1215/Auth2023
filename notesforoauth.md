When i  move onto  a production build i will need to change the client urls in the platform developer settings and 
also in the codebase everywhere there is a redirect to the client url....there are also places where localhost8000 is hardcoded (?)

Right now, when login fails the useEffect in LoginPage will catch the error by then trying to signup the user
however if somehow the first part fails on an edge case and the user DOES exist, then the user will get recreated if sessionActions.signup is run and so I want to work something into signup that blocks the process if the user already exists.