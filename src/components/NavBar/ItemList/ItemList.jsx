import Item from "../Item/Item"
import { getProductById } from "../asyncMock"

const ItemList = ({products}) => {
    return (
        <div>
            {products.map(prod => {
                return <Item key={prod.id} {...prod}/>
            })}
        </div>
    )
}


export default ItemList