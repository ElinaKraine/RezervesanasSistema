import '../filter/filter.css'
import { Select, Radio, Checkbox } from 'antd'
import { useState } from 'react'

const optionsBrand = ['VW', 'Fiat', 'Renault', 'Skoda', 'Toyota', 'Smart', 'Kia', 'Ford', 'Audi', 'Opel', 'Nissan', 'Lincoln']
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

  return (
    <div className='carFilter'>
      <Select
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
    </div>
  )
}

export default Filter