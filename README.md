# Gallery Demo

This simple app will show a gallery of photos from 500px popular category. When one photo is clicked. A detail view will show up. In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API Key

The API key has been set as an environment variable. In dev, it is included in `.env.local` and is not being checked into the repository.

## Third party libraries

`Redux` is included to store states of the app. `Thunk` is chosen to separate api call from UI component. `react-paginate` is used to fulfill the pagination.  

## Photo size

For gallery view, the default size (size 2) is used. For detail view, the photo is displayed using size 4.