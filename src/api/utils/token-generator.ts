export class TokenGenerator {
    // The characters that can be used in the tokens
    private readonly characters: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    // The length of the tokens to be generated
    private readonly tokenLength: number;

    constructor(length: number) {
        this.tokenLength = length;
    }

    // Generate a new token
    public generate(): Promise<string> {
        return new Promise((resolve) => {
            let token = "";

            for (let i = 0; i < this.tokenLength; i++) {
                // Pick a random character from the set of possible characters
                token += this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            }

            resolve(token);
        });
    }
}

export default TokenGenerator;