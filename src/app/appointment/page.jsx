'use client';
import React, { useState } from 'react'; 
// import * as React from 'react';
// import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ActionButtons from '../components/ActionButtons';
import EditModal from '../modal/editModal';
import styles from './page.module.css'; 

function createData(STT, PatientName, AssignedDoctor, Date, Diseases) {
    return { STT, PatientName, AssignedDoctor, Date, Diseases };
}

function createData2(STT, DoctorNames, Status) {
    return { STT, DoctorNames, Status };
}

export default function Page() {
    const [rows, setRows] = useState([
        createData('001', 'Ramesh Kumar', 'Dr.Jacob Ryan', '12 Jan 2022', 'Fever'),
        createData('002', 'Ramesh Kumar', 'Dr.Jacob Ryan', '12 Jan 2022', 'Fever'),
        createData('003', 'Ramesh Kumar', 'Dr.Jacob Ryan', '12 Jan 2022', 'Fever'),
    ]);

    const rows2 = [
        createData2('a', ' Dr.Jacob ', 'Availa'),
        createData2('b', ' Dr.Jacob ', 'Availa'),
        createData2('c', ' Dr.Jacob ', 'Abs'),
    ];

    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const handleEdit = (id) => {
        const rowToEdit = rows.find((row) => row.STT === id);
        setEditData(rowToEdit);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditData(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
        await fetch(`/api/appointments/${editData.STT}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editData),
        });
        setRows(rows.map((row) => (row.STT === editData.STT ? editData : row)));
        handleClose();
        } catch (error) {
        console.error('Error updating appointment:', error);
        }
    };
    const handleDelete = async (id) => {
        if (confirm('Bạn có chắc muốn xóa lịch hẹn này?')) {
            try {
                await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
                setRows(rows.filter(row => row.STT !== id));
            } catch (error) {
                console.error('Error deleting appointment:', error);
            }
        }
    };

    return (
        <div>
            <h1 className={styles.h1}>Appointment Scheduling</h1>
            <div className={styles.page}>
                <div className={styles.tableContainer}>
                    <div className={styles.table1}>
                        <TableContainer component={Paper} 
                                        sx={{ 
                                            maxWidth: '100%',
                                            padding: '20px',
                                            borderRadius: '40px',
                                        }}
                        > 
                            <h2 className={styles.h2}>Booked Appointment</h2>
                            <Table sx={{ maxWidth: 700 }} aria-label="simple table" className={styles.tableDetails1}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={styles.tableHead} align="left">#</TableCell>
                                        <TableCell className={styles.tableHead} align="center">Patient Name</TableCell>
                                        <TableCell className={styles.tableHead} align="center">Assigned Doctor</TableCell>
                                        <TableCell className={styles.tableHead} align="center">Date</TableCell>
                                        <TableCell className={styles.tableHead} align="center">Diseases</TableCell>
                                        <TableCell className={styles.tableHead} align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.STT}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left">{row.STT}</TableCell>
                                            <TableCell align="center" component="th" scope="row">
                                                {row.PatientName}
                                            </TableCell>
                                            <TableCell align="center">{row.AssignedDoctor}</TableCell>
                                            <TableCell align="center">{row.Date}</TableCell>
                                            <TableCell align="center">{row.Diseases}</TableCell>
                                            <TableCell align="center">
                                                <ActionButtons
                                                    onEdit={handleEdit}
                                                    onDelete={handleDelete}
                                                    itemId={row.STT}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className={styles.table2}>
                        <TableContainer component={Paper} sx={{ 
                                                                maxWidth: '75%',
                                                                padding: '10px',
                                                                borderRadius: '40px',  
                                                            }}
                        > 
                            <h2 className={styles.h2}>Doctors</h2>
                            <Table sx={{ maxWidth: 300}} 
                                aria-label="simple table" className={styles.tableDetails2}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">#</TableCell>
                                        <TableCell align="center">Doctor Names</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows2.map((row2) => (
                                        <TableRow
                                            key={row2.DoctorNames}
                                            sx={{ '&:first-child td, &:last-child th': { border: 0 } }}
                                        >   
                                            <TableCell align="left">{row2.STT}</TableCell>
                                            <TableCell align="center" component="th" scope="row">
                                                {row2.DoctorNames}
                                            </TableCell>
                                            <TableCell 
                                                component="div"
                                                align="center"
                                                className={styles.statusCell}
                                                style={{
                                                    backgroundColor: row2.Status === 'Availa' ? '#d4edda' : '#f8d7da',
                                                    // maxHeight: '10px',
                                                    // maxWidth: '20px',
                                                    borderRadius: '60px',
                                                    margin: '10 auto',
                                                    '&.MuiTableCell-root': {
                                                        maxHeight: '10px', // Ghi đè trực tiếp class của Material-UI
                                                        maxWidth: '20px',
                                                    },
                                                    
                                                }}
                                            >
                                                {row2.Status}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            <EditModal
                open={open}
                handleClose={handleClose}
                editData={editData}
                setEditData={setEditData}
                handleSave={handleSave}
            />
        </div>
    );
}