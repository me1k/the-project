import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: flex-end;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;
export const HeadlineContainer = styled.div`
  color: #fff;
  display: flex;
  flex: 1;
  justify-content: center;
  h1 {
    padding-left: 70px;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
`;
export const InputContainer = styled.div`
  display: flex;
  justify-content: center;

  input {
    border: none;
    width: 300px;
    line-height: 2.2;
    :focus {
      outline: none;
    }
  }
`;
export const StockListContainer = styled.div`
  background-color: #fff;
  width: 304px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 30px;
`;
export const StockListItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;

  :hover {
    cursor: pointer;
    background-color: #f0f0f0;
  }
`;
export const ButtonContainer = styled.div``;

export const StockContainer = styled.div`
  display: flex;
  padding-left: 20px;
`;

export const AddIconContainer = styled.div``;
