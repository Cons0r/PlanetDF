import prisma from '$lib/prisma'

export async function get({ params }) {
    prisma.rate.create({
        data: {
            uuid: params.name,
            num: params.stars
        }
    })
}