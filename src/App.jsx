import { Box, Typography, Paper, Button } from "@mui/material"
import Menu from "./components/Menu"
import { useEffect, useState } from "react"
import axios from "axios"
import TableClients from "./components/TableClients"
import ModalCreateUser from './components/ModalCreateUser'

function App() {

    const [getClients, setClients] = useState([])
    const [isModalCreateUserOpen, setModalCreateUserOpen] = useState(false);
    const [getPage, setPage] = useState(0)
    const [getRowsPerPage, setRowsPerPage] = useState(5);
    const [getClientView, setClientView] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user?page=${getPage}&rowsPerPage=${getRowsPerPage}`)
                setClients(response.data)
            }
            catch(err) {

            }
        })()
    }, [getPage, getRowsPerPage])

    const createUser = async data => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/user`, data)
            window.location.reload()
        }
        catch(err){
            setModalCreateUserOpen(false);
        }
    }

    const updateUser = async data => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_APP_API_URL}/user/${data._id}`, data)
            const index = getClients.data.findIndex(i => i._id == data._id);
            setClientView(null)
            if(index != -1) {
                setClients(i => {
                    i.data[index] = {...data};
                    return {...i}
                })
            }
        }
        catch(err){
            alert("Error")
            console.log(err)
            setClientView(null)
        }
    }

    const deleteUser = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_APP_API_URL}/user/${getClientView._id}`)
            setClientView(null)
            setClients(i => {
                i.data = i.data.filter(j => j._id != getClientView._id)
                return {...i}
            })
        }
        catch(err){
            alert("Error")
            setClientView(null)
        }
    }

    const handleChangePage =  (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value)
    }
    return (
        <Box>
            <Menu />
            <Box sx={{width:'100%', display:'flex', justifyContent:'center'}}>
                <Box sx={{width:{xs:'100%', md:'80%'}}}>
                    <Paper sx={{padding:'20px', margin:'20px 0'}}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography sx={{fontSize:'24px'}}>Lista de clientes</Typography>
                            <Button variant="contained" onClick={() => setModalCreateUserOpen(true)}>Agregar cliente</Button>
                        </Box>
                        <TableClients openClient={setClientView} data={getClients.data} rowsPerPage={getRowsPerPage} count={getClients.count} page={getPage} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}/>
                    </Paper>
                </Box>
            </Box>
            <ModalCreateUser onSubmit={updateUser} canDelete={true} borrarCliente={deleteUser} title="Editar cliente" buttonLabel="Guardar" isOpen={getClientView != null} data={getClientView} onClose={() => setClientView(null)} />
            <ModalCreateUser onSubmit={createUser} title="Agregar cliente" buttonLabel="Agregar" isOpen={isModalCreateUserOpen} onClose={() => setModalCreateUserOpen(false)} />
        </Box>
    )
}

export default App
