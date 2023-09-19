import { NavLink } from "react-router-dom";
import { useName } from "../contexts/NameProvider";
import { Navbar,Dropdown } from "flowbite-react";
import "react";

export default function TopNavbar() {
	const { name, changeName } = useName();
	
	return (
		<Navbar fluid className="border-b-2 border-black dark:border-gray-700">
			<Navbar.Brand href="/">
				<img alt="Logo" className="mr-3 h-6 sm:h-9" src="/Advanced-Finance-Manager/favicon.svg" />
				<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">AFM</span>
			</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse>
				<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
					<li>
						<NavLink to="/" className="text-base block py-2 pl-3 pr-4 my-1 md:my-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</NavLink>
					</li>
					<li>
						<NavLink to="/about" className="text-base block py-2 pl-3 pr-4 my-1 md:my-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About Us</NavLink>
					</li>
					{
						name &&
						<>
							<li>
								<NavLink to="/income" className="text-base block py-2 pl-3 pr-4 my-1 md:my-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Income</NavLink>
							</li>
							<li>
								<NavLink to="/expense" className="text-base block py-2 pl-3 pr-4 my-1 md:my-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Expense</NavLink>
							</li>
							<li>
								<NavLink to="/investment" className="text-base block py-2 pl-3 pr-4 my-1 md:my-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Investments</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard" className="text-base block py-2 pl-3 pr-4 my-1 md:my-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Dashboard</NavLink>
							</li>

							<li>
								<Dropdown renderTrigger={() => <div className="text-base block py-2 pl-3 pr-4 my-1 md:my-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><div className="inline-flex items-center">{name} <svg className="ml-2 mb-1" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path fill="currentColor" d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"/></svg></div></div> }>
									<Dropdown.Item as="div" className="w-full" >
										<NavLink to="/settings" className="text-base block py-2 pl-3 pr-4 my-1 md:my-0 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:p-0 dark:text-white">Settings</NavLink>
									</Dropdown.Item>
								</Dropdown>
							</li>
						</>
					}
				</ul>
			</Navbar.Collapse>
		</Navbar>
	);
}
