"use client"

import LinkButton from "@/components/shared/LinkButton"
import { NavLinks } from "@/types/nav.types"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { Menu as MenuIcon, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import ToggleViewer from "./ToggleViewer"

function classNames(...classes: (string | undefined | null | false)[]) {
	return classes.filter(Boolean).join(" ")
}

export default function MenuNav() {
	const pathname = usePathname()

	return (
		<Disclosure as="nav" className="sticky top-0 z-50 bg-primary">
			<div className="mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center">
						{/* Mobile menu button */}
						<div className="sm:hidden">
							<DisclosureButton className="rounded-md p-2 text-white hover:bg-white/10 cursor-pointer">
								<MenuIcon className="h-6 w-6 group-data-open:hidden" />
								<X className="hidden h-6 w-6 group-data-open:block" />
							</DisclosureButton>
						</div>

						{/* Desktop nav */}
						<div className="hidden sm:flex sm:space-x-2">
							{NavLinks.map((item) => {
								const isActive = pathname === item.route

								return (
									<LinkButton
										key={item.name}
										href={item.route}
										className={classNames(
											"rounded-md px-3 py-2 text-sm font-medium text-white",
											isActive ? "bg-black/40" : "hover:bg-white/20",
										)}
									>
										{item.name}
									</LinkButton>
								)
							})}
						</div>
					</div>

					{/* Desktop right */}
					<div className="hidden sm:flex items-center gap-2 text-white">
						<span className="text-sm whitespace-nowrap">View as:</span>
						<ToggleViewer />
					</div>
				</div>
			</div>

			{/* Mobile panel */}
			<DisclosurePanel className="sm:hidden border-t border-white/10">
				<div className="space-y-1 px-4 py-3">
					{NavLinks.map((item) => {
						const isActive = pathname === item.route

						return (
							<DisclosureButton
								key={item.name}
								as={Link}
								href={item.route}
								className={classNames(
									"block rounded-md px-3 py-2 text-base font-medium",
									isActive ? "bg-black/40 text-white" : "text-white hover:bg-white/10",
								)}
							>
								{item.name}
							</DisclosureButton>
						)
					})}

					<div className="mt-4 border-t border-white/10 pt-4">
						<div className="mb-2 text-sm text-white">View as</div>
						<ToggleViewer />
					</div>
				</div>
			</DisclosurePanel>
		</Disclosure>
	)
}
