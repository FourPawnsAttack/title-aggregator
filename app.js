const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const scrapeArticles = async () => {
    const articles = [];

    // Loop through each year and month
    for (let year = 2024; year >= 2022; year--) {
        for (let month = 12; month >= 1; month--) {
            const url = `https://www.theverge.com/archives/${year}/${month}`;
            console.log(`Scraping ${url}`);
            
            try {
                const response = await axios.get(url);
                const $ = cheerio.load(response.data);

                $('div.c-entry-box--compact__body').each((index, element) => {
                    const titleTag = $(element).find('h2.c-entry-box--compact__title a');
                    const title = titleTag.text().trim();
                    const articleUrl = titleTag.attr('href');
                    const dateTag = $(element).find('time.c-byline__item');
                    const dateStr = dateTag.attr('datetime');
                    const articleDate = new Date(dateStr);

                    if (title && articleUrl && articleDate) {
                        articles.push({
                            title,
                            url: articleUrl,
                            date: articleDate,
                        });
                    }
                });
            } catch (error) {
                console.error(`Error scraping ${url}: ${error.message}`);
            }
        }
    }

    // Sort articles by date, most recent first
    articles.sort((a, b) => b.date - a.date);
    return articles;
};

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/scrape', async (req, res) => {
    const articles = await scrapeArticles();
    res.render('results', { articles });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
