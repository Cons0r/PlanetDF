<script>
    import * as libmojang from '$lib/mojang';
    import ListCard from '$lib/ListCard.svelte';
    import ListCardItem from '$lib/ListCardItem.svelte';
    import adler32 from '$lib/adler32'
    import { writable } from 'svelte/store';
    let val = writable('')
    let valid = false;
    async function userexists(ign) {
        try {
            await libmojang.getUUID(ign)
            return true
        } catch(e) {
            console.log(e)
            return false
        }
    }
    val.subscribe(async(ign)=>{
        // valid = ign.length && libmojang.valid(ign) && await userexists(ign)
        valid = true;
        console.log(valid)
    })
</script>

<div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Link your Diamondfire profile</h2>
    </div>
  
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
        <ListCard>
            <input bind:value={$val} class="w-fit" type="text" placeholder="Your Minecraft username">

            <ListCardItem>
                Your login code is:
            </ListCardItem>
            <ListCardItem>
                <span class:text-rose-500={!valid} class="w-full text-center text-2xl">
                {#if valid}
                    {adler32($val)}
                {:else}
                    00000000
                {/if}
                </span>
            </ListCardItem>
            {#if valid}
            <ListCardItem>
                <span class="text-gray-500">
                    Join plot 4533 to and enter type @{adler32($val)} in chat
                    Reload the site to check if you have been registered
                </span>
            </ListCardItem>
            {/if}
        </ListCard>
      </div>
    </div>
</div>