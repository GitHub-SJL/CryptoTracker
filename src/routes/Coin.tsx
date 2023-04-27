import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

interface RouterParams {
  coinId: string;
}

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
`;

interface RouteState {
  name: string;
}

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouterParams>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});

  useEffect(() => {
    axios.get(`https://api.coinpaprika.com/v1/coins/${coinId}`).then((data) => {
      setInfo(data.data);
    });

    axios
      .get(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      .then((data) => {
        setPriceInfo(data.data);
      });
  }, []);

  console.log(info);
  console.log(priceInfo);
  return (
    <Container>
      <Header>
        {/* home에서 가져오기때문에 직접 coin 페이지로 들어가면 undefined임 */}
        <Title>{state?.name || "로딩중.."}</Title>
      </Header>
      {loading ? <Loader>로딩중..</Loader> : null};
    </Container>
  );
};

export default Coin;
