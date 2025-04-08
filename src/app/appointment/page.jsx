import CreateAppointment from "./components/CreateAppointment";

export default function Appointment() {
    return (

        <main className="p-[16px] mr-[16px] " >
        <section className=" flex justify-between items-center" >
            <h1 className="text-[34px] font-bold" >Appointment</h1>
            <CreateAppointment />
        </section>

        </main>
    )
}