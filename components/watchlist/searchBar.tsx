import { AutoComplete } from "antd"
import React, { useEffect, useState } from "react"
import { mockSymbolList } from "../../api/watchlist"

const SymbolSearchBar = (props: {
  onSymbolSearchBarChange: (arg0: any) => void
}) => {
  const [resp, setResp] = useState([{ symbol: "" }])
  const [searchText, setSearchText] = useState("")

  // Format ->  const options = [
  //     { value: 'Burns Bay Road' },
  //     { value: 'Downing Street' },
  //     { value: 'Wall Street' },
  // ];
  const options = resp.map((row) => {
    return { value: row.symbol }
  })

  const onChangeHandler = (value: any) => {
    props.onSymbolSearchBarChange(value)
  }

  useEffect(() => {
    const response: any = mockSymbolList()
    response.then((res: { data: any }) => {
      setResp(res.data)
    })
  }, [])

  return (
    <>
      <AutoComplete
        style={{ width: 900 }}
        placeholder="input here"
        onChange={onChangeHandler}
        options={options}
        filterOption={(inputValue, option) =>
          option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    </>
  )
}

export default SymbolSearchBar
