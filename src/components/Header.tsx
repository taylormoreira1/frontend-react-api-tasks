import { Text, Button, Flex, Spacer } from "@chakra-ui/react";
import { useAuth } from "../context/AuthProvider/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { name, email, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <Flex justify="center" align="center" w="100%">
            <Text fontSize="md" pe={5}>Bem-vindo, {name}</Text>
            
            <Spacer />
            <Button onClick={handleLogout} colorScheme="teal" size="sm">Logout</Button>
        </Flex>
    );
};

export default Header;
