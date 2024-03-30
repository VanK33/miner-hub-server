import axios from "axios";

interface TokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token: string;
}

// This function is used to fetch the access and refresh token from EVE Online ESI API
async function fetchToken(
    code: string,
    clientId: string,
    clientSecret: string,
): Promise<TokenResponse | null> {

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
    });

    try {
        const response = await axios.post(`https://login.eveonline.com/v2/oauth/token`, body.toString(), {
            headers: {
                "Content-Type": "application//x-www-form-urlencoded",
                "Authorization": `Basic ${credentials}`,
                "Host": `login.eveonline.com`,
            }
        })
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error fetching token:", error.response ? error.response.data : error.message)
        return null;
    }
}

// TODO: Implement the refresh token function
// TODO: implement the validation function

function generateSecureRandomString(length: number): string {
    // generated a TypedArray of random numbers between 0 and 255
    const array = new Uint8Array(length);
    // pass the TypedArray to the getRandomValues method of the crypto object. This provides a cryptographically secure random number generator
    window.crypto.getRandomValues(array);
    const characters =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomString = "";
    for (let i = 0; i < array.length; i++) {
        // use the modulo operator to get a random index between 0 and the length of the characters string
        const randomIndex = array[i] % characters.length;
        randomString += characters[randomIndex];
    }
    return randomString;
}



module.exports = { fetchToken, generateSecureRandomString }