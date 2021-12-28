import React, { Component } from 'react';

class ProductAdding extends Component {
  constructor(){
    super();
    this.state = {
      product:{
        productName:'',
        productKey: 0,
        productPrice: 0
      },
      buyList:[],
    };

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
      productPrice: price
    }})
  }

  renderBuyList = () => {
    this.finalBuyList = this.state.buyList.map(elemento => {
      return(
        <li key={elemento.productKey} className='listItem' productkey={elemento.productKey}>
          <p>{elemento.productName}</p>
          <button className='item_remover' id={elemento.productKey} onClick={this.removeItem}>X</button>
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
          <ul>
            {this.finalBuyList}
          </ul>
      </div>
    )
  }
}

export default ProductAdding