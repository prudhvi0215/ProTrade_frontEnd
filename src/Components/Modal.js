import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

const StockModal = ({isOpen,name,symbol,exchange,price}) => {

    const [open, setOpen] = useState(isOpen||false);
    const [modalName, setModalName] = useState(name||'');
    const [modalSymbol, setModalSymbol] = useState(symbol||"");
    const [modalExchange, setModalExchange] = useState(exchange||"");
    const [modalPrice, setModalPrice] = useState(price||"");

  return (
    <div>
          <Modal
            open={open}
            onClose={() => {}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
                <Typography variant="h6" component="h2">
                  {modalName}
                </Typography>
                <Typography  sx={{ mt: 2 }}>
                  {modalSymbol}
                </Typography>
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
  )
}

export default StockModal