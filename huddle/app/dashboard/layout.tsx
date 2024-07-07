import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex">
			<Sidebar />

			{children}
		</section>
	);
}
