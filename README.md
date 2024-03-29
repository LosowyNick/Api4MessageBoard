# Api4MessageBoard $$STATUS:{\color{orange}ONGOING}$$

Final project prepared while "Node.JS" course.

## Description

The aim of the project was to create an application API that allows users to manage online adverts - a message board.

Each advert contains following fields:
- title
- description
- author
- category (one only)
- tags (one or more)
- price
- delivery methods
- payment menthods

Requirements:

0. DONE - The application is documented with Postman - a collection of request examples for all prepared functions.

1. DONE - The port used by the application should be set using environment variables.

2. DONE - The application responds to requests sent to the address `/heartbeat` by returning the current date and time.

3. DONE - The application allows user to add an advert.

4. DONE - The application allows user to return a single advert. Depending on the `Accept` request header, the data is returned in the appropriate format (`text/plain`, `text/html`, `application/json`).

5. DONE - The application allows user to return all adverts.

6. DONE - The application allows user to delete the selected advert.

7. DONE - The application allows user to modify the selected advert.

8. DONE - The application allows user to search for adverts by various criteria (title, description, date range, price range, tags).

9. DONE - The application saves the adverts in the database.

10. DONE - Deleting and modifying adverts is protected with a password, in the case of no access, an appropriate message and an HTTP response code are returned.

11. DONE - The application has 3 permanently defined users. Each of them can delete and modify only those adverts that he/she added. If there are no authorization to perform the operation, an appropriate message and HTTP response code are returned.

12. DONE - After starting with the `debug` parameter (e.g. `node app.js --debug`), the application saves in a text file the time of received request, the HTTP method and the address.

13. DONE - After receiving a request sent to an address that does not exist, the application should return a static image instead of the default 404 error page.

14. DONE - In case of application errors, error details are displayed using console.log and the client receives an appropriate message and HTTP response code.