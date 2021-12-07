import { Button, Flex, Text } from '@chakra-ui/react';

function App() {
  const connectWallet = async () => {
    // we will try to connect to a wallet here :)
  }

  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      height='100vh'
      bg='purple.900'
    >
        <Button onClick={connectWallet}>Connect wallet</Button>
    </Flex>
  );
}

export default App;