const cheerio = require('cheerio');
const axios = require('axios');

const runScrapper = async () => {
    for (let i = 1; i <= 10; i++) {
        await scrapper(i, 250); // Wait for 1000ms (1 second) before moving on to the next iteration
    }
};

runScrapper();

async function scrapper(pageNumber, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios.get(`https://www.skidrowreloaded.com/page/${pageNumber}/`)
                .then((res) => {
                    if (res.data) {
                        console.log(`<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Page ${pageNumber} >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`)
                        const $ = cheerio.load(res.data);
                        $('#main-content .post h2').each((i, e) => {
                            console.log($(e).text());
                        });
                        resolve();
                    }
                }).catch(function (error) {
                    console.log(error);
                    reject();
                });
        }, delay);
    });
}