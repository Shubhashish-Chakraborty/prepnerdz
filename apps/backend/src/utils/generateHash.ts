import bcrypt from 'bcrypt';

export async function generateHashedPassword(): Promise<string> {
    const randomPassword = Math.random().toString(36).slice(-10); // 10-char random string
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    return hashedPassword;
}