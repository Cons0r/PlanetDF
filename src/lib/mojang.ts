// By Maurits Wilke https://github.com/MauritsWilke
// File https://github.com/MauritsWilke/mcpfp/blob/main/src/lib/rendering/mojang.ts

async function getUUID(username: string): Promise<string | never> {
	if (!valid(username)) return Promise.reject(`${username} is an invalid username`);
	const response = await fetch(`/api/mojang/${username}.json`)
    console.log(await response.body)
	if (!response.ok) return Promise.reject(`${username} does not exist`);
	const json = await response.json();
	return json.id;
}

function valid(username: string): boolean {
	if (!username.match(/^[a-z0-9_]*$/i)) return false;
	return true;
}

export {
	getUUID,
	valid
}