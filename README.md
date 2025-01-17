# cricketinfo-site

Source for cricketinfo.io


## Dependencies

- NodeJS and NPM
- React, as the view library
- NextJS, to render the React app to HTML on the server-side
- Express, to handle requests and pass them on to NextJS on the server-side


## Running in Development

1. Make sure NPM and NodeJS are installed on your system.

2. Clone the project repository and `cd` into it.

    $ git clone <repository-url>
    $ cd path/to/code

3. Install dependencies from NPM.

    $ npm i

4. Run the server in development mode.

    $ npm run dev


## Running in Production

1. Make sure NPM and NodeJS are installed on your system.

2. Once NPM is installed, install `pm2` globally (may require sudo).

    $ npm i -g pm2

3. Clone the project repository and `cd` into it.

    $ git clone <repository-url>
    $ cd path/to/code

4. Install dependencies from NPM.

    $ npm i

5. Build an optimized version of the code.

    $ npm run build

6. Start the app using `pm2`.

    $ pm2 start npm --name "cricketinfo-site" -- start

7. The app runs on port 3000 by default. You might want to reverse proxy requests to the app using Nginx or Apache.

## Resources

- The app in production: https://cricketinfo.io
