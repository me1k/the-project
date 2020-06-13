import React, { useState, useEffect, SyntheticEvent, useRef } from 'react';
import * as firebase from 'firebase/app';
import * as Styled from './styled';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { fetchStock, searchStock } from '../../utils/fetch';

interface IProps extends RouteComponentProps {
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
  '01. symbol': '';
  '02. open': number;
  '03. high': '';
  '04. low': '';
  '05. price': '';
  '06. volume': '';
  '07. latest trading day': '';
  '08. previous close': '';
  '09. change': '';
  '10. change percent': '';
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
          data.json().then(res => {
            setPrices(res['Global Quote']);
            console.log(res['Global Quote']);
          });
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
        {stocks.length === 0 ? (
          <Styled.AddIconContainer>
            <AiOutlinePlusSquare size="4em" color="#fff" />
          </Styled.AddIconContainer>
        ) : (
          stocks.map((item, idx) => <div key={idx}>{item['1. symbol']}</div>)
        )}
      </Styled.StockContainer>
    </>
  );
}

export default withRouter(Home);
