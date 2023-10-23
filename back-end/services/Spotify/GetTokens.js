const axios = require("axios");
const qs = require("qs");

module.exports = async (req, res) => {
	const client_id = process.env.SPOTIFY_CLIENT_ID;
	if (!client_id) return res.status(200).send({ message: "Failure", errors: [{ message: "Spotify Client ID Not Found" }] });

	const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
	if (!client_secret) return res.status(200).send({ message: "Failure", errors: [{ message: "Spotify Client Secret Not Found" }] });

	try {
		const tokensResponse = await axios({
			url: "https://accounts.spotify.com/api/token",
			method: "POST",
			headers: { "content-type": "application/x-www-form-urlencoded" },
			data: qs.stringify({
				code: req?.query?.code,
				redirect_uri: req?.query?.redirect_uri,
				grant_type: "authorization_code",
				client_id,
				client_secret,
			}),
		});
		return res.status(200).send({ message: "Success", data: tokensResponse?.data });
	} catch (error) {
		return res.status(200).send({ message: "Failure", errors: [{ message: error?.message }] });
	}
};
