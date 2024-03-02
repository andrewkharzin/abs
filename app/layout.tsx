import "@/styles/globals.css";
import 'react-quill/dist/quill.snow.css'
import { Roboto, Playfair_Display } from "next/font/google";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { PropsWithChildren, Suspense } from 'react';
import { Toaster } from '@/components/ui/Toasts/toaster';
import { Providers } from "./providers";
import clsx from "clsx";


const roboto_init = Roboto({
	subsets: ['latin'],
	weight: ['100', '300' ,'500', '700'],
	variable: '--font-roboto'
})

const play = Playfair_Display({
	subsets: ['latin'],
	weight: ['600'],
	variable: '--font-playfair_display'
})

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};


export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>



					<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          	{children}
		    	</Providers>


				<Suspense>
          <Toaster />
        </Suspense>
			</body>
		</html>
	);
}