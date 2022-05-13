export default function adler(string): string {
    let a = 1, b = 0;
    for(let i = 0; i < string.length; i++) {
        a = a+string.charCodeAt(i);
        b = (b+a) % 65521;
    }
    const answer = (b << 16 | a >>> 0).toString(16);
    return answer;
}