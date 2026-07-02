import MenuNav from "@/components/layout/MenuNav"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { DM_Sans, Geist } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"
import Providers from "./providers"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const dmSans = DM_Sans({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-dm-sans",
})

export const metadata: Metadata = {
	title: "Applicant Tracking Dashboard",
	description: "Refine + Next.js by Jennifer Bautista",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className={cn(dmSans.variable, "font-sans", geist.variable)}>
			<body className="font-sans antialiased">
				<div>
					<main>
						<Providers>
							<MenuNav />
							{children}
							<Toaster />
						</Providers>
					</main>
				</div>
			</body>
		</html>
	)
}
