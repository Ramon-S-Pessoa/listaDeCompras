import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";

export default function BuildList(){

  let contentEditable = React.createRef()

  const [product, setProduct] = useState({
    name:"",
    price: 0,
    quantidy: 0,
    key: 0
  })

  const [buyList, setBuyList] = useState([])
  const [builtList, setBuiltList] = useState([])

  const productChange = (name, price, quantidy, key) =>{
    setProduct({
      name: name,
      price: price,
      quantidy: quantidy,
      key: key
    })
  }

  const addItemHandler = () =>{
    if(product.name != ""){ 
      setBuyList([...buyList, product])
      productChange("", product.price, product.quantidy, product.key + 1)
    }
  }

  const buildList = () =>{
    let testList = buyList
    let list = testList.map(element =>{
      return(
        <li key={element.key} className="listItem">
          <p className="product_name">{element.name}</p>
          <div className="quantidade">
            <p className="quantidade_produto">{element.quantidy}</p>
            <div className="buttons">
              <button className="plus" onClick={e=>{
                testList[element.key].quantidy = element.quantidy + 1
                console.log(testList[element.key])
                setBuyList([...testList])
              }}>+</button>
              <button className="minus" onClick={e=>{
                testList[element.key].quantidy = element.quantidy - 1
                console.log(testList[element.key])
                setBuyList([...testList])
              }}>-</button>
            </div>
          </div>
          <div className="price">
            <p className="R$">R$</p>
            <ContentEditable 
              innerRef={contentEditable}
              html={`<span>${element.price}</span>`}
              disabled={false}
              onKeyDown={e=>{
                if(e.key === "Enter"){
                  e.preventDefault()
                  testList[element.key].price = Number(e.target.innerText.replace(/,/g, '.'))
                  setBuyList([...testList])
                }
              }}
            />
          </div>
        </li>
      )
      
    })
    setBuiltList([...list])
  }

//Constrói o Array de li's somente quando há alguma alteração na lista de compras
  useEffect(()=>{
    buildList()
  }, [buyList])

  return(
    <div className='add_product'>
        <form className='product_form'>
          <input className="product_name_input" type="text" value={product.name} onChange={e =>{
            productChange(e.target.value, product.price, product.quantidy, product.key)
          }} />
          <button className='add_product_button' onClick={e=>{
            e.preventDefault()
            addItemHandler()
          }}>ADICIONAR ITEM</button>
        </form>
          <ul className='rendered_buy_list'>
            {builtList}
          </ul>
      </div>
  )

}