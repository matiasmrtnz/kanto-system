
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/equipos" | "/equipos/[id]" | "/movimientos" | "/movimientos/[id]" | "/pokemon_fusion" | "/pokemon" | "/pokemon/[id]";
		RouteParams(): {
			"/equipos/[id]": { id: string };
			"/movimientos/[id]": { id: string };
			"/pokemon/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/equipos": { id?: string };
			"/equipos/[id]": { id: string };
			"/movimientos": { id?: string };
			"/movimientos/[id]": { id: string };
			"/pokemon_fusion": Record<string, never>;
			"/pokemon": { id?: string };
			"/pokemon/[id]": { id: string }
		};
		Pathname(): "/" | "/equipos" | "/equipos/" | `/equipos/${string}` & {} | `/equipos/${string}/` & {} | "/movimientos" | "/movimientos/" | `/movimientos/${string}` & {} | `/movimientos/${string}/` & {} | "/pokemon_fusion" | "/pokemon_fusion/" | "/pokemon" | "/pokemon/" | `/pokemon/${string}` & {} | `/pokemon/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.ico" | "/iconos/categorias/especial.png" | "/iconos/categorias/estado.png" | "/iconos/categorias/fisico.png" | "/iconos/tipos/1.svg" | "/iconos/tipos/10.svg" | "/iconos/tipos/11.svg" | "/iconos/tipos/12.svg" | "/iconos/tipos/13.svg" | "/iconos/tipos/14.svg" | "/iconos/tipos/15.svg" | "/iconos/tipos/16.svg" | "/iconos/tipos/17.svg" | "/iconos/tipos/18.svg" | "/iconos/tipos/2.svg" | "/iconos/tipos/3.svg" | "/iconos/tipos/4.svg" | "/iconos/tipos/5.svg" | "/iconos/tipos/6.svg" | "/iconos/tipos/7.svg" | "/iconos/tipos/8.svg" | "/iconos/tipos/9.svg" | "/media/images/banner.png" | "/media/images/banner_gengar.png" | "/media/images/favicon.ico" | "/media/images/fondo.png" | "/media/images/logo.png" | "/media/videos/background.mp4" | "/robots.txt" | "/titulo-dinamico.js" | string & {};
	}
}