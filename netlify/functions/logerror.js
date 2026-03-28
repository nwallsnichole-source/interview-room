exports.handler = async function(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const error = JSON.parse(event.body);
        
        // Log to Netlify function logs — visible in Netlify dashboard
        console.error('🚨 INTERVIEW TOOL ERROR:', JSON.stringify({
            location: error.location,
            message: error.message,
            user: error.user,
            tier: error.tier,
            isComeback: error.isComeback,
            context: error.context,
            timestamp: error.timestamp,
            url: error.url
        }, null, 2));

        // Send email alert if MAILERLITE_API_KEY exists (reuse existing connection)
        // Errors show in Netlify dashboard → Logs & metrics → Function logs
        
        return {
            statusCode: 200,
            body: JSON.stringify({ logged: true })
        };
    } catch(err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
};
