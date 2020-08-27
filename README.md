# GitHub Search

## Styling approach
I took a simple CSS approach here, as CSS-in-JS solution like `styled-components` didn't make sense here for me. I like the idea of [Utility Classes](https://tailwindcss.com/#what-is-tailwind).

## Redux Toolkit
Redux comes with a lot of boilerplate of having a seprate reducer functions and action creators. Redux toolkit reduces the boilerplace by the concept of slices, where each slice represents a reducer with its actions

## Persistence
I use redux persist with the search query, so if you perform a search I save it in the URL, and if you open the same URL in another tab, I bring out the relevant category based on the query parameter.

## Tests
I wanted to write more tests, but didn't get time later I can expand on it.