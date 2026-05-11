<script>
    import "../styles/styles.css";
    import Header from './Header.svelte';
    import Footer from './Footer.svelte';

    import { page } from '$app/stores';
</script>

<svelte:head>
    <title>My Pokemon Guide! KS</title>
    <script src="/titulo-dinamico.js" defer></script>
</svelte:head>

<div class="app">

    {#if $page.url.pathname !== '/'}
        <Header />
    {/if}

    <main>
        <slot />   
    </main>

    {#if $page.url.pathname !== '/'}
        <Footer />
    {/if}

</div>
