import prisma from '$lib/prisma'

export async function get({ params }) {
    try {
        await prisma.rate.create({
            data: {
                uuid: params.name,
                num: parseInt(params.stars)
            }
        })
    } catch(e) {
        if(e.code === 'P2002') {
            // unique field not uniqe
            await prisma.rate.update({
                where: {
                    uuid: params.name
                },
                data: {
                    num: parseInt(params.stars)
                }
            })
        }
    }
    return {
        code: 200
    }
}