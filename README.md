# Viaplay movie app

Within nine days [Viaplay](https://viaplay.se/) wanted me to implement an application that used data from their public API. This API containes every movie, series etc. that they got. The requirements where simple, present some movies in a list and some in a carousel. However, my website solution contains a bit more than that. I wanted to create something that would “pop” when the user saw it. Therefore, every possible genre got a unique linear-gradient background, and also the carousel wasn’t made as a “ordinary” carousel.

## Let’s have a look
Before I start explaining more about the structure of the website lets actually look at some gifs, so you know what I am talking about. (please note that the colors will be slightly different due to the gif quality)

<img src="https://drive.google.com/uc?export=view&id=19UiBo4Ex3H2k7UR_qTOAEvoDRlm-M00X" width="700px" />

<img src="https://drive.google.com/uc?export=view&id=1EPNeITKTc0badtpE3Lgp5RkO8r_Qlbr1" width="350px" />

As seen the website is fully responsive and has some sweet animations and also infinite scrolling in both views. The mobile version also makes use of swipe navigation.

## Tools
I decided to develop the website with [Angular CLI](https://github.com/angular/angular-cli) (version 1.7.3.) since I am somewhat familiar to it, and since I love TypeScript. I also decided to use [Sass](https://github.com/sass/sass) instead of CSS, because it is more awesome. To add touch-gesture support [Hammer.js](https://hammerjs.github.io/) was used. For infinite scrolling, in the list view, [ngx-infinite-scroll](https://github.com/orizens/ngx-infinite-scroll) was used. [Angular Material](https://github.com/angular/material2) and [Animate.css](https://github.com/daneden/animate.css) where also used.

## Architecture
The website contains of two 'page components', one (`main-page`) showing a list of movies where the user can filter on genres (the other buttons doesn’t work yet) and another (`item-page`) where more info about the movies are presented in the form of a carousel. The `main-page` also uses a helper component (`list`) that creates the movie grid (because then it can easily be reused) by showing the movies it receives as inputs. To be able to share data between the two 'page components' services where used. Which meant that the same data could be used for both components meaning a big reduce in api calls. Using services also meant that we got a more structured website and better reusable code.

An important aspect for me was the routing, I wanted every element in the carousel to have its own unique url. This means that I can send a link to my friend and she will see the same movie. This was achieved by using angulars routing.

Since this was a rather small website, only one module was used. And since there were limited time the api urls where hardcoded into a shared model.

## Todo
On the `main-page` the filtering buttons needs to be implemented and the infinite scroll needs to be improved. The used library doesn’t seem to work on some devices.

In the `item-page` the fallback to retrieve an individual movie from the api must be developed. At the moment if you copy a correct url and refresh the browser you will end up at a 404 screen (fortunately that 404 page is very pretty). This is because there haven’t been fetched any movies yet. The movies are, at the moment, fetched from the `main-page` and "stored" in a service that is used in the `item-page`. And since the `main-page` haven’t fetched any movies there isn’t a list to loop through. However, the `item-page` asks the service to retrieve more movies from the api when it realises that the list is almost empty.

The animations also need some finetuning, and also the media-queries that probably aren’t perfect (if they can ever be). Another thing that should be changed is that the carousel element in the `item-page` must have a dynamic height. At the moment any overflowing data will be hidden since the height can’t be larger than the browser height. A good start would be to make it relative instead of fixed.

Some more data validation wouldn't hurt either. Finally, it would be nice if the scroll-position is kept intact when navigating between the 'page components'.

## Usage
1. `git clone`
2. `npm install`
3. `ng serve`

