/// <reference types="@sveltejs/kit" />
declare namespace App {
    interface Session {
        user?: {
            username: string
        }
    }

    interface Locals {
        user?: {
            username: string
        }
    }
}