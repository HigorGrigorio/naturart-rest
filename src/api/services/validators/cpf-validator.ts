export class CPFValidator {
    static isValid(cpf: string): boolean {
        if (!cpf) return false;

        // Remove special characters and spaces
        cpf = cpf.replace(/[^\d]/g, "");

        // Check if the input contains 11 digits
        if (cpf.length !== 11) return false;

        // Check if all digits are the same
        if (/^(\d)\1{10}$/.test(cpf)) return false;

        // Calculate and check the first digit
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let firstDigit = 11 - (sum % 11);
        if (firstDigit === 10 || firstDigit === 11) firstDigit = 0;
        if (firstDigit !== parseInt(cpf.charAt(9))) return false;

        // Calculate and check the second digit
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        let secondDigit = 11 - (sum % 11);
        if (secondDigit === 10 || secondDigit === 11) secondDigit = 0;
        if (secondDigit !== parseInt(cpf.charAt(10))) return false;

        // The input is a valid CPF
        return true;
    }
}

export default CPFValidator;