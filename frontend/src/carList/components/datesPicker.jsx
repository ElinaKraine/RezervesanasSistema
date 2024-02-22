import { useState } from 'react'
import { DatePicker, Space } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

const { RangePicker } = DatePicker
dayjs.extend(customParseFormat)
const dateFormat = 'YYYY-MM-DD'
const timeFormat = 'HH:mm'

export default function DatesPicker() {

    const nowInMinutes = () => {
        const now = dayjs()
        if (now.minute() < 30) {
        return now.minute(30).second(0);
        } else {
        return now.add(1, 'hour').minute(0).second(0);
        }
    }
    
    const [selectedDates, setSelectedDatesInternal] = useState([
        nowInMinutes(),
        nowInMinutes().add(1, 'day'),
    ])

    const handleDateChange = (dates) => {
        setSelectedDatesInternal(dates)
    }

    return (
        <>
            <form>
                <Space direction="vertical" style={{margin:'2rem', display:'flex', alignItems:'center'}}>
                    <RangePicker
                        showTime={{ format: timeFormat, minuteStep: 30 }}
                        defaultValue={[selectedDates[0], selectedDates[1]]}
                        disabledDate={(current) => current.isBefore(dayjs().subtract(1, "day"))}
                        onChange={handleDateChange}
                        format={`${dateFormat} ${timeFormat}`}
                        style={{ width: '100%', height: '5rem', color:'black' }}
                        pickerStyle={{ fontSize: '78px', b: 'black' }}
                        size='large'
                    />
                </Space>
            </form>
        </>
    )
}