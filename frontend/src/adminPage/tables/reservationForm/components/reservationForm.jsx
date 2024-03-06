import { Button, Form, InputNumber, Typography, DatePicker, TimePicker } from 'antd'
const { Title } = Typography
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import errorMsg from '../../../../components/message/errorMsg'

const onFinishFailed = () => {
  errorMsg({msg: 'Failed'})
}

const ReservationForm = ({ formName, handleForSubmit, values, setValues, isCreate, btnName, formKey }) => {

    const [submitting, setSubmitting] = useState(false)

    const onFinish = (formValues) => {
        const combinedPickUpDate = `${formValues.pickupdate.format('YYYY-MM-DD')} ${formValues.pickuptime.format('HH:mm')}`
        const combinedDropOffDate = `${formValues.dropoffdate.format('YYYY-MM-DD')} ${formValues.dropofftime.format('HH:mm')}`

        if (combinedPickUpDate || combinedDropOffDate) {
            const startDate = dayjs(combinedPickUpDate, "YYYY-MM-DD HH:mm")
            const endDate = dayjs(combinedDropOffDate, "YYYY-MM-DD HH:mm")

            if (startDate.isValid() && endDate.isValid()) {
                console.log('startDate:', startDate.format("YYYY-MM-DD HH:mm:ss"))
                console.log('endDate:', endDate.format("YYYY-MM-DD HH:mm:ss"))

                const updatedValues = {
                    ...values,
                    ID_Car: formValues.idcar,
                    PickUpDate: startDate.format("YYYY-MM-DD HH:mm:ss"),
                    DropOffDate: endDate.format("YYYY-MM-DD HH:mm:ss"),
                    Price: formValues.price,
                };

                console.log('Updated Form Values:', updatedValues)

                setValues(updatedValues)
                setSubmitting(true)
            } else {
                console.error("Invalid Date or Time:", combinedPickUpDate, combinedDropOffDate)
            }
        } else {
            console.error("Invalid Date or Time: One or both values are missing")
        }
    }

    useEffect(() => {
        if (submitting) {
            handleForSubmit(values)
            setSubmitting(false)
        }
    }, [submitting, values, handleForSubmit])

    return (
        <div className='create'>
            <div className='title'>
                <Title level={2}>{formName}</Title>
            </div>
            <div className='carForm'>
                {console.log(dayjs(values.PickUpDate).format("YYYY-MM-DD"))}
                <Form
                    key={formKey}
                    name="basic"
                    labelCol={{span: 8,}}
                    wrapperCol={{span: 16,}}
                    style={{maxWidth: 600,}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={isCreate ? {} :
                        {
                            idcar: values.ID_Car,
                            pickupdateD: '2024-02-01',
                            // pickuptime: dayjs(values.PickUpDate).format("HH:mm"),
                            // dropoffdate: dayjs(values.DropOffDate).format("YYYY-MM-DD"),
                            // dropofftime: dayjs(values.DropOffDate).format("HH:mm"),
                            price: values.Price
                        }
                    }
                >
                    <Form.Item
                        label="ID_Car"
                        name="idcar"
                        rules={isCreate ? [
                        {
                            required: true,
                            message: 'Please input car ID!',
                        },
                        ] : []}
                    >
                        <InputNumber
                            type="number"
                            className="form-control"
                            onChange={(value) => setValues({ ...values, ID_Car: value })}
                            min={1}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Pick-up Date"
                        name="pickupdate"
                        rules={isCreate ? [
                        {
                            required: true,
                            message: 'Please input pick up date!',
                        },
                        ] : []}
                    >
                        <DatePicker
                            name='pickupdateD'
                            format="YYYY-MM-DD"
                            className='datepicker'
                        />
                    </Form.Item>
                    <Form.Item
                        label="Pick-up Time"
                        name="pickuptime"
                        rules={isCreate ? [
                        {
                            required: true,
                            message: 'Please input pick up time!',
                        },
                        ] : []}
                    >
                        <TimePicker
                            name='pickupdateT'
                            format="HH:mm"
                            minuteStep="60"
                            className='timepicker'
                        />
                    </Form.Item>

                    <Form.Item
                        label="Drop-off Date"
                        name="dropoffdate"
                        rules={isCreate ? [
                        {
                            required: true,
                            message: 'Please input drop off date!',
                        },
                        ] : []}
                    > 
                        <DatePicker
                            name='dropoffdateD'
                            format="YYYY-MM-DD"
                            className='datepicker'
                        />
                    </Form.Item>
                    <Form.Item
                        label="Drop-off Time"
                        name="dropofftime"
                        rules={isCreate ? [
                        {
                            required: true,
                            message: 'Please input drop off time!',
                        },
                        ] : []}
                    >
                        <TimePicker
                            name='dropoffdateT'
                            format="HH:mm"
                            minuteStep="60"
                            className='timepicker'
                        />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={isCreate ? [
                        {
                            required: true,
                            message: 'Please input price!',
                        },
                        ] : []}
                    >
                        <InputNumber
                            type="number"
                            className="form-control"
                            onChange={(value) => setValues({ ...values, Price: value })}
                            min={1}
                            max={9999}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                        offset: 8,
                        span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" className='createbtn'>{btnName}</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ReservationForm