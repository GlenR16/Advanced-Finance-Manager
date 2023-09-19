import { Table } from "flowbite-react";
import { LiveSheet } from "../utils/DataOrganizers";

export default function BalanceSheet() {
	const graph3 = LiveSheet();
	return (
		<div className="w-full md:w-3/4 p-5">
			<h5 className="mb-4 font-semibold text-lg font-normal text-gray-500 lg:text-2xl dark:text-white">Balance Sheet @ {new Date().toISOString().slice(0,7)} </h5> <br />
			<Table>
				<Table.Head>
					<Table.HeadCell>Name</Table.HeadCell>
					<Table.HeadCell>Amount</Table.HeadCell>
					<Table.HeadCell>Type</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					{
						graph3.length < 1 &&
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"></Table.Cell>
							<Table.Cell>No data available.</Table.Cell>
							<Table.Cell></Table.Cell>
						</Table.Row>
					}
					{
						graph3.length > 0 &&
						graph3.map((i) => {
							return (
								<Table.Row key={i.type} className="bg-white dark:border-gray-700 dark:bg-gray-800">
									<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{i.name}</Table.Cell>
									<Table.Cell>{i.amount}</Table.Cell>
									<Table.Cell>{i.type}</Table.Cell>
								</Table.Row>
							);
						})
					}
					
					
				</Table.Body>
			</Table>
		</div>
	);
}
