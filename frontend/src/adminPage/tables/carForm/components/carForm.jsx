import { Button, Form, Input, InputNumber, Select, Typography } from 'antd'
const { Title } = Typography

import errorMsg from '../../../../components/message/errorMsg'
import './carForm.css'

const onFinishFailed = () => {
  errorMsg({msg: 'Failed'})
}

const CarForm = ({ formName, handleForSubmit, values, setValues, isCreate, btnName, formKey }) => {

  const onFinish = (values) => {
    handleForSubmit(values)
  }

  return (
    <div className='create'>
      <div className='title'>
        <Title level={2}>{formName}</Title>
      </div>
      <div className='carForm'>
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
              brand: values.Brand,
              model: values.Model,
              seats: values.Seats,
              transmission: values.Transmission,
              onehourprice: values.OneHourPrice,
              twohoursprice: values.TwoHoursPrice,
              fivehoursprice: values.FiveHoursPrice,
              onedayprice: values.OneDayPrice,
              imagelink: values.Image
            }
          }
        >
          <Form.Item
            label="Brand"
            name="brand"
            rules={isCreate ? [
              {
                required: true,
                message: 'Please input car brand!',
              },
            ] : []}
          >
            <Input
              type="text"
              name="brand"
              onChange={(e) => setValues({ ...values, Brand: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            label="Model"
            name="model"
            rules={isCreate ? [
              {
                required: true,
                message: 'Please input car model!',
              },
            ] : []}
          >
            <Input
              type="text"
              name="model"
              onChange={(e) => setValues({...values, Model: e.target.value})}
            />
          </Form.Item>

          <Form.Item
            label="Seats"
            name="seats"
            rules={isCreate ? [
              {
                required: true,
                message: 'Please input car seats!',
              },
            ] : []}
          >
            <InputNumber
              type="number"
              className="form-control"
              onChange={(value) => setValues({ ...values, Seats: value })}
              min={2}
              max={20}
            />
          </Form.Item>

          <Form.Item
            label="Transmission"
            name="transmission"
            rules={isCreate ? [
              {
                required: true,
                message: 'Please input car transmission!',
              },
            ] : []}
          >
            <Select onChange={(value, option) => {
              setValues({
                ...values,
                Transmission: value,
              })
            }}>
              <Select.Option value="Manual">Manual</Select.Option>
              <Select.Option value="Automatic">Automatic</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="One hour price"
            name="onehourprice"
            rules={isCreate ? [
              {
                required: true,
                message: 'Please input car one hour price!',
              },
            ] : []}
          >
            <InputNumber
              type="number"
              className="form-control"
              onChange={(value) => setValues({ ...values, OneHourPrice: value })}
              min={1}
              max={150}
            />
          </Form.Item>

          <Form.Item
            label="Two hours price"
            name="twohoursprice"
            rules={isCreate ? [
              {
                required: true,
                message: 'Please input car two hours price!',
              },
            ] : []}
          >
            <InputNumber
              type="number"
              className="form-control"
              onChange={(value) => setValues({ ...values, TwoHoursPrice: value })}
              min={1}
              max={250}
            />
          </Form.Item>

          <Form.Item
            label="Five hours price"
            name="fivehoursprice"
            rules={isCreate ? [
              {
                required: true,
                message: 'Please input car five hours price!',
              },
            ] : []}
          >
            <InputNumber
              type="number"
              className="form-control"
              onChange={(value) => setValues({ ...values, FiveHoursPrice: value })}
              min={1}
              max={500}
            />
          </Form.Item>

          <Form.Item
            label="One day price"
            name="onedayprice"
            rules={isCreate ? [
              {
                required: true,
                message: 'Please input car one day price!',
              },
            ] : []}
          >
            <InputNumber
              type="number"
              className="form-control"
              onChange={(value) => setValues({ ...values, OneDayPrice: value })}
              min={1}
              max={1000}
            />
          </Form.Item>

          <Form.Item
            label="Image link:"
            name="imagelink"
            rules={isCreate ? [
              {
                required: true,
                message: 'Please input image link!',
              },
            ] : []}
          >
            <Input
              type="text"
              name="imagelink"
              onChange={(e) => setValues({ ...values, Image: e.target.value })}
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

export default CarForm