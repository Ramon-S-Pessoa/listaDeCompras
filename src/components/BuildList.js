import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

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
  const [fullPrice, setFullPrice] = useState(0)

  const handleFullPrice = () =>{
    let total = buyList.reduce((total, current)=>{
      return total + (current.price * current.quantidy)
    }, 0)

    setFullPrice(total)
  }

  const productChange = (name, price, quantidy) =>{
    setProduct({
      name: name,
      price: price,
      quantidy: quantidy
    })
  }

  const addItemHandler = () =>{
    if(product.name != ""){ 
      setBuyList([...buyList, product])
      productChange("", product.price, product.quantidy)
    }
  }

  const buildList = () =>{
    let testList = buyList
    let list = testList.map(element =>{
      let elementIndex = buyList.indexOf(element)
      return(
        <li key={elementIndex} className="listItem">
          <FontAwesomeIcon icon={faTrashAlt} size="6x" fixedWidth className="far fa-trash-alt item_remover" onClick={e=>{
            e.preventDefault()
            
            testList.splice(elementIndex, 1)
            setBuyList([...testList])
          }}/>
          <p className="product_name">{element.name}</p>
          <div className="quantidade">
            <p className="quantidade_produto">{element.quantidy}</p>
            <div className="buttons">
              <button className="plus" onClick={e=>{
                testList[elementIndex].quantidy = element.quantidy + 1 
                setBuyList([...testList])
              }}>+</button>
              <button className="minus" onClick={e=>{
                testList[elementIndex].quantidy = element.quantidy - 1
                setBuyList([...testList])
              }}>-</button>
            </div>
          </div>
          <div className="price">
            <p className="R$">R$</p>
            <ContentEditable
              inputMode="tel"
              innerRef={contentEditable}
              html={`<span>${element.price}</span>`}
              disabled={false}
              onKeyDown={e=>{
                if(e.key === "Enter"){
                  testList[elementIndex].price = Number(e.target.innerText.replace(/,/g, '.'))
                  setBuyList([...testList])
                }
              }}
              onKeyPress={e=>{
                if (isNaN(e.key) && e.key != "," && e.key != "."){
                  e.preventDefault()
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
    if(buyList.length != 0){
      handleFullPrice()
    }
  }, [buyList])

  return(
    <div className='add_product'>
        <form className='product_form'>
          <input className="product_name_input" type="text" value={product.name} onChange={e =>{
            productChange(e.target.value, product.price, product.quantidy)
          }} />
          <button className='add_product_button' onClick={e=>{
            e.preventDefault()
            addItemHandler()
          }}>ADICIONAR ITEM</button>
        </form>
          <ul className='rendered_buy_list'>
            {builtList}
            <li key="precoTotal" className="listItem">
              <p className="product_name">Total</p>
              <div className="price">
                <p className="R$">R$</p>
                <span>{fullPrice}</span>
              </div>
            </li>
          </ul>
      </div>
  )

}