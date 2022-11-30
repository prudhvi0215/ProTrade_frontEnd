import React, { useState, useEffect } from "react";
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
import stocks from "../utils/stocks.json";
import prices from "../utils/stockPrices.json";

const Transactions = () => {
  const Navigate = useNavigate();
  const wallet = useSelector((state) => state.wallet);
  const [transactions, setTransactions] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/");
  };

  useEffect(() => {
    async function getTransactions() {
      let userName = JSON.parse(localStorage.getItem("username"));
      await axios
        .get("http://localhost:3001/dashboard/portfolio/transactions", {
          headers: {
            username: userName,
          },
        })
        .then((res) => {
          console.log(res);
          setTransactions(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getTransactions();
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
              Your Transactions
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
            {transactions.map((transaction, index) => (
              <Container
                item
                xs={12}
                sm={6}
                lg={4}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  border: "1px solid black",
                  margin: "10px 0",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1">
                  Date: {transaction.date}
                </Typography>
                <Typography variant="subtitle1">
                  username: {transaction.username}
                </Typography>
                <Typography variant="subtitle1">
                  Stock: {transaction.name.slice("", 10)}
                </Typography>
                <Typography variant="subtitle1">
                  Buy Price: {transaction.buyprice}
                </Typography>
                <Typography variant="subtitle1">
                  Sell Price: {transaction.sellprice}
                </Typography>
                <Typography variant="subtitle1">
                  Remark: {transaction.remark}
                </Typography>
              </Container>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Transactions;
