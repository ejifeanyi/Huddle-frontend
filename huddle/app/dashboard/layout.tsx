import Sidebar from "@/components/Sidebar";
import Navbar from "../../components/Navbar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex">
			<Sidebar />
			<div className="ml-[32px] mr-[56px] flex flex-col gap-5 w-full">
				<Navbar />
				{children}
			</div>
		</section>
	);
}
