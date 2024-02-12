import { title } from "@/components/primitives";
import { createClient } from '@/utils/supabase/server'
import  Airports  from "./airports";

export default function AddressPage() {
	return (
		<div className="">
			<h1 className={title({ color: "violet", size: "vsm"})}>AIRPORTS</h1>
			<Airports />
		</div>
	);
}