export default function dateConvertForTicket(date) {
    const day = new Date().toLocaleDateString("en-US",{
        month: "long",
        day: "numeric",
    });

    const dayName = new Date().toLocaleDateString("en-US",{
        weekday: "long",
    })

    return (
        <div>
            {new Date(date).getDay() === new Date().getDay() ? (
                <h4 id="today" className="pt-2 text-primary">Hôm nay</h4>
            ): <h5>{day}</h5>}

            {new Date(date).getDay() !== new Date().getDay() ? (
                <h5 onClick={()=>{
                    document.getElementById("today").className = "pt-2"
                }}>{dayName}</h5>
            ) : null}
        </div>
    )
}