import Alpha from "./doc";

const DecryptAlphabet = Object.fromEntries(
    Object.entries(Alpha).map(([key, value]) => [value, key])
);

function decryption(message) {
    let output = "";
    if (message != null) {
        for (let item of message) {
            if (item in DecryptAlphabet) {
                output += DecryptAlphabet[item];
            } else if (item === "o") {
                output += " ";
            }
        }
    }

    return output;
}

export default decryption;
