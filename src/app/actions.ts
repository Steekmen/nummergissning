'use server'
import { sql } from "@vercel/postgres"

export const fetchData = async (userName: string, attempts: number) => {
    await sql`INSERT INTO score(username, attempts) values(${userName}, ${attempts})`
}