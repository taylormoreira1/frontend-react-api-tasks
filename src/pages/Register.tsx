import { Heading, Flex, Input, Button, Text, Center, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Api } from "../services/api";
import { useState } from "react"; // Adicione esta linha para usar o useState hook
import { useAuth } from "../context/AuthProvider/useAuth";

const Register = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const auth = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    async function handleRegister(event) {
        event.preventDefault();

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                }
            };

            const data = {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation
            };

            const response = await Api.post("/register/", data, config);

            if (response.status === 201) {
                await auth.authenticate(email, password);
                navigate("/tarefas");
            }

        } catch (error) {

            const errors = error.response.data.errors;

            Object.keys(errors).forEach(key => {
                errors[key].forEach(errorMessage => {
                    toast({
                        title: errorMessage,
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                        position: 'top',
                    });
                });
            });

        }
    }

    return (
        <Center h="100vh" bg="gray.100">
            <Flex direction="column" p={10} rounded="md" boxShadow="md" bg="white" maxW="585px" m={10}>
                <Heading alignSelf="center" as="h1" size="lg" >Criar conta</Heading>
                <form onSubmit={handleRegister} >
                    {/* Adicione os atributos value e onChange para atualizar os estados */}
                    <Input type="text" placeholder="Nome" mt={4} value={name} onChange={(e) => setName(e.target.value)} />
                    <Input type="email" placeholder="Email" mt={4} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Senha" mt={4} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Input type="password" placeholder="Confirmar Senha" mt={4} value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />

                    <Button colorScheme='green' type="submit" mt={8}>Cadastrar</Button>
                </form>
            </Flex>
        </Center>
    );
};

export default Register;
