import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';

class ProductAdding extends Component {
  constructor(){
    super();
    //Configurando o contentEditable
    this.contenteditable = React.createRef()

    this.state = {
      product:{
        productName:'',
        productKey: 0,
        productPrice: 0,
        productQtd: 0
      },
      buyList:[],
    };

    //Variáveis globais
    this.finalBuyList

    this.addItems = this.addItems.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.editProduct = this.editProduct.bind(this)
    this.renderBuyList = this.renderBuyList.bind(this)
  };

  editProduct = (name, key, price) =>{
    this.setState({product:{
      productName: name,
      productKey: key,
      productPrice: price,
      productQtd: 0
    }})
  }

  renderBuyList = () => {
    this.finalBuyList = this.state.buyList.map(elemento => {
      return(
        <li key={elemento.productKey} className='listItem' productkey={elemento.productKey}>
          <p className='product_name'>{elemento.productName}</p>
          <button className='item_remover' id={elemento.productKey} onClick={this.removeItem}>{"\u2716"}</button>
          <div className='quantidade'>
            <p className='quantidade_produto'>{elemento.productQtd}</p>
            <div className='buttons'>
              <p className='plus' onClick={e =>{
                elemento.productQtd++
                document.querySelector(".quantidade_produto").innerText = elemento.productQtd
              }}>{"\u02C4"}</p>
              <p className='minus' onClick={e =>{
                elemento.productQtd--
                document.querySelector(".quantidade_produto").innerText = elemento.productQtd
              }}>{"\u02C5"}</p>
            </div>
          </div>
          <div className='price'>
            <p className='R$'>R$</p>
            <ContentEditable
              innerRef={this.contenteditable}
              html={`<span>${elemento.productPrice}</span>`}
              disabled={false}
              onKeyDown={e=>{
                if(e.key === 'Enter'){
                  e.preventDefault()
                  elemento.productPrice = e.target.innerText
                  console.log(this.state.buyList)
                }
                e.key == 'Enter' ? e.preventDefault() : ""
              }}
            />
          </div>
        </li>
      )
    })    
  }

  addItems = (e)=>{
    e.preventDefault()
    this.editProduct(
      document.querySelector(".product_name_input").value,
      this.state.product.productKey,
      this.state.product.productPrice
    )

    this.state.product.productName == "" ? null :  
    this.setState({buyList:[...this.state.buyList, this.state.product]}, () =>{
      this.renderBuyList()
      this.editProduct("", this.state.product.productKey + 1, this.state.product.productPrice)

    })
  };

  removeItem = e => {
    let itemID = e.target.id
    let productList = this.state.buyList
    let listFilter = productList.find(item => item.productKey == itemID)
    let indexToRemove = productList.indexOf(listFilter)
    productList.splice(indexToRemove, 1)
    this.setState({buyList: [...productList]})

    this.renderBuyList()
  }

  handleNameChange = e =>{
    this.editProduct(e.target.value, this.state.product.productKey, this.state.product.productPrice)
  }

  render() {
    return (
      <div className='add_product'>
        <form className='product_form'>
          <input className="product_name_input" type="text" value={this.state.product.productName} onChange={this.handleNameChange}/>
          <button className='add_product_button' onClick={this.addItems}>ADICIONAR ITEM</button>
        </form>
          <ul className='rendered_buy_list'>
            {this.finalBuyList}
          </ul>
      </div>
    )
  }
}

export default ProductAdding