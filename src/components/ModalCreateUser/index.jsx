import { Modal, Card, Typography, Button, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export default function ModalCreateUser({isOpen = false, onSubmit, onClose, data = null, title = "", buttonLabel = "Aceptar", canDelete=false, borrarCliente}) {

    const [getData, setData] = useState({
        nombre: '',
        correo: '',
        fecha_nacimiento: '',
        direccion: '',
        telefono:''
    })

    useEffect(() => {
        if(data) {
            setData(i => ({...i, ...data}))
        }
    }, [data])

    const handleData = e => {
        if(e.target.name) {
            setData(i => {
                if(e.target.name in i) {
                    i[e.target.name] = e.target.value;
                }
                return {...i}
            })
        }
    }

    const submit = () => {
        onSubmit(getData)
    }

    return (
        <Modal
            open={isOpen}
            sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
            onClose={onClose}
        >
            <Card sx={{padding:'20px', width:{xs:'80%', md:'300px'}}}>
                <Typography fontSize="24px">{title}</Typography>
                <Box>
                    <TextField name="nombre" value={getData.nombre} onChange={handleData} sx={{margin:'10px 0'}} fullWidth size="small" placeholder="Nombre"/>
                    <TextField name="correo" value={getData.correo} onChange={handleData} sx={{margin:'10px 0'}} fullWidth size="small" placeholder="Correo"/>
                    <TextField type="date" name="fecha_nacimiento" value={getData.fecha_nacimiento} onChange={handleData} sx={{margin:'10px 0'}} fullWidth size="small" placeholder="Fecha de nacimiento"/>
                    <TextField name="direccion" value={getData.direccion} onChange={handleData} sx={{margin:'10px 0'}} fullWidth size="small" placeholder="Dirección"/>
                    <TextField name="telefono" value={getData.telefono} onChange={handleData} sx={{margin:'10px 0'}} fullWidth size="small" placeholder="Teléfono"/>
                </Box>
                {canDelete == true && <Button onClick={() => borrarCliente()} startIcon={<DeleteIcon />} color="error">Eliminar cliente</Button>}
                <Box sx={{display:'flex', justifyContent:'space-between', marginTop:'20px'}}>
                    <Button onClick={() => onClose()}>Cancelar</Button>
                    <Button variant="contained" onClick={() => submit()}>{buttonLabel}</Button>
                </Box>
            </Card>
        </Modal>
    )
}