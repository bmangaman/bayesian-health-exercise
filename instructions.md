# Take Home Exercise

The exercise is to create a simple dashboard that allows the user to select cities for which they
would like to see current and historical weather data.

# User Stories

As a user, I should be able to

* add new cities to the dashboard
* re-arrange the order the cities are displayed in
* remove a city from the dashboard
* close the page, but maintain the setup when I visit the page again
* see the historical data shown in a graph
* see the details for a given timepoint in the historical data when hovering or clicking

# Wireframe

This is what we envision the app to look like:

    ┌───────────────────────────────────────────┐ ┌─────────────────────┐
    │            Weather Report 2000            │ │     + Add City      │
    └───────────────────────────────────────────┘ └─────────────────────┘
    ┌───────────────────────────────────────────────────────────────────┐
    │                                                                   │
    │    ┌────────────┐ ┌──────────────────────────────────────────┐    │
    │    │   City 1   │ │                                          │    │
    │    └────────────┘ │                                          │    │
    │    ┌────────────┐ │                                          │    │
    │    │            │ │             Historical Data              │    │
    │    │  Current   │ │                                          │    │
    │    │  Weather   │ │                                          │    │
    │    │            │ │                                          │    │
    │    └────────────┘ └──────────────────────────────────────────┘    │
    └───────────────────────────────────────────────────────────────────┘
    ┌───────────────────────────────────────────────────────────────────┐
    │                                                                   │
    │    ┌────────────┐ ┌──────────────────────────────────────────┐    │
    │    │   City 2   │ │                                          │    │
    │    └────────────┘ │                                          │    │
    │    ┌────────────┐ │                                          │    │
    │    │            │ │             Historical Data              │    │
    │    │  Current   │ │                                          │    │
    │    │  Weather   │ │                                          │    │
    │    │            │ │                                          │    │
    │    └────────────┘ └──────────────────────────────────────────┘    │
    └───────────────────────────────────────────────────────────────────┘
                        (etc, for each city added)

# Design

Don't worry too much about the visual design. We are not looking for your design skills here, but
your coding skills. So just keep the design basic.

# Constraints

The application needs to be written in Typescript, React, and HTML, and be based on the
[create-react-app](https://github.com/facebook/create-react-app) framework. You can add and use any
other librarires that you want on top of that.

Please use `git` for version control. Make sure that the `create-react-app` code is a separate
commit, so it is easy for us to filter that out and concentrate on your code.

# Optimize for

* Correct use of React and Typescript
* Readability
* Test coverage

# APIs

These are the APIs that we expose. They are all hosted on:
`https://bh-weather-data.s3.amazonaws.com/`.

Note that the endpoints will not return CORS headers if there is no `Origin` header in the request. So
if you are testing the APIs outside of an XHR context, you should be aware of that.

## `/stations.json`

Returns the list of valid cities in an array:

    [
        {
            'name': 'New York, NY',
            'id': 1
        },
        {
            'name': 'Baltimore, MD',
            'id': 2
        },

        ...
    ]

## `/current/<city_id>.json`

Get current weather for the given `city_id`. Each data point will have this structure:

    {
        "time": "2019-05-01 23:00:00",
        "time_local": "2019-05-02 00:00",
        "temperature": 12.2,
        "dewpoint": 7.9,
        "humidity": 75,
        "precipitation": 0.1,
        "precipitation_3": null,
        "precipitation_6": null,
        "snowdepth": null,
        "windspeed": 9.3,
        "peakgust": 16.7,
        "winddirection": 270,
        "pressure": 1016,
        "condition": 4
    }

We do not envision that you display all the data.

## `/historical/<city_id>.json`

Get historical weather data for the given `city_id`. The data point returned will be the same as the
above.

# Time limit

We hope you can spend about three hours on this little project. If you finish faster, go you! :) If
not, please limit yourself and don't spend much longer than three hours.

# Delivery

Once you are done, you can either invite us to a private github repo, or send us a zipped file of
the code and your commits (ie. remember to also zip up the `.git` directory).
