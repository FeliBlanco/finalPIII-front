import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function TableClients({data = [], page = 0, count=0, rowsPerPage = 0, onPageChange, onRowsPerPageChange, openClient}) {
    return (
        <>

            <TableContainer>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Correo</TableCell>
                            <TableCell>Fecha de nacimiento</TableCell>
                            <TableCell>Dirección</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((value, index) => {
                            return (
                                <TableRow key={`user-${index}`}>
                                    <TableCell>{value.nombre}</TableCell>
                                    <TableCell>{value.correo || "-"}</TableCell>
                                    <TableCell>{value.fecha_nacimiento || "-"}</TableCell>
                                    <TableCell>{value.direccion || "-"}</TableCell>
                                    <TableCell>{value.telefono || "-"}</TableCell>
                                    <TableCell><Button startIcon={<VisibilityIcon />} onClick={() => openClient(value)}>Ver</Button></TableCell>
                                </TableRow>
                            )
                        })}
                        {data.length == 0 &&
                        <TableRow>
                            <TableCell colSpan={2}>
                                <Typography textAlign={"center"}>No hay información para mostrar</Typography>
                            </TableCell>    
                        </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </>
    )
}