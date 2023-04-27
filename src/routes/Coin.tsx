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

interface IContract {
  contract: string;
  platform: string;
  type: string;
}

interface ILinks {
  explorer: string[];
  facebook: string[];
  reddit: string[];
  website: string[];
  youtube: string[];
}

interface ILinksExtended {
  url: string;
  type: string;
  stats?: IStats;
}

interface IStats {
  subscribers?: number;
  followers?: number;
}

interface IParent {
  id: string;
  name: string;
  symbol: string;
}

interface ITag {
  id: string;
  name: string;
  coin_counter: number;
  ico_counter: number;
}

interface ITeam {
  id: string;
  name: string;
  position: string;
}

interface IWhitepaper {
  link: null;
  thumbnail: null;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  contracts: IContract[];
  logo: string;
  parent: IParent;
  tags: ITag[];
  team: ITeam[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: Date;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: ILinks;
  links_extended: ILinksExtended[];
  whitepaper: IWhitepaper;
  first_data_at: Date;
  last_data_at: Date;
}

interface IQuotes {
  USD: IUsd;
}

interface IUsd {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: Date;
  percent_from_price_ath: number;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: IQuotes;
}

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouterParams>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<InfoData | undefined>(undefined);
  const [priceInfo, setPriceInfo] = useState<PriceData | undefined>(undefined);

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

  console.log(info, "info");
  console.log(priceInfo, "priceInfo");
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
