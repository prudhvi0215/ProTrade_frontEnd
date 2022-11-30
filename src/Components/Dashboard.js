import React, { useState, useEffect } from "react";
import axios from "axios";
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
import ShowChartIcon from "@mui/icons-material/ShowChart";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { fetchPrices } from "../utils/FetchPrices";
import { fetchStocks } from "../utils/FetchStocks";
import { useSelector, useDispatch } from "react-redux";
import stocks from "../utils/stocks.json";
import prices from "../utils/stockPrices.json";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { walletActions } from "../store/wallet-slice";
import { portfolioActions } from "../store/portfolio-slice";

const Dashboard = () => {
  const wallet = useSelector((state) => state.wallet);
  const dispatch = useDispatch();
  const [stockPrices, setStockPrices] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalName, setModalName] = useState("");
  const [modalSymbol, setModalSymbol] = useState("");
  const [modalExchange, setModalExchange] = useState("");
  const [modalBuyPrice, setModalBuyPrice] = useState("");
  const [modalSellPrice, setModalSellPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const Navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/");
  };

  const handlePortfolio = () => {
    Navigate("/dashboard/portfolio");
  };

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

  const handleBuy = async (
    buyName,
    buySymbol,
    buyExchange,
    buyPrice,
    sellPrice
  ) => {
    let userName = JSON.parse(localStorage.getItem("username"));

    let newStock = {
      stock: {
        username: userName,
        name: buyName,
        price: buyPrice,
      },
    };
    await axios
      .post("http://localhost:3001/dashboard/portfolio/createStocks", newStock)
      .then((res) => {
        alert("Successfully saved into database...");
        dispatch(
          walletActions.deductFromWallet({
            amount: buyPrice,
          })
        );

        dispatch(
          portfolioActions.addToPortfolio({
            name: buyName,
            symbol: buySymbol,
            exchange: buyExchange,
            buyPrice: buyPrice,
            sellPrice: sellPrice,
          })
        );
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // setStockPrices(prices.data);
    // setStockData(stocks.data);

    // const prices = fetchPrices();
    const stkPrices = JSON.parse(localStorage.getItem("stockPrices"));
    setStockPrices(stkPrices);
    // // setStockPrices(prices.values.splice(0,90))
    // const stocks = fetchStocks();
    const stkData = JSON.parse(localStorage.getItem("stockData"));
    const finalStkData = [];
    for(let i = 0; i < 90; i++){
      finalStkData.push(stkData[i]);
    }
    setStockData(finalStkData);
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
            onClick={handlePortfolio}
          >
            Portfolio
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
              Search for stocks..
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="search"
              label="Search.."
              name="search"
              autoComplete="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </Container>
        </div>
        <Container maxWidth="md">
          <Grid container spacing={6}>
            {stockData
              .filter((stock, index) => {
                if (searchTerm == "") {
                  return stock;
                } else if (
                  stock.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return stock;
                }
              })
              .map((stock, index) => (
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
                        Price: ${stockPrices[index].open}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          setOpen(true);
                          setModalName(stock.name);
                          setModalSymbol(stock.symbol);
                          setModalExchange(stock.exchange);
                          setModalBuyPrice(stockPrices[index].open);
                          setModalSellPrice(stockPrices[index].close);
                        }}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          handleBuy(
                            stock.name,
                            stock.symbol,
                            stock.exchange,
                            stockPrices[index].open,
                            stockPrices[index].close
                          );
                        }}
                      >
                        Buy now
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
        <div>
          <Modal
            open={open}
            onClose={() => {}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography variant="h4">
                {modalName ? modalName.split("", 10) : null}
              </Typography>
              <Typography sx={{ mt: 2 }}>Symbol: {modalSymbol}</Typography>
              <Typography sx={{ mt: 2 }}>Exchange: {modalExchange}</Typography>
              <Typography sx={{ mt: 2 }}>Price: ${modalBuyPrice}</Typography>
              <Container
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Button
                  style={{
                    border: "1px solid black",
                    margin: "20px 0 10px 0",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleBuy(
                      modalName,
                      modalSymbol,
                      modalExchange,
                      modalBuyPrice,
                      modalSellPrice
                    );
                  }}
                >
                  Buy Now
                </Button>
                <Button
                  style={{ border: "1px solid black" }}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  close
                </Button>
              </Container>
            </Box>
          </Modal>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
