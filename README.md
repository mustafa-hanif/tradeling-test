# GitHub Search

## Demo
The demo is live at
[Github Searcher](https://tradeling-test.vercel.app/)

<img src="public/screenshot.png" width="400px" />

## Installation Instructions
- Clone the repository in any directory
- Run `yarn` in the code folder - Make sure you have node installed
- Run `yarn start` to run it

## Styling approach
I took a simple CSS approach here, as CSS-in-JS solution like `styled-components` didn't make sense here for me. I like the idea of [Utility Classes](https://tailwindcss.com/#what-is-tailwind).

## Redux Toolkit
Redux comes with a lot of boilerplate of having a seprate reducer functions and action creators. Redux toolkit reduces the boilerplace by the concept of slices, where each slice represents a reducer with its actions

## Persistence
I use redux persist with the search query, so if you perform a search I save it in the URL, and if you open the same URL in another tab, I bring out the relevant category based on the query parameter.

## Tests
I wanted to write more tests, but didn't get time later I can expand on it.
