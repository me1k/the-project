import React, { useState, useEffect, SyntheticEvent } from 'react';
import firebase from 'firebase';
import * as Styled from './styled';
import { fetchStock, searchStock } from '../../utils/fetch';
import history from 'history';

interface IProps {
  currentUser: string | null;
  handleLogout: () => void;
  uid: string | null;
  photoURL: string | null;
}

interface IStock {
  '1. symbol': string;
  '2. name': string;
  '3. type': string;
  '4. region': string;
  '5. marketOpen': string;
  '6. marketClose': string;
  '7. timezone': string;
  '8. currency': string;
}

interface IPrice {
  c: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

function Home(props: IProps) {
  const [value, setValue] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [stocks, setStocks] = useState<IStock[]>([]);
  const [prices, setPrices] = useState<IPrice>();

  const writeUserData = (e: SyntheticEvent, stock: IStock) => {
    e.preventDefault();
    firebase
      .database()
      .ref(`/user/${props.uid}`)
      .set(stock);
  };

  // const getUserData = () => {
  //   let ref = firebase.database().ref(`/user/${props.uid}`);
  //   ref.on('value', snapshot => {
  //     const state: IStock = snapshot.val();
  //     setStocks(state);
  //   });
  // };

  const searchForStock = async (value: string) => {
    try {
      await searchStock(value).then(data => {
        if (data.status === 200) {
          data.json().then(res => {
            setStocks(res.bestMatches);
            console.log(res);
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const goToStock = async (value: string, name: string) => {
    try {
      await fetchStock(value).then(data => {
        if (data.status === 200) {
          data.json().then(res => setPrices(res));
          setStocks([]);
          setName(name);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // getUserData();
  }, []);

  return (
    <>
      <Styled.HeaderContainer>
        <Styled.HeadlineContainer>
          <h1>The Project</h1>
        </Styled.HeadlineContainer>
        <Styled.ImageContainer>
          <img alt="profile_image" src={props.photoURL!} />
        </Styled.ImageContainer>
      </Styled.HeaderContainer>
      <Styled.SearchContainer>
        <Styled.InputContainer>
          <input
            type="text"
            placeholder="Suche..."
            onChange={value => setValue(value.currentTarget.value)}
            onKeyDown={data =>
              data.keyCode === 13 && data.which === 13 && searchForStock(value)
            }
          />
        </Styled.InputContainer>

        <Styled.StockListContainer>
          {stocks.map((item, idx) => {
            return (
              <Styled.StockListItem key={idx}>
                <div
                  onClick={() => goToStock(item['1. symbol'], item['2. name'])}
                >
                  {item['2. name']}
                </div>
              </Styled.StockListItem>
            );
          })}
        </Styled.StockListContainer>
      </Styled.SearchContainer>

      <Styled.StockContainer>
        <div>Name: {name && name}</div>
        <div>Current: {prices && (prices.c * 0.88).toFixed(2)}€</div>
        <div>Previous: {prices && (prices.pc * 0.88).toFixed(2)}€</div>
        <div>High: {prices && (prices.h * 0.88).toFixed(2)}€</div>
        <div>Low: {prices && (prices.l * 0.88).toFixed(2)}€</div>
        <div>Open: {prices && (prices.o * 0.88).toFixed(2)}€</div>
      </Styled.StockContainer>
    </>
  );
}

export default Home;
