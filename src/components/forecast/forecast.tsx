import classes from "./forecast.module.css"
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion"

interface ForecastProps{
    data: any;
}

const WEEK_DAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'] as const

const Forecast = ({data}:ForecastProps) =>{
    const filteredData = data.list.filter((item:any)=>{
        const date = new Date(item.dt_txt)
        return date.getHours() === 12 && date.getDate() != new Date().getDate()
    })
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0,dayInAWeek)).slice(0,filteredData.length)

    return (
        <>
            <label className={classes.title}></label>
            <Accordion allowZeroExpanded>
                {filteredData.map((item:any, idx:number)=>(
                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className={classes.dailyItem}>
                                    <img src={`icons/${item.weather[0].icon}.png`} alt="weather" className={classes.iconSmall}/>
                                    <label className={classes.day}>{forecastDays[idx]}</label>
                                    <label className={classes.description}>{item.weather[0].description}</label>
                                    <label className={classes.minMax}>{Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className={classes.dailyDetailsGrid}>
                                <div className={classes.dailyDetailsGridItem}>
                                    <label>Pressure</label>
                                    <label>{item.main.pressure} hPa</label>
                                </div>
                                <div className={classes.dailyDetailsGridItem}>
                                    <label>Humidity</label>
                                    <label>{item.main.humidity}%</label>
                                </div>
                                <div className={classes.dailyDetailsGridItem}>
                                    <label>Clouds</label>
                                    <label>{item.clouds.all}%</label>
                                </div>
                                <div className={classes.dailyDetailsGridItem}>
                                    <label>Wind speed:</label>
                                    <label>{item.wind.speed} m/s</label>
                                </div>
                                <div className={classes.dailyDetailsGridItem}>
                                    <label>Sea level:</label>
                                    <label>{item.main.sea_level} m</label>
                                </div>
                                <div className={classes.dailyDetailsGridItem}>
                                    <label>Feels like:</label>
                                    <label>{Math.round(item.main.feels_like)}°C</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    )
}

export default Forecast;
