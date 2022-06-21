// pages/index.tsx
import {
  Heading,
  Button,
  Center,
  Box,
  Input,
  VStack,
  HStack,
} from "@chakra-ui/react";
import QRCode from "qrcode.react";
import { useState } from "react";

export default function Index(): JSX.Element {
  const [isMake, setIsMake] = useState(false);
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Box
      backgroundColor={"whitesmoke"}
      sx={{ width: "100vw", height: "100vh" }}
    >
      <Center sx={{ paddingTop: "2rem" }}>
        <VStack spacing={3}>
          <Heading color={"chocolate"} as={"h1"} size="4xl">
            QRコードを作るよ🐻
          </Heading>
          <Box sx={{ paddingTop: "3rem", width: "30rem" }}>
            <Input
              type="text"
              colorScheme={"facebook"}
              variant={"outline"}
              size={"lg"}
              id="ssid"
              placeholder="ssidを入力してください"
              onChange={(e) => {
                if (isMake) setIsMake(false);
                setSsid(e.target.value);
              }}
            ></Input>
          </Box>
          <Box sx={{ paddingTop: "0.5rem", width: "30rem" }}>
            <Input
              variant={"outline"}
              size={"lg"}
              type="text"
              placeholder="パスワードを入力してください"
              onChange={(e) => {
                if (isMake) setIsMake(false);
                setPassword(e.target.value);
              }}
            ></Input>
          </Box>
          <Box sx={{ paddingTop: "2rem" }}>
            <HStack>
              <Button
                colorScheme={"red"}
                sx={{ width: "10rem", height: "3rem" }}
              >
                入力クリア
              </Button>
              <Button
                colorScheme={"whatsapp"}
                sx={{ width: "10rem", height: "3rem" }}
                onClick={() => setIsMake(true)}
              >
                作成
              </Button>
            </HStack>
          </Box>
          {isMake ? (
            <QRCode value={`WIFI:S:${ssid};T:WPA;P:${password};;`} />
          ) : (
            ""
          )}
        </VStack>
      </Center>
    </Box>
  );
}
