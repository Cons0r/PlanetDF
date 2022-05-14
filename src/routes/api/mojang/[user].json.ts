export async function get({ params }:{params: { user: string } }): Promise<unknown> {
    const r = await fetch(`https://api.mojang.com/users/profiles/minecraft/${params.user}`);
    return { body: await r.body }
}