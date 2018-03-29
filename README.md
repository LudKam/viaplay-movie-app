# ViaplayApp

Within nine days Viaplay wanted me to implement an application that used data from their public API. This API containes every movie, series etc. that they got. The requirements where simple, present some movies in a list and some in a carousel. However, my solution contains a bit more than that. I wanted to create something that would “pop” when the user saw it. Therefore, every possible genre got a unique linear-gradient background, and also the carousel wasn’t made as a “ordinary” carousel.

## Let’s have a look
Before I start explaining more about the structure of the app lets actually look at some screenshots, so you know what I am talking about.

![alt text](https://github.com/LudKam/viaplay-movie-app/master/src/common/images/desktop.gif "Desktop")

![alt text](https://github.com/LudKam/viaplay-movie-app/master/src/common/images/mobile.gif "Mobile")


As seen the app is fully responsive and has some sweet animations and also infinite scrolling in both views. And the mobile version also makes use of swipes to navigate the carousel.

## Tools
I decided to develop the website with [Angular CLI](https://github.com/angular/angular-cli) (version 1.7.3.) since I am somewhat familiar to it, and since I love TypeScript. I also decided to use Sass instead of CSS, because it is more awesome. To add touch-gesture support Hammer.js was used. For infinite scrolling, in the list view, ngx-infinite-scroll was used. Angular Material and Animation.css where also used.

## Architecture
The app contains two views, one (`main-page`) showing a list of movies where the user can filter on genres (the other buttons doesn’t work yet) and another (`item-page`) where more info about the movie is presented in the form of a carousel. Two components where used, together with a helper component (`list`) to create the grid (because then it can easily be reused). To be able to share data between these components services where used. Which meant that the same data could be used for both views meaning a big reduce in api calls. Using services also meant that we got a more structured application and better reusable code.

An important aspect for me was the routing in the app, meaning that every element in the carousel should have its own unique url. This means that I can send a link to my friend and she will see the same movie. This was achieved by using angulars routing.

Since this was a rather small app, only one module was used. And since there where limited time the api calls where hardcoded into a shared model.

## Todo
On the `main-page` the filtering buttons needs to be implemented and the infinite scroll needs to be improved. The used library doesn’t seem to work on some devices.

In the `item-page` the fallback to retrieve an individual movie from the api must be developed. At the moment if you copy a correct URL and refresh the browser you will end up at a 404 screen (fortunately that 404 page is very pretty). This is because there haven’t been fetched any movies yet. The movies are, at the moment, fetched in the `main-page` and stored in a service that is used in `item-page`. And since the `main-page` haven’t fetched any movies there isn’t a list to loop through. However the `item-page` does asks the service to retrieve more movies from the api when it realises that the list is almost empty.

The animations also need some fine tuning, and also the media-queries that probably aren’t perfect (if they can ever be). Another thing that should be changed is that the carousel element in the `item-page` must have a dynamic height. At the moment any overflowing data will be hidden since the height can’t be larger than the browser height. A good start would be to make it relative instead of fixed.

And finally, the filtering buttons needs to be implemented, but that shouldn’t be that hard, some api calls.

## Usage
1. `git clone`
2. `npm install`
3. `ng serve`

