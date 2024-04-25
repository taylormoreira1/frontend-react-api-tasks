import { Heading, Flex, Input, Button, Text, Center, useToast } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
    const { isAuthenticated, authenticate } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    //redirect is autenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/tarefas");
        }
    }, [isAuthenticated, navigate]);

    async function handleLogin(event) {
        event.preventDefault();

        const { email, password } = event.target.elements;

        try {
            await authenticate(email.value, password.value);
            navigate("/tarefas");
        } catch (error) {
            toast({
                title: "Usuário ou senha inválidos.",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        }
    }

    return (
        <Center h="100vh" bg="gray.100">
            <Flex direction="column" p={10} rounded="md" boxShadow="md" bg="white" maxW="585px" m="10">
                <Heading as="h1" size="lg" mb={4}>
                    Login
                </Heading>
                <form onSubmit={handleLogin}>
                    <Input type="email" name="email" placeholder="Email" />
                    <Input type="password" name="password" placeholder="Senha" mt={4} />
                    <Flex justifyContent="flex-end" mt={8}>
                        <Button type="submit" colorScheme="teal">
                            Entrar
                        </Button>
                    </Flex>
                </form>
                <Text mt={4} align={"center"}>
                    Não possui uma conta?{' '}
                    <Link to="/cadastro" color="teal.500" style={{ textDecoration: 'underline' }}>
                        Crie uma agora
                    </Link>
                </Text>
            </Flex>
        </Center>
    );
};

export default Login;
