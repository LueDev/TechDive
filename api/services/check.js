const fs = require('fs').promises;

const found = () => {
    return fs.readFile('/Users/luisjorge/code/Hack.Diversity/TechDive/TechDive/api/services/HTML/forgotpassword.html', 'utf8')
        .catch(err => {
            console.error('Error reading HTML file:', err);
            throw err; // Rethrow the error for handling in the caller
        });
};

const returnHtml = async () => {
    try {
        const htmlContent = await found();
        return await htmlContent
    } catch (error) {
        // Handle error
        console.error('Error:', error);
    }
};

returnHtml()
.then(html => console.log(html))
