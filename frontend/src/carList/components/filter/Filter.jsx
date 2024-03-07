import '../filter/filter.css'
import { Select, Radio, Checkbox, Typography } from 'antd'
const { Title } = Typography
import { useState } from 'react'

const optionsBrand = ['VW', 'Fiat', 'Renault', 'Skoda', 'Toyota', 'Smarts', 'Kia', 'Ford', 'Audi', 'Opel', 'Nissan', 'Lincoln']
const optionsTransmission = [
  {
    label: 'Manual',
    value: 'Manual',
  },
  {
    label: 'Automatic',
    value: 'Automatic',
  }
]

const Filter = ({ setSelectedBrand, setSelectedSort, setSelectedTransmission }) => {

  const [brand, setBrand] = useState([])
  const filteredOptionsBrand = optionsBrand.filter((o) => !brand.includes(o))

  const [sort, setSort] = useState(null)
  const [transmission, setTransmission] = useState(null)

  const onChangeBrand = (value) => {
    setSelectedBrand(value)
    setBrand(value)
  }

  const onChangeSort = (e) => {
    const value = e.target.value
    setSelectedSort(value)
    setSort(value)
  }

  const onChangeTransmission = (value) => {
    setSelectedTransmission(value)
    setTransmission(value)
  }

  const clearFilters = () => {
    setSelectedBrand([])
    setSelectedSort(null)
    setSelectedTransmission([])
    setBrand([])
    setSort(null)
    setTransmission([])
  }

  return (
    <div className='carFilter'>
      <Title level={2}>Filters</Title>
      <Select
        size='large'
        mode="multiple"
        showSearch
        placeholder="Select a Brand"
        onChange={onChangeBrand}
        value={brand}
        options={filteredOptionsBrand.map((item) => ({
          value: item,
          label: item,
        }))}
      />
      <Radio.Group onChange={onChangeSort} value={sort}>
        <Radio value={'asc'}>
          Ascending
        </Radio>
        <Radio value={'desc'}>
          Descending
        </Radio>
      </Radio.Group>
      <Checkbox.Group
        options={optionsTransmission}
        onChange={onChangeTransmission}
        value={transmission}
      />
      <button onClick={clearFilters} className='clearFilters'>Clear Filters</button>
    </div>
  )
}

export default Filter