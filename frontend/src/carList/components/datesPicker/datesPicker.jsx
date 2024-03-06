import { DatePicker, TimePicker } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import './datesPicker.css'
import errorMsg from '../../../components/message/errorMsg'

dayjs.extend(customParseFormat)

export default function DatesPicker({ startDate, endDate, onChangeStartDate, onChangeEndDate, setCars, setIsSubmitted }) {

    const handleSubmit = (e) => {
        e.preventDefault()

        const startDateTime = `${e.target.startD.value} ${e.target.startT.value}`
        const endDateTime = `${e.target.endD.value} ${e.target.endT.value}`
        const currentDateTime = dayjs()

        startDate = dayjs(startDateTime, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss")
        endDate = dayjs(endDateTime, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss")

        const minTimeDifference = 60 * 60 * 1000

        if (startDate == 'Invalid Date' && endDate == 'Invalid Date') {
            setCars([])
            errorMsg({msg: 'Enter a dates'})
        } else if (dayjs(startDate).isBefore(currentDateTime) || dayjs(endDate).isBefore(currentDateTime)) {
            errorMsg({msg: 'Both start and end dates must be in the future'})
            setCars([])
        }else if (dayjs(startDate).isBefore(currentDateTime.add(1, 'hour'))) {
            errorMsg({msg: 'Start time must be at least 1 hour from the current time'})
            setCars([]);
        } else if (dayjs(endDate).isBefore(dayjs(startDate))) {
            errorMsg({msg: 'Start date must be before or equal to end date'})
            setCars([])
        } else if (dayjs(endDate).diff(dayjs(startDate)) < minTimeDifference) {
            errorMsg({msg: 'The difference between start and end date must be at least 1 hour'})
            setCars([])
        } else {
            onChangeStartDate(startDate)
            onChangeEndDate(endDate)
            setIsSubmitted(true)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='datesForm'>
                <div className='column'>
                    <label htmlFor="startDate">Pick-up date</label>
                    <DatePicker
                        name='startD'
                        format="YYYY-MM-DD"
                        required
                        className='datepicker'
                        maxDate={dayjs("2024-12-31", "YYYY-MM-DD")}
                        minDate={dayjs(dayjs().format('YYYY-MM-DD HH'), "YYYY-MM-DD")}
                    />
                    <TimePicker
                        name='startT'
                        format="HH:mm"
                        minuteStep="60"
                        required
                        className='timepicker'
                    />
                </div>
                <div className='column'>
                    <label htmlFor="endDate">Drop-off date</label>
                    <DatePicker
                        name='endD'
                        format="YYYY-MM-DD"
                        required
                        className='datepicker'
                        maxDate={dayjs("2024-12-31", "YYYY-MM-DD")}
                        minDate={dayjs(dayjs().format('YYYY-MM-DD HH'), "YYYY-MM-DD")}
                    />
                    <TimePicker
                        name='endT'
                        format="HH:mm"
                        minuteStep="60"
                        required
                        className='timepicker'
                    />
                </div>
                <div className='column'>
                    <button type="submit">Search</button>
                </div>
            </form>
        </>
    )
}