import React, { useState } from "react";
import "./App.css";
import { Box, Button, Paper, TextField } from "@material-ui/core";
const Web3 = require("web3");

function App() {
  const [account, setAccount] = useState({
    data: "",
    network: "",
    balanceETH: "",
  });

  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');

  const walletAddress = "0x0DF7F2E914E216678BFE1Bde92c9AE25e54070E0";
  const loadBlockChain: any = async () => {
    var web3 = new Web3(Web3.givenProvider);
    var balanceETH: any = "";
    web3.eth.getBalance(walletAddress).then((value: number) => {
      balanceETH = value;
    });
    const network = await web3.eth.net.getNetworkType();
    console.log(network);
    balanceETH = web3.utils.fromWei(balanceETH, "ether");
    const accounts = await web3.eth.getAccounts();

    // const testnet = 'https://ropsten.etherscan.io';
    // const weenusAddress = '0x101848D5C5bBca18E6b4431eEdF6B95E9ADF82FA';
    // var web3Weenus = new Web3(testnet);
    // var balanceWeenus = '';
    // web3Weenus.eth.getBalance(weenusAddress).then((bal: any) => {
    //   balanceWeenus = bal;
    // })
    // // var wallet = web3Weenus.eth.toWei(balanceWeenus, 'ether');


    setAccount({ data: accounts[0], network: network, balanceETH });
  };

  const sendEthers = () => {
    var web3 = new Web3(Web3.givenProvider);
    web3.eth.sendTransaction({ from: walletAddress, to: address, value: web3.utils.toWei(amount, 'ether'), gasLimit: 21000, gasPrice: 20000000000 }).then((res: any) => { debugger; })

  }

  return (
    <Box
      minHeight="80vh"
      bgcolor="black"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Paper>
        <Box p={8}>
          <Box fontWeight="bold" textAlign="center" mt={5} fontSize={20}>
            Welcome to DApp
          </Box>
          <Box fontWeight='bold' fontSize={16}>Network: {account.network}</Box>
          <Box fontWeight='bold' fontSize={16}>Balance: {account.balanceETH} ETH</Box>
          {account.network.length === 0 && (
            <Box height="50vh" p={15}>
              <Button
                variant="contained"
                color="secondary"
                onClick={loadBlockChain}
              >
                Connect to MetaMask
              </Button>
            </Box>
          )}
          {account.network.length > 0 && (
            <Box height="50vh" p={15} >
              <TextField label="Amount" color="secondary" fullWidth value={amount} onChange={(e: any) => setAmount(e.target.value)} />
              <TextField label="Receiver Address" color="secondary" fullWidth margin="normal" value={address} onChange={(e: any) => setAddress(e.target.value)} />
              <Button variant='contained' onClick={() => sendEthers()} color='primary' fullWidth>Send</Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default App;
