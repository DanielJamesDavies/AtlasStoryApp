module.exports = async (req, res) => {
	const client_id = process.env.SPOTIFY_CLIENT_ID;

	if (!client_id) return res.status(200).send({ message: "Failure", errors: [{ message: "Spotify Client ID Not Found" }] });

	return res.status(200).send({ message: "Success", data: { client_id } });
};
