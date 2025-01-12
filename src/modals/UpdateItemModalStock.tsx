import React from "react";
import * as Redux from "react-redux";

import { StyledContainerUpdateItemModal } from "./styled-update-item-stock";
import CloseButton from "../components/closeButton/CloseButton";
import { stockModel, stockStates } from "../types/stock/stockType";
import { StyledBoxNewItemStock } from "./styled-new-item-stock";
import img from "../../src/assets/imgDefault.png";
import { CustomTsDispatch } from "../hooks/dispatch";
import { resetStock, updateItemStock, updateList } from "../slices/StockSlice";
import { toast } from "react-toastify";
interface propsUpdateItemModal {
  showUpdateModal: () => void;
  item: stockModel | null;
}

const UpdateItemModalStock: React.FC<propsUpdateItemModal> = (
  props: propsUpdateItemModal
) => {
  const { success_stock } = Redux.useSelector(
    (state: { stockStore: stockStates }) => state.stockStore
  );

  const dispatch = CustomTsDispatch();

  const [description, setDescription] = React.useState<string>(
    props.item?.descricao || ""
  );
  const [qtd, setQtd] = React.useState<number>(props.item?.quantidade || 0);
  const [name, setName] = React.useState<string>(props.item?.nome || "");
  const [price, setPrice] = React.useState<number>(props.item?.preco || 0);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDescricao = event.target.value;
    setDescription(newDescricao);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handleQtdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQtd = Number(event.target.value);
    setQtd(newQtd);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(event.target.value);
    setPrice(newPrice);
  };

  const { id, imagemUrl } = props.item || {};

  const newItem: stockModel = {
    id: id ? id : "",
    imagemUrl: imagemUrl ? imagemUrl : "",
    quantidade: qtd,
    nome: name,
    preco: price,
    descricao: description,
  };
  const handleUpdate = () => {
    dispatch(updateItemStock(newItem));
  };

  React.useEffect(() => {
    const notify = () => {
      if (typeof success_stock === "string") toast.success(success_stock);
      dispatch(updateList(newItem));
    };
    notify();
    const timer = setTimeout(() => {
      dispatch(resetStock());
    }, 1000);
    return () => clearTimeout(timer);
  }, [success_stock]);

  return (
    <StyledContainerUpdateItemModal>
      <main>
        <StyledBoxNewItemStock>
          <img src={img} alt="" />
          <div>
            <span>
              <input
                type="text"
                placeholder="Código do produto"
                disabled
                value={props.item?.id}
              />
              <input
                type="number"
                placeholder="Quantidade"
                value={qtd}
                onChange={handleQtdChange}
              />
            </span>
            <input
              type="text"
              placeholder="Nome do produto"
              value={name}
              onChange={handleNameChange}
            />
          </div>
        </StyledBoxNewItemStock>
        <StyledBoxNewItemStock>
          <input
            type="test"
            placeholder="Descrição"
            value={description}
            onChange={handleDescriptionChange}
          />

          <input
            type="number"
            placeholder="Preço"
            min={1}
            value={price}
            onChange={handlePriceChange}
          />

          <button onClick={handleUpdate}>Atualizar</button>
        </StyledBoxNewItemStock>
      </main>

      <CloseButton close={props.showUpdateModal} />
    </StyledContainerUpdateItemModal>
  );
};
export default UpdateItemModalStock;
