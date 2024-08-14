import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function authenticateToken(req, res, next) {
    // get authorization token from the header 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access Denied: No Token Provided' });
    
    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid Token' });

        req.user = user; // Attach the decoded token payload to the request object
        next(); // Pass control to the next middleware function
    });
}

export default authenticateToken
