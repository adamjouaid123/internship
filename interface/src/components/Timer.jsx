import { useEffect, useContext, useState } from "react";
import { FormDataStoreContext } from "../FormDataStore";

const Timer = () => {

    const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

    const [time, setTime] = useState(formDataStore.getByNameKey("timer"));

    useEffect(() => {
        const timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
    }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (time % 10 === 0) {
            const existingFormData = formDataStore.getFromLocalStorage();
            const parsedFormData = existingFormData ? JSON.parse(existingFormData) : {};
            parsedFormData.timer = time.toString();
            formDataStore.setToLocalStorage(parsedFormData)
            formDataStore.setNameData("timer", time.toString());
        }
    }, [time]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return <div className="timer">{formatTime(time)}</div>;
};

export default Timer;
