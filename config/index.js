const dev = process.env.NODE_ENV !== 'production';

console.log(dev);

export const server = dev ? 'http://localhost:3000' : 'https://twitter-clone-rhccoder.vercel.app/';
