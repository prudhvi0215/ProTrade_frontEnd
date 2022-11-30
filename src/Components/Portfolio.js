import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Toolbar,
  CssBaseline,
  AppBar,
  Container,
  TextField,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
  Card,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useNavigate } from "react-router-dom";
import { walletActions } from "../store/wallet-slice";
import { portfolioActions } from "../store/portfolio-slice";
import stocks from "../utils/stocks.json";
import prices from "../utils/stockPrices.json";

const Portfolio = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet);
  const portfolioStocks = useSelector((state) => state.portfolio.stocksList);
  //   const [stockPrices, setStockPrices] = useState([]);
  //   const [stockData, setStockData] = useState([]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleTransactions = () => {
    Navigate("/dashboard/portfolio/transactions");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/");
  };

  const handleSell = async (
    sellName,
    sellSymbol,
    sellExchange,
    buyPrice,
    sellPrice
  ) => {
    let userName = JSON.parse(localStorage.getItem("username"));
    let dateTime = new Date();
    let finalResult = "";

    if (sellPrice > buyPrice) {
      finalResult = "Profit";
    } else {
      finalResult = "Loss";
    }

    const sellStock = {
      transaction: {
        username: userName,
        name: sellName,
        buyprice: buyPrice,
        sellprice: sellPrice,
        date: Date.parse(dateTime),
        remark: finalResult,
      },
    };
    await axios
      .post(
        "http://localhost:3001/dashboard/portfolio/createTransactions",
        sellStock
      )
      .then((res) => {
        alert("Successfully saved to database");
        if (sellPrice > buyPrice) {
          dispatch(
            walletActions.addToWallet({
              amount: sellPrice - buyPrice,
            })
          );
        } else {
          dispatch(
            walletActions.deductFromWallet({
              amount: buyPrice - sellPrice,
            })
          );
        }

        dispatch(
          portfolioActions.removeFromPortfolio({
            name: sellName,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(portfolioStocks);
  }, []);

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <ShowChartIcon />
          <Typography variant="h4">ProTrade</Typography>
          <Container
            maxWidth="xs"
            style={{
              margin: "0 0 0 auto",
              width: "10%",
            }}
          >
            <Typography variant="subtitle2">Wallet</Typography>
            <Typography
              variant="h6"
              style={{
                border: "1px solid white",
                borderRadius: "5px",
              }}
            >
              ${wallet.amount}
            </Typography>
          </Container>
          <Button
            variant="outlined"
            style={{
              color: "white",
              border: "0.5px solid white",
              margin: "20px 5px 0 0",
            }}
            onClick={handleTransactions}
          >
            Transactions
          </Button>
          <Button
            variant="outlined"
            style={{
              color: "white",
              border: "0.5px solid white",
              margin: "20px 0 0 0",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <div>
          <Container maxWidth="md">
            <Typography variant="h3" align="center" color="textPrimary">
              Your stocks
            </Typography>
          </Container>
        </div>
        <Container
          maxWidth="md"
          style={{
            marginTop: "50px",
          }}
        >
          <Grid container spacing={6}>
            {portfolioStocks.map((stock, index) => (
              <Grid item xs={12} sm={6} lg={4}>
                <Card>
                  <CardMedia />
                  <CardContent>
                    <Typography variant="h5">
                      {stock.name.split("", 10)}
                    </Typography>
                    <Typography variant="subtitle1">
                      Symbol:{stock.symbol}
                    </Typography>
                    <Typography variant="subtitle1">
                      Exchange:{stock.exchange}
                    </Typography>
                    <Typography variant="subtitle1">
                      Buy Price: ${stock.buyPrice}
                    </Typography>
                    <Typography variant="subtitle1">
                      Sell Price: ${stock.sellPrice}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSell(
                          stock.name,
                          stock.symbol,
                          stock.exchange,
                          stock.buyPrice,
                          stock.sellPrice
                        );
                      }}
                    >
                      Sell Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Portfolio;
