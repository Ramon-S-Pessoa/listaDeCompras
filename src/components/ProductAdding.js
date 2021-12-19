import React, { Component } from 'react';

class ProductAdding extends Component {
  constructor(){
    super();
    this.state = {productName: '', buyList:[], itemsKey: 0};
    this.addItems = this.addItems.bind(this)
    this.removeItem = this.removeItem.bind(this)
  };

  handleChange = e =>{
    this.setState({productName: e.target.value})
  };

  removeItem = e => {
    let itemName = e.target.id
    let newBuyList = this.state.buyList
    let listFilter = newBuyList.find(item => item.key == itemName)
    let indexToRemove = newBuyList.indexOf(listFilter)
    newBuyList.splice(indexToRemove, 1)

    this.setState({buyList: [...newBuyList]})
  }

  addItems = (e)=>{
    e.preventDefault()
    let item
    //verifica se o produto é uma string vazia para evitar uma li vazia
    this.state.productName == ''? item = '':
    item = <li className='listItem' key={this.state.itemsKey}>
      <p>{this.state.productName}</p>
      <button id={this.state.itemsKey} className='item_remover' onClick={this.removeItem}>X</button>
    </li>;
    
    this.setState({buyList:[...this.state.buyList, item]})
    this.setState({itemsKey: this.state.itemsKey + 1})

    this.setState({productName: ''})
  };
  
  render() {
    return (
      <div className='add_product'>
        <form className='product_form'>
          <input className="product_name_input" type="text" value={this.state.productName} onChange={this.handleChange}/>
          <button className='add_product_button' onClick={this.addItems}>Adicionar item</button>
        </form>
          <ul>
            {this.state.buyList}
          </ul>
      </div>
    )
  }
}

export default ProductAdding