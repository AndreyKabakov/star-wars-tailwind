import {useEffect, useState} from "react";

import {baseUrl, periodMonth} from "../utils/constants.js";

import {
    formStyle,
    labelStyle,
    inputStyle,
    textareaStyle,
    buttonStyle
} from "../utils/styles.js";

const Contact = () => {
    const [planets, setPlanets] = useState(() => {
        const planets = JSON.parse(localStorage.getItem("planets"));

        if (planets && Date.now() - planets.time < periodMonth) {
            return planets.payload;
        } else {
            return ["wait..."];
        }
    });

    useEffect(() => {
        const getPlanets = async () => {
            const res = await fetch(`${baseUrl}/v1/planets`);

            const data = await res.json();

            const planets = data.map((item) => item.name);

            setPlanets(planets);

            localStorage.setItem(
                "planets",
                JSON.stringify({
                    payload: planets,
                    time: Date.now(),
                })
            );
        };

        if (planets.length === 1) {
            getPlanets().then(() => console.log("Planets were loaded"));
        }
    }, []);

    return (
        <form
            className={formStyle}
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <label className={labelStyle}>
                First Name
                <input
                    className={inputStyle}
                    type="text"
                    name="firstname"
                    placeholder="Your first name..."
                />
            </label>

            <label className={labelStyle}>
                Last Name
                <input
                    className={inputStyle}
                    type="text"
                    name="lastname"
                    placeholder="Your last name..."
                />
            </label>

            <label className={labelStyle}>
                Planet
                <select
                    className={inputStyle}
                    name="planet"
                >
                    {planets.map((item) => (
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </label>

            <label className={labelStyle}>
                Subject
                <textarea
                    className={textareaStyle}
                    name="subject"
                    placeholder="Write something..."
                />
            </label>

            <button
                className={buttonStyle}
                type="submit"
            >
                Submit
            </button>
        </form>
    );
};

export default Contact;