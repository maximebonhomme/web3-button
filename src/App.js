import { Avatar, Box, Button, Flex,  Text  } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useState } from 'react';

const shortenAddress = (address) => {
  return `${address.slice(0, 4)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}

function App() {
  const [account, setAccount] = useState({});

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('please install Metamask');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider =  new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const ens = await provider.lookupAddress(address);
      const avatar = await provider.getAvatar(ens);

      setAccount({
        address,
        avatar,
        ens
      });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      height='100vh'
      bg='purple.900'
    >
      {account.address ? (
        <Box
          maxW='sm'
          borderRadius='3xl'
          p='5'
          bg='white'
          textAlign='center'
        >
          <Avatar name={account.ens} src={account.avatar} size='lg' mb='2'  />
          {account.ens && (
            <Text fontSize='xl'>{account.ens}</Text>
          )}
          <Text fontSize='xs' title={account.address}>{shortenAddress(account.address)}</Text>
        </Box>
      ) : (
        <Button onClick={connectWallet}>Connect wallet</Button>
      )}
    </Flex>
  );
}

export default App;
