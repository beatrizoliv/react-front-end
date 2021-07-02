# Front-End Challenge

## Challenge

We are building a car-sharing platform.
Car owners can already list their car on our platform and backend developers have provided an API for us to query.

Our plan is now to let any person (let's call them "driver") see cars they could rent.

### Level 1: fetching and displaying cars

For the first version of our app, we want drivers to see the cars they can rent. For every car returned by the backend, we want to display its picture, brand, model, price per day and price per km.

The API is accessible with a `GET` request at `/cars.json` on your local server.

### Level 2: filtering by duration and distance

Unfortunately, some cars are only available for short rentals (less than a given number of days or kilometers, defined by the owner).

To only see available cars, drivers should be able to input the duration of their rental and the distance they plan on driving.

The different values they should be able to select are:

- duration (in days): between 1 and 30
- distance (in km): 50, 100, 150, 200, 250, 300, ... up to 3000

When drivers edit these inputs, another request to the API, with `duration` and `distance` query parameters, should be made. The API will only return available cars for the given parameters in the response. _Please do not use the `availability` fields of the response, they are only here for debugging purposes._

### Level 3: calculate the rental price

We heard of drivers complaining about not knowing the price for their rental. Unfortunately, the backend developers forgot to add this information so we'll have to calculate it ourselves and display it.

The rental price is the sum of:

- A time component: the number of rental days multiplied by the car's price per day
- A distance component: the number of km multiplied by the car's price per km

Let's calculate and display this price for every car.

### Level 4: degressive pricing

To be as competitive as possible, we decide to have decreasing pricing for longer rentals.

New rules:

- price per day decreases by 10% after 1 day
- price per day decreases by 30% after 4 days
- price per day decreases by 50% after 10 days

Adapt the rental price computation to take these new rules into account.
