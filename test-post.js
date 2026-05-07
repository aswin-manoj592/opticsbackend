const axios = require('axios');
const FormData = require('form-data');

async function test() {
    const form = new FormData();
    form.append('productName', 'Test Product');
    form.append('code', 'P123');

    try {
        const res = await axios.post('http://localhost:3000/product', form, {
            headers: form.getHeaders()
        });
        console.log('Status:', res.status);
        console.log('Body:', res.data);
    } catch (err) {
        if (err.response) {
            console.log('Status:', err.response.status);
            console.log('Body:', err.response.data);
        } else {
            console.error(err.message);
        }
    }
}
test();
