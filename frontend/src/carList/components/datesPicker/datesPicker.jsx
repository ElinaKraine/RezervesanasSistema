import { DatePicker, message, TimePicker } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import './datesPicker.css'

dayjs.extend(customParseFormat)

export default function DatesPicker({ startDate, endDate, onChangeStartDate, onChangeEndDate, setCars, setIsSubmitted }) {
    
    const showError = (errorMsg) => {
        message.error({
            content: errorMsg,
            duration: 5,
            style: {
                fontSize: '1.5rem'
            },
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const startDateTime = `${e.target.startD.value} ${e.target.startT.value}`
        const endDateTime = `${e.target.endD.value} ${e.target.endT.value}`

        startDate = dayjs(startDateTime, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss")
        endDate = dayjs(endDateTime, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm:ss")

        const minTimeDifference = 60 * 60 * 1000

        if (startDate == 'Invalid Date' && endDate == 'Invalid Date') {
            setCars([])
            showError('Enter a dates')
        } else if (dayjs(endDate).isBefore(dayjs(startDate))) {
            showError('Start date must be before or equal to end date.')
            setCars([])
        } else if (dayjs(endDate).diff(dayjs(startDate)) < minTimeDifference) {
            showError('The difference between start and end date must be at least 1 hour.')
            setCars([])
        } else {
            onChangeStartDate(startDate)
            onChangeEndDate(endDate)
            setIsSubmitted(true)
        }
    }

    function generateDisabledTime() {
        const currentHour = new Date().getHours()
        const disabledHours = []

        for (let i = 0; i <= currentHour; i++) {
            disabledHours.push(i);
        }

        const additionalDisabledHour = currentHour + 1
        disabledHours.push(additionalDisabledHour)

        return {
            disabledHours: () => disabledHours,
            disabledMinutes: () => [],
            disabledSeconds: () => [],
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='datesForm'>
                <div className='column'>
                    <label htmlFor="startDate">Start Date</label>
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
                        disabledTime={generateDisabledTime}
                        required
                        className='timepicker'
                    />
                    {/* <DatePicker
                        showTime={{ format: "HH:mm", minuteStep: 60 }}
                        format="YYYY-MM-DD HH:mm"
                        value={startDate}
                        onChange={(date) => onChangeStartDate(date)}
                        disabled={isEditMode}
                        required
                        className='datepicker'
                        maxDate={dayjs("2024-12-31 23:00:00", "YYYY-MM-DD HH:mm")}
                        minDate={dayjs(dayjs().format('YYYY-MM-DD HH'), "YYYY-MM-DD HH")}
                    /> */}
                </div>
                <div className='column'>
                    <label htmlFor="endDate">End Date</label>
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
                    {/* <DatePicker
                        showTime={{ format: "HH:mm", minuteStep: 60 }}
                        format="YYYY-MM-DD HH:mm"
                        value={endDate}
                        onChange={(date) => onChangeEndDate(date)}
                        disabled={isEditMode}
                        required
                        className='datepicker'
                        maxDate={dayjs("2025-01-01 00:00:00", "YYYY-MM-DD HH:mm")}
                    /> */}
                    <button type="submit">Search</button>
                </div>
            </form>
        </>
    )
}