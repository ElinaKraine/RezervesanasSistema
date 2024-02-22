import { Button, Form, Input, InputNumber, Select, Typography } from 'antd';
const { Title } = Typography;
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export default function CarForm({ formName, handleForSubmit, values, setValues }) {
  return (
    <>
      <Title level={2}>{formName}</Title>
      <Form
        onSubmit={handleForSubmit}
        name="basic"
        labelCol={{span: 8,}}
        wrapperCol={{span: 16,}}
        style={{maxWidth: 600,}}
        initialValues={{ remember: true,}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Brand:"
          name="brand"
          rules={[
            {
              required: true,
              message: 'Please input car brand!',
            },
          ]}
        >
          <Input
            type="text"
            name="brand"
            onChange={(e) => setValues({...values, Brand: e.target.value})}
          />
        </Form.Item>

        <Form.Item
          label="Model:"
          name="model"
          rules={[
            {
              required: true,
              message: 'Please input car model!',
            },
          ]}
        >
          <Input
            type="text"
            name="model"
            onChange={(e) => setValues({...values, Model: e.target.value})}
          />
        </Form.Item>

        {/* <Form.Item
          label="Seats:"
          rules={[{
            required: true,
            message: 'Please input car seats!',
          },]}
        >
          <InputNumber
            type="number"
            className="form-control"
            name="seats"
            onChange={(value) => setValues({ ...values, Seats: value })}
          />
        </Form.Item> */}
        <Form.Item
          label="s:"
          name="s"
          rules={[
            {
              required: true,
              message: 'Please input car s!',
            },
          ]}
        >
          <Input
            type="text"
            name="s"
            onChange={(e) => setValues({...values, Seats: e.target.value})}
          />
        </Form.Item>

        <Form.Item
          label="Select:"
          name="transmission"
          onChange={(e) =>
              setValues({
              ...values,
              Transmission: e.target.value,
          })
          }
        >
          <Select>
            <Select.Option value="Manual">Manual</Select.Option>
            <Select.Option value="Automatic">Automatic</Select.Option>
          </Select>
        </Form.Item>

        {/* <Form.Item
          label="One hour price:"
          rules={[
            {
              required: true,
              message: 'Please input one hour price!',
            },
          ]}
        >
          <InputNumber
            type="number"
            className="form-control"
            name="onehourprice"
            onChange={(value) => setValues({...values, OneHourPrice: value})}
          /> 
          */}
        <Form.Item
          label="o:"
          name="o"
          rules={[
            {
              required: true,
              message: 'Please input car o!',
            },
          ]}
        >
          <Input
            type="text"
            name="o"
            onChange={(e) => setValues({...values, OneHourPrice: e.target.value})}
          />
        </Form.Item>
        
        {/* <Form.Item
          label="Two hours price:"
          rules={[
            {
              required: true,
              message: 'Please input two hours price!',
            },
          ]}
        >
          <InputNumber
            type="number"
            className="form-control"
            name="twohoursprice"
            onChange={(value) => setValues({...values, TwoHoursPrice: value})}
          />
        </Form.Item> */}
        <Form.Item
          label="t:"
          name="t"
          rules={[
            {
              required: true,
              message: 'Please input car t!',
            },
          ]}
        >
          <Input
            type="text"
            name="t"
            onChange={(e) => setValues({...values, TwoHoursPrice: e.target.value})}
          />
        </Form.Item>
          
        {/* <Form.Item
          label="Five hours price:"
          rules={[
            {
              required: true,
              message: 'Please input five hours price!',
            },
          ]}
        >
          <InputNumber
            type="number"
            className="form-control"
            name="fivehoursprice"
            onChange={(value) => setValues({...values, FiveHoursPrice: value})}
          />
        </Form.Item> */}
<Form.Item
          label="f:"
          name="f"
          rules={[
            {
              required: true,
              message: 'Please input car f!',
            },
          ]}
        >
          <Input
            type="text"
            name="f"
            onChange={(e) => setValues({...values, FiveHoursPrice: e.target.value})}
          />
        </Form.Item>

        {/* <Form.Item
          label="One day price:"
          rules={[
            {
              required: true,
              message: 'Please input one day price!',
            },
          ]}
        >
          <InputNumber
            type="number"
            className="form-control"
            name="onedayprice"
            onChange={(value) => setValues({...values, OneDayPrice: value})}
          />
        </Form.Item> */}
        <Form.Item
          label="d:"
          name="d"
          rules={[
            {
              required: true,
              message: 'Please input car d!',
            },
          ]}
        >
          <Input
            type="text"
            name="d"
            onChange={(e) => setValues({...values, OneDayPrice: e.target.value})}
          />
        </Form.Item>

        <Form.Item
          label="Image link:"
          name="imagelink"
          rules={[
            {
              required: true,
              message: 'Please input image link!',
            },
          ]}
        >
          <Input
            type="text"
            name="imagelink"
            onChange={(e) => setValues({...values, Image: e.target.value})}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
          offset: 8,
          span: 16,
          }}
        >
          <Button type="primary" htmlType="submit"> Submit </Button>
        </Form.Item>
        </Form>
      </>
    )
}