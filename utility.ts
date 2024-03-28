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

export default fetchToken;