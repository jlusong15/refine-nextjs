"use client"

import { NavLinks } from "@/types/nav.types"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { Menu as MenuIcon, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

function classNames(...classes: (string | undefined | null | false)[]) {
	return classes.filter(Boolean).join(" ")
}

export default function MenuNav() {
	const pathname = usePathname()

	return (
		<Disclosure as="nav" className="sticky top-0 z-50 bg-primary">
			<div className="px-2">
				<div className="relative flex h-16 items-center justify-between">
					{/* Mobile Menu Button */}
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						<DisclosureButton className="group relative inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-gray-300 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
							<span className="absolute -inset-0.5" />
							<span className="sr-only">Open main menu</span>

							<MenuIcon className="block h-6 w-6 group-data-open:hidden" aria-hidden="true" />

							<X className="hidden h-6 w-6 group-data-open:block" aria-hidden="true" />
						</DisclosureButton>
					</div>

					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						<div className="hidden sm:block">
							<div className="flex space-x-4">
								{NavLinks?.map((item) => {
									const isActive = pathname === item.route

									return (
										<Link
											key={item.name}
											href={item.route}
											className={classNames(
												"rounded-md px-3 py-2 text-sm font-medium text-white",
												isActive ? "bg-black/40" : "hover:bg-white/20 hover:text-white",
											)}
										>
											{item.name}
										</Link>
									)
								})}
							</div>
						</div>
					</div>

					{/* @TODO: Toggle Viewer */}
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						View as: ADMIN
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			<DisclosurePanel className="sm:hidden">
				<div className="space-y-1 px-2 pb-3 pt-2">
					{NavLinks?.map((item) => {
						const isActive = pathname === item.route

						return (
							<DisclosureButton
								key={item.name}
								as={Link}
								href={item.route}
								className={classNames(
									isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white",
									"block rounded-md px-3 py-2 text-base font-medium",
								)}
							>
								{item.name}
							</DisclosureButton>
						)
					})}
				</div>
			</DisclosurePanel>
		</Disclosure>
	)
}
