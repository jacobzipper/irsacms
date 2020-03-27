To add a new page:

    0) make sure to have src/Navbar be a top lvl subcomponent
        of the page you are trying to add
            (sorry for the hack, couldnt find a better way)
    

    1) make a new subdirectory with naming scheme page-name.
    2) make all components for that page in that directory.

    3) in src/routes.js:
        * import the new page,
        * in Routes(), add PrivateRoute, passing in page component
            (see current Routes() for examples)

    4) in src.Navbar:
        * in NavBar(), add a link in the Navigation bar 
            using the other links as an example
            (should be self explanatory if you see Navbar.js)
    
    5) profit
    