import { Wrap, WrapItem } from "@chakra-ui/react";
import Item from "../Item/Item";
import { memo } from "react";

const ItemList = ({ products }) => {
  return (
    <Wrap spacing="30px" justify="center">
      {products.map((product) => (
        <WrapItem key={product.id}>
          <Item product={product} />
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default memo(ItemList);
