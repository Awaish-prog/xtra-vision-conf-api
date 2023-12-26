import * as jwt from 'jsonwebtoken';

export function generateJwtToken( email: string ): string | null{
  const secretKey = process.env.JWT_KEY;

  if (!secretKey) {
    console.error('JWT secret key is not defined.');
    return null;
  }
  const payloadData = { email };

  try {
    const token: string = jwt.sign(payloadData, secretKey);
    return token;
  } catch (error) {
    console.error('Error generating JWT token:', error);
    return null;
  }
}
