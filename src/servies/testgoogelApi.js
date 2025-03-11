import 'dotenv/config';

const testGoogleAPI = async () => {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateText?key=${process.env.GOOGLE_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: "Test", max_tokens: 10 })
        });

        const data = await response.json();
        console.log('Google API Response:', data);
    } catch (error) {
        console.error('Error testing Google API:', error);
    }
};

testGoogleAPI();
