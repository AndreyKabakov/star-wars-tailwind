import {baseUrl, periodMonth} from "../utils/constants.js";
import {useEffect, useState} from "react";

const AboutMe = () => {
    const [hero, setHero] = useState(() => {
        const hero = JSON.parse(localStorage.getItem('hero'));
        if (hero && Date.now() - hero.timestamp < periodMonth) {
            return hero.payload;
        }
    });

    useEffect(() => {
        if (!hero) {
            fetch(`${baseUrl}/v1/peoples/1`)
                .then(response => response.json())
                .then(data => {
                    const info = {
                        name: data.name,
                        gender: data.gender,
                        birth_year: data.birth_year,
                        height: data.height,
                        mass: data.mass,
                        hair_color: data.hair_color,
                        skin_color: data.skin_color,
                        eye_color: data.eye_color
                    }
                    setHero(info);
                    localStorage.setItem('hero', JSON.stringify({
                        payload: info,
                        timestamp: Date.now()
                    }));
                })
        }
    }, [])


    return (
        <>
            {(!!hero) &&
                <div className={'text-[1.5rem] text-justify leading-15 tracking-widest ml-6'}>
                    {Object.keys(hero).map(key=><p key={key}>
                        <span className={'text-2l capitalize'}>{key.replace('_', '')}</span>: {hero[key]}</p>)}
                </div>
            }
        </>
    );

}

export default AboutMe;
