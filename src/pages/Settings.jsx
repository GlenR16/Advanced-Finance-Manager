import { Tabs } from "flowbite-react";
import { HiCog, HiColorSwatch, HiUserCircle } from "react-icons/hi";
import { useState } from "react";
import { Modal } from "flowbite-react";
import { useName } from "../contexts/NameProvider";
import { useIncome } from "../contexts/IncomeProvider";
import { useExpense } from "../contexts/ExpenseProvider";
import { useInvestment } from "../contexts/InvestmentProvider";
import { useSetting } from "../contexts/SettingsProvider";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeProvider";

export default function Settings() {
    const navigate = useNavigate();
    const { name , changeName ,deleteName } = useName();
    const { theme , editTheme } = useTheme();
    const { deleteAllIncome } = useIncome();
    const { deleteAllExpense } = useExpense();
    const { deleteAllInvestment } = useInvestment();
    const { settings, editSettings, resetSettings } = useSetting();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    function updateProfile(){
        var name = document.getElementById("name")?.value;
        try {
            changeName(name)
            document.getElementById("profileError").innerText = "";
        } catch (error) {
            document.getElementById("profileError").innerText = error.message;
        }
    }

    function deleteProfile(){
        deleteName();
        deleteAllIncome();
        deleteAllInvestment();
        deleteAllExpense();
        navigate("/")
    }

    function changeSettings(){
        try {
            var setObj = {
                currency: document.getElementById("currency").value,
                slabs: JSON.parse(document.getElementById("slabs").value),
                interest: document.getElementById("interest").value
            }
            editSettings(setObj);
        } catch (error) {
            console.log(error.message);
        }
    }

    function changeThemeMode(){
        if (theme.mode === "dark"){
            editTheme({mode:"light"})
        }
        else{
            editTheme({mode:"dark"})
        }
    }

	return (
		<section className="bg-white dark:bg-gray-900 grow">
			<div className="py-4 px-4 mx-auto w-full">
				<div className="flex flex-col items-center justify-center text-center">
					<h1 className="mb-4 font-semibold text-2xl font-normal text-gray-500 lg:text-3xl sm:px-5 lg:px-10 dark:text-white">Settings</h1>
					<div className="w-full flex flex-col md:flex-row item-center justify-center gap-5">
						<Tabs.Group aria-label="Sections" style="fullWidth" className="w-full">
							<Tabs.Item active icon={HiUserCircle} title="Profile">
								<div className="text-left">
                                    <div className="grid gap-6 mb-6 md:grid-cols-3">
                                        <div>
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                            <input type="text" defaultValue={name} id="name" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={"John Doe"} required />
                                        </div>
                                    </div>
                                    <p id="profileError" className="text-red-500 w-full text-center"></p>
                                    <div className="flex flex-row justify-between">
                                        <button type="button" onClick={updateProfile} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save Profile</button>
                                        <button type="button" onClick={() => setOpenDeleteModal(true)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete Profile</button>
                                    </div>
                                    <Modal show={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                                        <Modal.Header className="text-xl font-medium text-gray-900 dark:text-white">Delete Profile</Modal.Header>
                                        <Modal.Body className="text-center flex flex-col items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 0 512 512"><path fill="#ef4444" d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
                                            <p className="mb-2 text-gray-500 dark:text-gray-300">This action cannot be undone.</p>
                                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Are you sure you want to delete all your data ?</h5>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <button onClick={() => setOpenDeleteModal(false)} type="button" className="w-1/2 py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                                No, cancel
                                            </button>
                                            <button type="button" onClick={deleteProfile} className="w-1/2 py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                                Yes, I'm sure
                                            </button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
							</Tabs.Item>
							<Tabs.Item icon={HiCog} title="Application">
                                <div className="text-left">
                                    <div className="grid gap-6 mb-6 md:grid-cols-3">
                                        <div>
                                            <label htmlFor="currency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Application Currency</label>
                                            <select id="currency" defaultValue={settings.currency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value="₹">Indian ₹</option>
                                                <option value="$">United States $</option>
                                            </select>
                                        </div>
                                        <div>
                                            <div>
                                                <label htmlFor="slabs" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tax Slabs</label>
                                                <input type="text" defaultValue={JSON.stringify(settings.slabs)} id="slabs" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={"[[maxValue,taxPercent]]"} required />

                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="interest" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Savings Interest %</label>
                                            <input type="number" defaultValue={settings.interest} id="interest" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={"Bank Savings interest"} required />
                                        </div>
                                    </div>
                                    <p id="settingsError" className="text-red-500 w-full text-center"></p>
                                    <div className="flex flex-row justify-between">
                                        <button type="button" onClick={changeSettings} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save Settings</button>
                                        <button type="button" onClick={resetSettings} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Reset Settings</button>
                                    </div>
                                </div>
							</Tabs.Item>
							<Tabs.Item icon={HiColorSwatch} title="Theme">
                                <div className="text-center">
                                    <div className="grid gap-6 mb-6 md:grid-cols-3">
                                        <div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" id="mode" checked={theme.mode === "dark"} className="sr-only peer" onClick={changeThemeMode} onChange={changeThemeMode} />
                                                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark Mode</span>
                                            </label>
                                        </div>
                                        
                                    </div>
                                </div>
							</Tabs.Item>
						</Tabs.Group>
					</div>
				</div>
			</div>
		</section>
	);
}
