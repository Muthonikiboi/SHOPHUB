import crypto, { createHash } from 'crypto';

export const generateToken=()=>{
    const token = crypto.randomBytes(32).toString('hex');
    
    const passwordResetToken = crypto.createHash("sha256").update(token.toString()).digest('hex');

    const passwordResetExpires= Date.now()+10*60*1000;

    return {
        token,
        passwordResetToken,
        passwordResetExpires
    }
}