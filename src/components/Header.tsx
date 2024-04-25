import { Text, Button, Flex, Spacer } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <Flex justify="center" align="center" w="100%">
            <Text fontSize="md" pe={5}>Bem-vindo, {user?.name}</Text>
            <Spacer />
            <Button onClick={() => logout()} colorScheme="teal" size="sm">Logout</Button>
        </Flex>
    );
};

export default Header;
