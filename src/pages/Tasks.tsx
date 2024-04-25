import { useEffect, useState } from 'react'
import {
  Heading,
  Flex,
  Input,
  Button,
  Text,
  IconButton,
  VStack,
  Box,
  Spacer,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import Header from '../components/Header'
import { api } from '../services/api'

export default function Task() {
  const [tasks, setTasks] = useState([])
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDeadline, setTaskDeadline] = useState('')
  const [selectedTask, setSelectedTask] = useState(null)
  const toast = useToast()

  useEffect(() => {
    async function getUserTasks() {
      try {
        const response = await api.get('/tasks/')
        setTasks(response.data)
      } catch (error) {
        toast({
          title: 'Erro ao buscar tarefas: ' + error,
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
      }
    }
    getUserTasks()
  }, [])

  const handleCreateTask = () => {
    if (!taskName) {
      toast({
        title: 'Preencha todos os campos obrigatórios.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
      return
    }

    async function createTask() {
      try {
        const data = {
          name: taskName,
          description: taskDescription,
          deadline: taskDeadline,
        }

        const response = await api.post('/tasks/', data)
        if (response.status == 201) {
          const newTask = {
            id: response.data.id,
            name: taskName,
            description: taskDescription,
            deadline: taskDeadline,
          }

          setTasks([...tasks, newTask])
          clearInputs()

          toast({
            title: 'Tareda criada com sucesso.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
        }
      } catch (error) {
        toast({
          title: 'Erro ao buscar tarefas: ' + error,
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
      }
    }
    createTask()
  }

  const handleUpdateTask = async () => {
    try {
      const data = {
        name: taskName,
        description: taskDescription,
        deadline: taskDeadline,
      }

      await api.put('/tasks/' + selectedTask.id, data)

      const updatedTasks = tasks.map((task) => {
        if (task.id === selectedTask.id) {
          return {
            ...task,
            name: data.name,
            description: data.description,
            deadline: data.deadline,
          }
        }
        return task
      })

      setTasks(updatedTasks)
      clearInputs()
      setSelectedTask(null)
    } catch (error) {
      toast({
        title: 'Erro ao atualizar tarefa: ' + error,
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  const handleSelectTask = (task) => {
    setSelectedTask(task)
    setTaskName(task.name)
    setTaskDescription(task.description)
    if (task.deadline !== null) {
      setTaskDeadline(task.deadline)
    } else {
      setTaskDeadline('')
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await api.delete('/tasks/' + taskId)

      if (response.status === 200) {
        const updatedTasks = tasks.filter((task) => task.id !== taskId)
        setTasks(updatedTasks)
        toast({
          title: 'Tarefa excluída com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
      }
    } catch (error) {
      toast({
        title: 'Erro ao deletar tarefa do usuário: ' + error,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const clearInputs = () => {
    setTaskName('')
    setTaskDescription('')
    setTaskDeadline('')
  }

  const handleCancel = () => {
    clearInputs()
    setSelectedTask(null)
  }

  return (
    <Flex direction="column" minH="100vh" maxW="100%" bg="gray.100">
      <Box p={4} bg="white" borderBottomWidth="1px">
        <Header />
      </Box>
      <Flex justify="center" maxW="100%">
        <Flex direction="column" my="10" w="full" maxW="2xl">
          <Box
            bg="white"
            p="5"
            borderWidth="1px"
            borderRadius="md"
            boxShadow="sm"
          >
            <Heading as="h1" size="lg" mb="4" color="teal.500">
              Cadastro de Tarefas
            </Heading>
            <Input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Nome da tarefa"
              mb={4}
              variant="filled"
            />
            <Textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Descrição (Opcional)"
              mb={4}
              variant="filled"
            />
            <Input
              type="datetime-local"
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
              placeholder="Data de Entrega"
              mb={4}
              variant="filled"
            />
            <Flex justify="space-between">
              <Button
                onClick={selectedTask ? handleUpdateTask : handleCreateTask}
                leftIcon={<AddIcon />}
                colorScheme="teal"
                mb={4}
              >
                {selectedTask ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
              </Button>
              {selectedTask && (
                <Button
                  onClick={handleCancel}
                  leftIcon={<DeleteIcon />}
                  colorScheme="red"
                  variant="outline"
                  mb={4}
                >
                  Cancelar
                </Button>
              )}
            </Flex>
          </Box>

          <VStack spacing={4} align="stretch" pt="5">
            {tasks.map((task) => (
              <Box
                key={task.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                boxShadow="sm"
                bg="white"
              >
                <Flex justify="space-between" align="center">
                  <VStack align="start" spacing={1} flexGrow={1}>
                    <Text fontWeight="bold">{task.name}</Text>
                    <Text>{task.description}</Text>
                    <Text>
                      Data de Entrega:{' '}
                      {task.deadline
                        ? new Date(task.deadline).toLocaleString('pt-BR')
                        : 'Prazo não definido'}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Flex>
                    <IconButton
                      icon={<EditIcon />}
                      aria-label="Atualizar"
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() => handleSelectTask(task)}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      aria-label="Excluir"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => handleDeleteTask(task.id)}
                    />
                  </Flex>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  )
}
