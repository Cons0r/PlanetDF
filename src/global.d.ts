/// <reference types="@sveltejs/kit" />
declare namespace App {
    interface Session {
        user?: unknown
    }

    interface Locals {
        user?: unknown
    }
}