# Title Aggegrator for The Verge

## Structure of The Verge Website
Initially, I wanted to scrape the articles straight from [The Verge's homepage](https://www.theverge.com/). However, they have implemented pagination for their articles so only the most recent articles are shown. There is a "More Stories" button at the bottom, which I thought about using selenium to press the button and then load the articles. But this way is quite inefficient. 
I then found out that The Verge has an [archive page](https://www.theverge.com/archives/2024/7) where they list all the articles that they have published with the title, links and date. The archive endpoint is also easy to scrape from, so I went for that. The format is as follows: https://www.theverge.com/archives/[YEAR]/[MONTH (INT)]. 

## Approach
### Problem: Automate scraping of articles from The Verge over a specified date range.
- Solution:
1. Use Node.js and Express to set up a server.
2. Cheerio extracts data from HTML.
3. Loop through the archives by year/month, fetch articles, and display them sorted by date.
4. Then display it to HTML using ejs. 

- Alternative Solution:
1. Use BeautifulSoup Python library to scrape the articles.
2. BeautifulSoup extracts data from HTML.
3. Loop through the archives by year/month, fetch articles, and display them sorted by date.
4. Either save it to a HTML file and then host it or use a Flask/Django server.

## How to Run
1. Clone the repo
2. run npm install
3. node app.js
4. Hosted on http://localhost:3000